'use client';

import React, { useState } from 'react';
import { addEmailSubscription } from '@/lib/dbActions';
import swal from 'sweetalert';

const EmailSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await addEmailSubscription(email);
      
      if (result.success) {
        swal({
          title: "Subscribed!",
          text: "Thank you for subscribing to our newsletter!",
          icon: "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "swal-button",
              closeModal: true
            }
          }
        });
        setEmail(''); // Clear the input
      } else {
        swal("Error", "Failed to subscribe. Please try again.", "error");
      }
    } catch (error) {
      swal("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Deliciousness to your inbox</h2>
        <p className="newsletter-description">
          Enter your email address to receive the latest recipes and updates, straight to your inbox.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address..."
            className="email-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="subscribe-button">
            Subscribe
          </button>
        </form>
      </div>

      <img src="/landing-img/saladfork.png" alt="" className="food-image-left" aria-hidden="true" />
      <img src="/landing-img/cornerbowl.png" alt="" className="food-image-right" aria-hidden="true" />
    </section>
  );
};

export default EmailSubscribe;
