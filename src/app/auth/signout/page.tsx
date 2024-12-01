'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const SignOut = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/', redirect: true });
  };

  const handleCancel = () => {
    // Stay on the current page by doing nothing
    window.history.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <section className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900">Sign Out</h1>
        <div className="text-center">
          <p className="mb-8 text-lg text-gray-600">Are you sure you want to leave?</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSignOut}
              className="rounded-md bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
            <button 
              onClick={handleCancel}
              className="rounded-md bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
        <img
          src="/api/placeholder/200/200"
          alt="Decorative food"
          className="absolute -bottom-10 -right-10 w-32 opacity-50"
          aria-hidden="true"
        />
      </section>
    </div>
  );
};

export default SignOut;