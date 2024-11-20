import NavBar from '@/components/NavBar';
import LoginPage from '@/components/LoginPage';
import Footer from '@/components/Footer';
import './loginpage.css';

export default function login() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <LoginPage />
      <Footer />
    </div>
  );
}
