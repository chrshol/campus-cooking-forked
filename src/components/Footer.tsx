/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => (
  <footer className="navbar">
    <div className="navbar-container">
      <nav className="nav">
        <a href="/" className="logo">
          Campus Cooking
        </a>

        <ul className="nav-links">
          {['Home', 'Recipes', 'Blog', 'Contact', 'About us'].map((item) => (
            <li key={item}>
              <a href={`/${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="divider" />
      <nav className="nav">
        <a href="/" className="body-text">
          © 2024 Campus Cooking
        </a>

        <ul className="nav-links">
          <li>
            <Facebook size={22} />
          </li>
          <li>
            <Twitter size={22} />
          </li>
          <li>
            <Instagram size={22} />
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
