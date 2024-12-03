import Footer from '@/components/Footer';
import './addrecipepage.css';
import AddRecipeForm from '@/components/AddRecipeForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import NavBarSignedin from '@/components/NavBarSignedin';


export default async function AddRecipe({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  
  const user: User | null = await prisma.user.findUnique({
    where: { email: session?.user?.email || '' },
  });
  
  // console.log(user);
  if (!user) {
    return notFound();
  }
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <AddRecipeForm user={user} />
      <Footer />
    </div>
  );
};


