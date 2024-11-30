'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

/** The sign in page. */
const SignIn = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const email = target.email.value;
      const password = target.password.value;
      const result = await signIn('credentials', {
        callbackUrl: '/list',
        email,
        password,
      });
  
      if (result?.error) {
        console.error('Sign in failed: ', result.error);
      }
    };

  return (
    <div className="auth-container">
      {/* Login Section */}
      <section className="auth-section">
        <h1 className="auth-title">Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter your username..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password..."
            />
          </div>
          <div className="button-wrapper">
            <button type="submit" className="auth-button">
              Get Cooking
            </button>
          </div>
        </form>
        <img
          src="/landing-img/cornerbowl.png"
          alt=""
          className="food-image"
          aria-hidden="true"
        />
      </section>
    </div>
  );
};

export default SignIn;
