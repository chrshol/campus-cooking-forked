'use client';

import React from 'react';
import { useSession } from 'next-auth/react'; 
import { ChevronRight } from 'lucide-react';
import LoginPopup from './LoginPopup';

const NavBar = () => {
  const { data: session } = useSession(); 
  const currentUser = session?.user?.email;
  const [showPopup, setShowPopup] = React.useState(false);

  const handleAddRecipeClick = () => {
    if (!session) {
      setShowPopup(true);
    }
    else {
      window.location.href = '/addrecipe';
    }
  };

  const handleClosePopup = () => setShowPopup(false);
  const handleLoginRedirect = () => {
    setShowPopup(false);
    window.location.href = '/login';
  };

  return (
    <>
      <header className="top-navbar">
        <div className="top-navbar-container">
          <nav className="top-nav">
            <a href="/" className="logo">
              Campus Cooking
            </a>
            <ul className="top-nav-links">
              <li><a href="/" className="top-nav-link">Home</a></li>
              <li><a href="/recipes" className="top-nav-link">Recipes</a></li>
              <li><a href="/contact" className="top-nav-link">Contact</a></li>
              <li><a href="/about-us" className="top-nav-link">About Us</a></li>
              {session?.user?.randomKey === 'ADMIN' && (
                <li><a href="/admin/monitor-recipes" className="top-nav-link">Monitor Recipes</a></li>
              )}
              <li><a href="#" onClick={handleAddRecipeClick} className="top-nav-link">Add Recipe</a></li>
            </ul>
            {session ? (
              <div className="login-btn d-flex align-items-center ms-3">
                <div className="dropdown">
                  <span className="dropdown-toggle" data-bs-toggle="dropdown">
                    {currentUser || 'User'}
                  </span>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/api/auth/signout">Sign Out</a></li>
                  </ul>
                </div>
              </div>
            ) : (
              <a
                href="/login"
                className="login-btn d-flex align-items-center ms-3"
              >
                Login
                <ChevronRight size={16} className="ms-1" />
              </a>
            )}
          </nav>
        </div>
      </header>

      {showPopup && (
        <LoginPopup
          message="You must be logged in to add a recipe."
          onClose={handleClosePopup}
          onLogin={handleLoginRedirect}
        />
      )}
    </>
  );
};

export default NavBar;
