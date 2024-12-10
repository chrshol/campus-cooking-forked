import NavBarSignedin from '@/components/NavBarSignedin';
import ContactForm from '@/components/ContactUs';
import Footer from '@/components/Footer';
import EmailSubscribe from '@/components/EmailSubscribe';
import RecipeGrid2 from '@/components/RecipeGrid2';
import '../globals.css';
import './contactuspage.css';


export default function login() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <ContactForm />
      <EmailSubscribe />
      <RecipeGrid2 />
      <Footer />
    </div>
  );
}
