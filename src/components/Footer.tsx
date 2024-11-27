'use client';

import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => (
  <footer className="navbar">
    <div className="navbar-container">
    <nav className="nav">
        <a href="/" className="logo">
          Campus Cooking
        </a>

        <ul className="nav-links">
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="/recipes" className="nav-link">
              Recipes
            </a>
          </li>
          <li>
            <a href="/blog" className="nav-link">
              Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
          <li>
            <a href="/about-us" className="nav-link">
              About us
            </a>
          </li>
        </ul>

        <div className="social-links">
          <Facebook size={22} />
          <Twitter size={22} />
          <Instagram size={22} />
        </div>
      </nav>
      <div className="divider" />
      <div className="text-center py-3">
        <p className="mb-0 body-text">© 2024 Campus Cooking</p>
      </div>
    </div>
  </footer>
);

export default Footer;
