'use client';

import React from 'react';
import { useSession } from 'next-auth/react'; // Import useSession hook
import { ChevronRight } from 'lucide-react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  const { data: session } = useSession(); // Access session data
  const currentUser = session?.user?.email;

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Navbar
          expand="xl"
          variant="light"
          style={{
            borderBottom: 'none',
            boxShadow: 'none',
          }}
        >
          <Container>
            <Navbar.Brand href="/" className="logo">
              Campus Cooking
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-between"
            >
              <Nav className="nav-links">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Recipes', path: '/recipes' },
                  { name: 'Blog', path: '/blog' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'About Us', path: '/about-us' },
                ].map((item) => (
                  <Nav.Link key={item.name} href={item.path}>
                    {item.name}
                  </Nav.Link>
                ))}
                <Nav.Link href="/addrecipe" className="add-recipe-link">
                  Add Recipe
                </Nav.Link>
              </Nav>
              {session ? (
                <NavDropdown
                  title={currentUser || 'User'}
                  id="user-dropdown"
                  className="ms-3"
                >
                  <NavDropdown.Item href="/api/auth/signout">
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <a
                  href="/login"
                  className="login-btn d-flex align-items-center ms-3"
                >
                  Login
                  <ChevronRight size={16} className="ms-1" />
                </a>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default NavBar;
