// src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const { total, items } = state || {};

  return (
    <div className="confirmation-page">
      <h1>Thank you for your order!</h1>
      <p>Your payment of ₹{total?.toFixed(2)} has been received.</p>

      <h2>Purchased Items:</h2>
      <ul>
        {items?.map(item => (
          <li key={item.id}>{item.title} × {item.quantity}</li>
        ))}
      </ul>

      <Link to="/home" className="continue-btn">Continue Shopping</Link>
    </div>
  );
};

export default OrderConfirmationPage;
