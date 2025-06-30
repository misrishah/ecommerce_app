// components/ProductListing/ProductCard.jsx
import React from 'react';
import './ProductCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';

const ProductCard = ({ product, onQuickView}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">₹{product.price}</p>
      <p className="product-rating">⭐ {product.rating}</p>
      <p className="product-date">
  Added on: {new Date(product.createdAt).toLocaleDateString()}
</p>

     <div className="product-actions">
  <button className="quick-view-btn" onClick={() => onQuickView(product)}>
    Quick View
  </button>
  <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(product))}>
    Add to Cart
  </button>
  {isAuthenticated && (
    <button className="wishlist-icon-btn" onClick={() => dispatch(toggleWishlist(product))}>
      {isWishlisted ? '❤️' : '💜'}
    </button>
  )}
</div>

    </div>
  );
};

export default ProductCard;
