'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import Footer from '@/components/Footer'; 
import NavBarSignedin from '@/components/NavBarSignedin';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css';
import './signout.css';

const SignOut = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/', redirect: true });
  };

  const handleCancel = () => {
    // Stay on the current page by doing nothing
    window.history.back();
  };

  return (
    <>
      
      <NavBarSignedin/>
      <div className="auth-container">
        <section className="auth-section">
          <h1 className="auth-title">Sign Out</h1>
          <div className="text-center">
          <p className="mb-8 text-lg text-gray-600">Are you sure you want to leave?</p>
          <div className="button-wrapper">
              <button
                onClick={handleSignOut}
                className="auth-button"
              >
                Sign Out
              </button>
              <button
                onClick={handleCancel}
                className="auth-button"
              >
                Cancel
              </button>
            </div>
          </div>
          <img src="/landing-img/cornerbowl.png" alt="" className="food-image-right" aria-hidden="true" />
          <img src="/landing-img/saladfork.png" alt="" className="food-image-left" aria-hidden="true" />
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default SignOut;
