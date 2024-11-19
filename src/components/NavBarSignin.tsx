import React from 'react';
import { ChevronRight } from 'lucide-react';

const Navbar = () => (
  <header className="navbar">
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

        <a href="/login" className="login-btn">
          Login
          {' '}
          <ChevronRight size={16} />
        </a>
      </nav>
    </div>
  </header>
);

export default Navbar;
