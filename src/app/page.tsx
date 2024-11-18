/* eslint-disable import/order */
import NavBar from '../components/NavBar';
import LandingImg from '../components/LandingImg';
import FoodCategories from '../components/FoodCategories';
import RecipeGrid from '../components/RecipeGrid';
import './globals.css';
import ChefPromo from '@/components/ChefPromo';
import InstaBlog from '@/components/InstaBlog';
import RecipeGrid2 from '@/components/RecipeGrid2';
import EmailSubscribe from '@/components/EmailSubscribe';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <LandingImg />
      <FoodCategories />
      <RecipeGrid />
      <ChefPromo />
      <InstaBlog />
      <RecipeGrid2 />
      <EmailSubscribe />
      <Footer />
    </div>
  );
}
