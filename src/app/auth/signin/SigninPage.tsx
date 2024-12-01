'use client';

import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/** The sign-in page. */
const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect logged-in users to the home page
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const email = target.username.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      callbackUrl: '/',
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="Enter your username..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter your password..."
              required
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
