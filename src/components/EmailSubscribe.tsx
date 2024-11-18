/* eslint-disable @next/next/no-img-element */
import React from 'react';

const EmailSubscribe: React.FC = () => (
  <section className="newsletter-section">
    <div className="newsletter-content">
      <h2 className="newsletter-title">Deliciousness to your inbox</h2>
      <p className="newsletter-description">
        Enter your email address to receive the latest recipes and updates, straight to your inbox.
      </p>

      <form className="newsletter-form">
        <input type="email" placeholder="Your email address..." className="email-input" required />
        <button type="submit" className="subscribe-button">
          Subscribe
        </button>
      </form>
    </div>

    <img src="/landing-img/saladfork.png" alt="" className="food-image-left" aria-hidden="true" />
    <img src="/landing-img/cornerbowl.png" alt="" className="food-image-right" aria-hidden="true" />
  </section>
);

export default EmailSubscribe;
