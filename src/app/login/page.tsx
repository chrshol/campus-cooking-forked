
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/NavBar';
import LoginPage from '@/components/LoginPage';
import Footer from '@/components/Footer';
import '../globals.css'; 
import './loginpage.css';
import SigninPage from '../auth/signin/SigninPage';
import SignupPage from '../auth/signup/SignupPage';

export default function login() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <SigninPage /> <SignupPage />
      <Footer />
    </div>
  );
}
