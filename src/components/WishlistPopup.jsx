import React from 'react';
import './WishlistPopup.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice'; // adjust path if needed

const WishlistPopup = ({ onClose }) => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="wishlist-popup-overlay" onClick={onClose}>
      <div className="wishlist-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Your Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <ul>
            {wishlistItems.map((item, index) => (
              <li key={index} className="wishlist-item">
                <img src={item.image} alt={item.name} />
                <div className="wishlist-details">
                  <p className="wishlist-name">{item.name}</p>
                  <p className="wishlist-price">₹{item.price}</p>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClose} className="wishlist-close-btn">Close</button>
      </div>
    </div>
  );
};

export default WishlistPopup;
