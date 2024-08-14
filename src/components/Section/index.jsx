import React from 'react';
import './Section.css';

const Section = ({ children }) => {
  return (
    <div className="section-container">
      {children} {/* Renderiza los children */}
    </div>
  );
};

export default Section;
