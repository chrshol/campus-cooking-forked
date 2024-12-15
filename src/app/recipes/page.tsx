import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense } from 'react';
import Recipes from '../../components/Recipes';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import '../globals.css';
import './recipepost.css';
import EmailSubscribe from '@/components/EmailSubscribe';

export default function RecipesPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <Suspense fallback={<div>Loading...</div>}>
        <Recipes />
      </Suspense>
      <EmailSubscribe />
      <Footer />
    </div>
  );
}