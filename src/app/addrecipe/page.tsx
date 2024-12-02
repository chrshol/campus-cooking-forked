import NavBar from '@/components/NavBar';
import LoginPage from '@/components/AddRecipe';
import Footer from '@/components/Footer';
import './addrecipepage.css';
import AddRecipeForm from '@/components/AddRecipe';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';

// export default function AddRecipe() {
//   return (
//     <div className="min-h-screen bg-white">
//       <NavBar />
//       <AddRecipeForm />
//       <Footer />
//     </div>
//   );
// }

const AddRecipe = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <AddRecipeForm />
      <Footer />
    </div>
  );
};

export default AddRecipe;
