import { Suspense } from 'react';
import RecipePost from '@/components/RecipePost';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';

// Add a new CSS module for this page
import './style.css';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <main className="recipe-page-container">
        <div className="recipe-content-wrapper">
          <Suspense fallback={<div>Loading recipe...</div>}>
            <RecipePost slug={params.slug} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
} 