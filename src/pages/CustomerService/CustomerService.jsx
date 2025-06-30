// src/pages/CustomerService/CustomerService.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerService.css';

const CustomerService = () => {
  return (
    <div className="customer-service-page">
      <h2>Customer Service</h2>
      <ul className="service-links">
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/returns">Returns</Link></li>
        <li><Link to="/shipping-info">Shipping Info</Link></li>
      </ul>
    </div>
  );
};

export default CustomerService;
