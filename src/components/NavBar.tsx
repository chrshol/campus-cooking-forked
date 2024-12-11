'use client';

import React from 'react';
import { useSession } from 'next-auth/react'; 
import { ChevronRight } from 'lucide-react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
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
      window.location.href = '/addrecipe'; // Navigates if logged in
    }
  };

  const handleClosePopup = () => setShowPopup(false);
  const handleLoginRedirect = () => {
    setShowPopup(false); // Closes the popup before redirecting
    window.location.href = '/login';
  };

  return (
    <>
      <header className="top-navbar">
        <div className="top-navbar-container">
          <Navbar
            expand="xl"
            variant="light"
            style={{
              borderBottom: 'none',
              boxShadow: 'none',
            }}
          >
            <Container>
            <a href="/" className="top-logo">
              Campus Cooking
            </a>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
              >
                <Nav className="top-nav-links">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Recipes', path: '/recipes' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'About Us', path: '/about-us' },
                  ].map((item) => (
                    <Nav.Link key={item.name} href={item.path}>
                      {item.name}
                    </Nav.Link>
                  ))}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>
    </>
  );
};

export default NavBar;
