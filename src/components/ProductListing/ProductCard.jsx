// components/ProductListing/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // Optional for styling

const ProductCard = ({ product, onQuickView, onAddToCart, onToggleWishlist, isWishlisted }) => {
  const { id, title, price, image, rating } = product;

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      
      <div className="product-info">
        <h4>{title}</h4>
        <p>₹{price.toFixed(2)}</p>
        <div className="rating">⭐ {rating}</div>
      </div>

      <div className="product-actions">
        <button onClick={() => onAddToCart(id)} className="cart-btn">🛒 Add</button>
        <button onClick={() => onQuickView(product)} className="quick-view-btn">👁 Quick View</button>
        <button onClick={() => onToggleWishlist(id)} className="wishlist-btn">
          {isWishlisted ? '💜' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
