import React from 'react';

const SigninPage = () => {
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

export default SigninPage;
