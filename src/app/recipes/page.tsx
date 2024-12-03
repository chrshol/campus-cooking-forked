import Recipes from '../../components/Recipes';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import './recipespage.css';
import EmailSubscribe from '@/components/EmailSubscribe';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function recipes () {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Recipes />
      <EmailSubscribe />
      <Footer />
 

    </div>
  );
}