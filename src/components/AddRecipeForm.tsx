import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addRecipe } from '@/lib/dbActions'; 
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddRecipeSchema } from '@/lib/validationSchemas';
import { User } from '@prisma/client';

const onSubmit = async (formData: {
  title: string;
  description: string;
  imageURL: string;
  instructions: string;
  appliances: string[];
  ingredients: string;
  categories: string[];
  owner: string;
  userID: number;
}) => {

  // Split the ingredients string into an array
  const data = {
    ...formData,
    ingredients: formData.ingredients.split(',').map(item => item.trim())
  };
  
  // Process the form data, assuming addRecipe is your function to handle saving
  await addRecipe(data);
  swal('Success', 'Your recipe has been added', 'success', {
    timer: 2000,
  });
};

const AddRecipeForm = ({ user }: { user: User }) => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRecipeSchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Recipe</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <input
                    type="text"
                    {...register('title')}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.title?.message}</div>
                </Form.Group>

                {/* Description Field */}
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                {/* Image URL Field */}
                <Form.Group>
                  <Form.Label>Image URL</Form.Label>
                  <input
                    type="text"
                    {...register('imageURL')}
                    className={`form-control ${errors.imageURL ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.imageURL?.message}</div>
                </Form.Group>

                {/* Instructions Field */}
                <Form.Group>
                  <Form.Label>Instructions</Form.Label>
                  <textarea
                    {...register('instructions')}
                    className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.instructions?.message}</div>
                </Form.Group>

                {/* Appliances Field */}
                <Form.Group>
                  <Form.Label>Appliances</Form.Label>
                  <select
                    {...register('appliances')}
                    className={`form-control ${errors.appliances ? 'is-invalid' : ''}`}
                    multiple
                  >
                    <option value="Rice Cooker">Rice Cooker</option>
                    <option value="Panini Press">Panini Press</option>
                    <option value="Toaster Oven">Toaster Oven</option>
                    <option value="Toaster">Toaster</option>
                    <option value="Microwave">Microwave</option>
                    <option value="HotPlate">HotPlate</option>
                  </select>
                  <div className="invalid-feedback">{errors.appliances?.message}</div>
                </Form.Group>

                {/* Ingredients Field */}
                <Form.Group>
                  <Form.Label>Ingredients</Form.Label>
                  <input
                    type="text"
                    {...register('ingredients')}
                    className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                    placeholder="Enter ingredients separated by commas"
                  />
                  <Form.Text className="text-muted">
                    Enter ingredients separated by commas (e.g., "flour, sugar, eggs")
                  </Form.Text>
                  <div className="invalid-feedback">{errors.ingredients?.message}</div>
                </Form.Group>

                {/* Categories Field */}
                <Form.Group>
                  <Form.Label>Categories</Form.Label>
                  <select
                    {...register('categories')}
                    className={`form-control ${errors.categories ? 'is-invalid' : ''}`}
                    multiple
                  >
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Meat">Meat</option>
                    <option value="Chocolate">Chocolate</option>
                  </select>
                  <div className="invalid-feedback">{errors.categories?.message}</div>
                </Form.Group>

                {/* Hidden Owner and UserID Fields */}
                <input type="hidden" {...register('owner')} value={currentUser} />
                <input type="hidden" {...register('userID')} value={user.id} /> {/* Add the hidden userID field */}

                {/* Submit and Reset Buttons */}
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipeForm;