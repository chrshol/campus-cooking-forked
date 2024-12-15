import RecipePost from '@/components/RecipePost';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import '../../globals.css';
import '../recipepost.css';

export default function RecipePage() {
  return (
    <div className="toaster-oven-granola-page">
      <NavBarSignedin />
        <RecipePost slug="toaster-oven-granola" />
      <Footer />
    </div>
  );
}
