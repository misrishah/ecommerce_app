// src/components/CartPopup.jsx
import React from 'react';
import './CartPopup.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, removeFromCart } from '../store/cartSlice';

const CartPopup = ({ onClose }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  {/* Quantity controls */}
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                  </div>

                  {/* Remove button */}
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total and checkout */}
            <div className="cart-total">
              <strong>Total: ₹{getTotal()}</strong>
            </div>

            
          </>
        )}
                <div className="cart-buttons">
        <button className="checkout-btn">Checkout</button>
        <button className="close-btn" onClick={onClose}>Close</button>

        </div>

    
      </div>
    </div>
  );
};

export default CartPopup;
