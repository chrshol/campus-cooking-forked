import { redirect } from 'next/navigation';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (session: { user: { email: string; id: string; randomKey: string } } | null) => {
  console.log('Session:', session); // Add this line
  console.log('User role:', session?.user?.randomKey); // Add this line
  loggedInProtectedPage(session);
  if (session && session.user.randomKey !== 'ADMIN') {
    console.log('Redirecting: Not an admin'); // Add this line
    redirect('/not-authorized');
  }
};
