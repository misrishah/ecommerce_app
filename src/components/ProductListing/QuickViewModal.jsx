// components/ProductListing/QuickViewModal.jsx
import React from 'react';
import './QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={product.image} alt={product.title} className="modal-image" />
          <div className="modal-details">

            <h2>{product.title}</h2>
            
            <p className="modal-price">₹{product.price}</p>
            <p className="modal-description">{product.description}</p>
            <p className="modal-rating">⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
