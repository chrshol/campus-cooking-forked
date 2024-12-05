import Recipes from '../../components/Recipes';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import '../globals.css';
import './recipespage.css';
import EmailSubscribe from '@/components/EmailSubscribe';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function recipes () {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <Recipes />
      <EmailSubscribe />
      <Footer />
 

    </div>
  );
}