// components/ProductListing/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

const ProductCard = ({
  product,
  onQuickView,
  onAddToCart,
  onWishlistToggle,
  isAuthenticated,
}) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">₹{product.price}</p>
      <p className="product-rating">⭐ {product.rating}</p>

      <div className="product-actions">
        <button className="quick-view-btn" onClick={() => onQuickView(product)}>Quick View</button>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
        {isAuthenticated && (
          <button className="wishlist-btn" onClick={() => onWishlistToggle(product)}>❤️</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
