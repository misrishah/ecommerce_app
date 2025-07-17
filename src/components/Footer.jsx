import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Company Info */}
        <div className="footer-section"> 
          
          <h4>QuickCart</h4>
          <p>Definetly a one-stop shop for everything you wish!</p>
        </div>

        {/* Useful Links */}
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/dashboard">My Account</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/support">Support</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe for latest offers:</p>
        <div className="newsletter-form vertical">
          <input type="email" placeholder="Your email" />
          <button type="button">Subscribe</button>
        </div>
      </div>

        {/* Payment Methods */}
        <div className="footer-section payment-methods">
          <h4>We Accept</h4>
          <div className="payment-icons">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
          </div>
        </div>


        {/* Social Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p> © {new Date().getFullYear()} QuickCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
