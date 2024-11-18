import NavBar from '../components/NavBar';
import LandingImg from '../components/LandingImg';
import FoodCategories from '../components/FoodCategories';
import './globals.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <LandingImg />
      <FoodCategories />
    </div>
  );
}
