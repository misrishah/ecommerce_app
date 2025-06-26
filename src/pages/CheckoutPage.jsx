// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Order submitted:', { cartItems, formData, total });
    dispatch(clearCart());
    navigate('/order-confirmation', { state: { total, items: cartItems } });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Your Cart</h2>
        {cartItems.map(item => (
            
          <div key={item.id} className="checkout-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>{item.quantity} × ₹{item.price}</p>
            </div>
          </div>
        ))}
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        {['name', 'address', 'city', 'zip'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
            value={formData[field]}
            onChange={handleChange}
          />
        ))}

        <h2>Payment Details</h2>
        <input name="cardNumber" placeholder="Card Number" required onChange={handleChange} />
        <div className="card-row">
          <input name="expiry" placeholder="MM/YY" required onChange={handleChange} />
          <input name="cvv" placeholder="CVV" required onChange={handleChange} />
        </div>

        <button type="submit" className="pay-btn">Pay ₹{total.toFixed(2)}</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
