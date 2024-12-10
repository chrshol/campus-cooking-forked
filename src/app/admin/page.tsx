import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Recipe } from '@prisma/client';


const AdminPage = async () => {
    const session = await getServerSession(authOptions);
    adminProtectedPage(
      session as {
        user: { email: string; id: string; randomKey: string };
      } | null,
    );
    const recipes: Recipe[] = await prisma.recipe.findMany({});
  
  
    return (
      <main>
        <Container id="list" fluid className="py-3">
          <Container>
            <Row>
              <Col>
                <h1 className="text-center">List Contacts (Admin)</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {recipes.map((recipe) => (
                    <Col key={recipe.email}>
                      <RecipeCardAdmin
                        recipe={recipe}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </main>
    );
  };
  
  export default AdminPage;
  