import React from 'react';

const LoginPage = () => {
  return (
    <div className="auth-container">
      {/* Login Section */}
      <section className="auth-section">
        <h1 className="auth-title">Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter your email..."
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

      {/* Signup Section */}
      <section className="auth-section">
        <h1 className="auth-title">Signup</h1>
        <form>
          <div className="input-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="signup-form-input"
                placeholder="Enter your first name..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="signup-form-input"
                placeholder="Enter your last name..."
              />
            </div>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="signup-form-input"
                placeholder="Your email address..."
              />
            </div>
          </div>

          <div className="input-row">
            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                className="signup-form-input"
                placeholder="Enter password..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password" className="form-label">
                Password Confirmation
              </label>
              <input
                id="confirm-password"
                type="password"
                className="signup-form-input"
                placeholder="Confirm password..."
              />
            </div>
          </div>
          <div className="button-wrapper">
            <button type="submit" className="auth-button">
              Get Cooking
            </button>
          </div>
        </form>
     </section>
    </div>
  );
};

export default LoginPage;
