import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import EditRecipeAdmin from '@/components/EditRecipeAdmin';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import '@/app/addrecipe/addrecipepage.css';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditRecipePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      ingredients: true,
      categories: true,
      appliances: true,
    },
  });

  if (!recipe) {
    redirect('/admin/monitor-recipes');
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || '' },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBarSignedin />
      <div className="flex-grow">
        <EditRecipeAdmin recipe={recipe} user={user} />
      </div>
      <Footer />
    </div>
  );
}
