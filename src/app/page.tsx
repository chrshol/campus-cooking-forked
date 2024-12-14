/* eslint-disable import/order */
import LandingImg from '../components/LandingImg';
import FoodCategories from '../components/FoodCategories';
import RecipeGrid from '../components/RecipeGrid';
import './globals.css';
import ChefPromo from '@/components/ChefPromo';
import RecipeGrid2 from '@/components/RecipeGrid2';
import EmailSubscribe from '@/components/EmailSubscribe';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarSignedin from '@/components/NavBarSignedin';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <LandingImg />
      <FoodCategories />
      <ChefPromo />
      <RecipeGrid2 />
      <EmailSubscribe />
      <Footer />
    </div>
  );
}
