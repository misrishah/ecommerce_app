// components/ProductListing/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  layout = 'grid',
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isAuthenticated,
  wishlist = []
}) => {
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
          viewMode={layout}
           isAuthenticated={isAuthenticated} // ✅ add this
        />

      ))}
    </div>
  );
};

export default ProductGrid;
