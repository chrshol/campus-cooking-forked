import 'bootstrap/dist/css/bootstrap.min.css';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import RecipeCardAdmin from '@/components/RecipeCardAdmin';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import './styles.css';
import { authOptions } from '@/lib/auth';
import { deleteRecipe } from '@/lib/dbActions';

interface Recipe {
  id: number;
  title: string;
  email: string;
  cookTime: string;
  createdAt: string;
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const recipes = await prisma.recipe.findMany();

  const formattedRecipes = recipes.map(recipe => ({
    ...recipe,
    createdAt: recipe.createdAt.toISOString()
  }));

  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <main className="admin-monitor-container">
        <h1>Monitor Recipes</h1>
        <div className="admin-recipes-list">
          {recipes.length > 0 ? (
            formattedRecipes.map((recipe) => (
              <RecipeCardAdmin
                key={recipe.id}
                recipe={recipe}
                onDelete={deleteRecipe}
              />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 