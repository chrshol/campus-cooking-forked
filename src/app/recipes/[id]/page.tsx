import { getAllRecipes } from '@/lib/dbActions';
import RecipePost from '@/components/RecipePost';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipes = await getAllRecipes();
  const recipe = recipes.find((r) => r.id === parseInt(params.id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <RecipePost recipe={recipe} />
      </main>
      <Footer />
    </div>
  );
} 