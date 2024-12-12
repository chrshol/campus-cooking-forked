'use client';

import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => (
  <footer className="top-navbar">
    <div className="top-navbar-container">
    <Navbar expand="xl" className="footer">
      <Container>
        <a href="/" className="logo">
          Campus Cooking
        </a>
        <Navbar.Toggle aria-controls="footer-navbar-nav" />
        <Navbar.Collapse id="footer-navbar-nav" className="justify-content-between">
        <Nav className="footer-links">
          <li>
            <a href="/" className="footer-link">
              Home
            </a>
          </li>
          <li>
            <a href="/recipes" className="footer-link">
              Recipes
            </a>
          </li>
          <li>
            <a href="/contact" className="footer-link">
              Contact
            </a>
          </li>
          <li>
            <a href="/about-us" className="footer-link">
              About us
            </a>
          </li>
        </Nav>

        <div className="footer-social-links">
          <Facebook size={22} />
          <Twitter size={22} />
          <Instagram size={22} />
        </div>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="divider" />
      <div className="text-center py-3">
        <p className="mb-0 body-text">© 2024 Campus Cooking</p>
      </div>
    </div>
  </footer>
);

export default Footer;
