'use client';

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
  console.log("Form Submitted:", formData);  // Add this line for debugging
  
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
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-container">
      <h1>Add a recipe</h1>
      <p className="subtitle">Share your creation with the community!</p>

      <div className="form-wrapper">
        {/* Left Column */}
        <div className="left-column">
          {/* Recipe Name */}
          <div className="input-group">
            <label>Add a Recipe Title</label>
            <input
              type="text"
              placeholder="Enter a Title"
              {...register('title', { required: true })}
            />
            {errors.title && <p className="error">Recipe title is required.</p>}
          </div>

          {/* Ingredients Section */}
          <div className="input-group">
            <label>Specify Ingredients Needed</label>
            <textarea
              placeholder="Enter ingredients as a list"
              {...register('ingredients', { required: true })}
            />
            {errors.ingredients && (
              <p className="error">Ingredients are required.</p>
            )}
          </div>

          {/* Appliances Section */}
          <div className="appliances-section">
            <label style={{ fontWeight: 600 }}>Specify Appliances Needed</label>
            <div className="appliances-grid">
              <div className="appliance-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Rice Cooker" />
                  Rice Cooker
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Panini Press" />
                  Panini Press
                </label>
              </div>
              <div className="appliance-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Toaster Oven" />
                  Toaster Oven
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Microwave" />
                  Microwave
                </label>
              </div>
              <div className="appliance-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Hot Plate & Pan" />
                  Hot Plate & Pan
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('appliances')} value="Toaster" />
                  Toaster
                </label>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="categories-section">
            <label style={{ fontWeight: 600 }}>Select Recipe Categories</label>
            <div className="categories-grid">
              <div className="category-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Breakfast" />
                  Breakfast
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Lunch" />
                  Lunch
                </label>
              </div>
              <div className="category-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Dinner" />
                  Dinner
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Dessert" />
                  Dessert
                </label>
              </div>
              <div className="category-row">
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Meat" />
                  Meat
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('categories')} value="Beverage" />
                  Chocolate
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Recipe Hero Image */}
          <div className="input-group">
            <label>Recipe Hero Image</label>
            <textarea
              placeholder="Enter a image URL"
              {...register('imageURL', { required: true })}
              className="imageURL"
            />
            {errors.imageURL && <p className="error">Image is required.</p>}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="input-group">
        <label>Add the Description</label>
        <textarea
          placeholder="Enter a detailed description"
          {...register('description', { required: true })}
          className="long-description"
        />
        {errors.description && (
          <p className="error">Description is required.</p>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        Submit Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;