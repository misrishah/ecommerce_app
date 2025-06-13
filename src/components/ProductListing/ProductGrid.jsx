// components/ProductListing/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  layout = 'grid', // 'grid' or 'list'
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist = []
}) => {
  return (
    <div className={`product-grid ${layout}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlist.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
