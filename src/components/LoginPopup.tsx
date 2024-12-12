import React from 'react';

const LoginPopup = ({ message, onClose, onLogin }: { message: string; onClose: () => void; onLogin: () => void }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p className="popup-message">{message}</p>
        <div className="popup-actions">
          <button onClick={onLogin} className="btn btn-primary">
            Login
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
