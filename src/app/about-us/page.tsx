'use client';

import React from 'react';
import Footer from '@/components/Footer'; 
import NavBarSignedin from '@/components/NavBarSignedin';
import 'bootstrap/dist/css/bootstrap.min.css';
import './aboutus.css';

const AboutUsPage = () => {
  return (
    <>
      <NavBarSignedin />
      <div className="aboutus-container">
        <section className="aboutus-header">
          <h1 className="aboutus-title">About Us</h1>
        </section>

        <section className="aboutus-section">
          <h2 className="section-title">Overview</h2>
          <p className="section-content">
            Campus Cooking is an application designed to help campus students create affordable, healthy, and accessible meals. 
            Our goal is to simplify cooking for students facing constraints such as limited kitchen resources, cooking skills, 
            or access to grocery stores.
          </p>
        </section>

        <section className="aboutus-section">
          <h2 className="section-title">Purpose</h2>
          <p className="section-content">
            Campus Cooking addresses the challenges many students face when trying to maintain a healthy diet on a budget. 
            By offering simple recipes with affordable ingredients, we empower students to improve their nutrition and overall well-being.
          </p>
        </section>

        <section className="aboutus-section">
          <h2 className="section-title">Key Features</h2>
          <ul className="features-list">
            <li>Recipes tailored to basic kitchen setups (e.g., toaster oven, microwave).</li>
            <li>Ingredients that are easy to find near campus.</li>
            <li>Customizable filters for dietary preferences (e.g., vegan, gluten-free).</li>
            <li>Estimated cost, preparation time, and serving size for each recipe.</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2 className="section-title">Team</h2>
          <p className="section-content">
            Campus Cooking was designed and developed by a team of students:
          </p>
          <ul className="team-list">
            <li>Anaya Cole</li>
            <li>Lindsey Clement</li>
            <li>Christina Holthe</li>
            <li>Kayla Young</li>
          </ul>
        </section>

        <section className="aboutus-section">
          <h2 className="section-title">Connect With Us</h2>
          <p className="section-content">
            Check out our GitHub repository for more details about the project and stay updated on new features and releases.
          </p>
          <a
            href="https://github.com/Campus-Cooking/campus-cooking"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            Visit our GitHub
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage;
