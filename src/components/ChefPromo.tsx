/* eslint-disable @next/next/no-img-element */
// src/components/ChefPromo/ChefPromo.tsx
import React from 'react';

const ChefPromo = () => (
  <section className="chef-promo">
    <div className="promo-container">
      <div className="promo-content">
        <h2 className="promo-title">
          Anyone can be a
          <br />
          chef.. even in your dorm
        </h2>
        <p className="promo-description">
          Learn how to make the best recipes to nourish your body and brain, with limited appliances and ingredients at
          your disposal
        </p>
        <button type="button" className="learn-more-btn">
          Learn More
        </button>
      </div>

      <div className="promo-image-container">
        <img src="/landing-img/tomato.png" alt="Tomato" className="floating-tomato" />
        <img src="/landing-img/chef1.png" alt="Happy chef" className="chef-image" />
        <img src="/landing-img/steak.png" alt="Meat" className="floating-meat" />
        <img src="/landing-img/onion.png" alt="Onion" className="floating-onion" />
        <img src="/landing-img/lettuce.png" alt="Lettuce" className="floating-lettuce" />
      </div>
    </div>
  </section>
);

export default ChefPromo;
