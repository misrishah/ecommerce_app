// components/ProductListing/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  layout = 'grid', // Accepts 'grid' or 'list'
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlist = []
}) => {
  // Validate layout fallback just in case
  const appliedLayout = layout === 'list' ? 'list' : 'grid';

  return (
    <div className={`product-grid ${appliedLayout}`}>
      {products.map((product) => (
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
