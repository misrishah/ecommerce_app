// src/components/HeroSection.jsx
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to QuickCart</h1>
        <p>Discover the best deals on your favorite products</p>
        <a href="/products" className="hero-btn">Shop Now</a>
      </div>
    </section>
  );
};

export default HeroSection;
