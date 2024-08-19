import React from 'react';
import './ActionButton.css';

const ActionButton = ({ icon, text }) => {
  return (
    <button className="custom-button">
      <span className="button-icon">{icon}</span>
      <span className="button-text">{text}</span>
      <span className="button-dot"></span>
    </button>
  );
};

export default ActionButton;
