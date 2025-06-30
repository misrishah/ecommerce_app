// components/ProductListing/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products = [],
  layout = 'grid',
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isAuthenticated,
  wishlist = [],
  searchTerm = '' 
}) => {
  const appliedLayout = layout === 'list' ? 'list' : 'grid';
  const trimmedSearch = searchTerm.trim().toLowerCase(); 

  return (
    <div className={`product-grid ${appliedLayout}`}>
      {products.map((product) => {
        const isMatch =
          trimmedSearch === '' ||
          product.title?.toLowerCase().includes(trimmedSearch) ||
          product.description?.toLowerCase().includes(trimmedSearch);

        if (!isMatch) return null;

        return (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlist.includes(product.id)}
            viewMode={layout}
            isAuthenticated={isAuthenticated}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
