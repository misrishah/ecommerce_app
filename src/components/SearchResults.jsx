import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from './ProductListing/ProductGrid';
import QuickViewModal from './ProductListing/QuickViewModal';
import { useSearch } from '../context/SearchContext';

import './SearchResults.css';

const SearchResults = () => {
  const { query } = useSearch();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // for QuickView modal

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((res) => setAllProducts(res.data))
      
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    const lowerQuery = query.trim().toLowerCase();
    if (!lowerQuery) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [query, allProducts]);

  return (
    <div className="search-results">
      <h2>Search Results for: <em>{query}</em></h2>

      <ProductGrid
        products={filteredProducts}
        layout="grid"
        onQuickView={setSelectedProduct}
        onAddToCart={(product) => console.log('Add to cart:', product)}
        onToggleWishlist={(id) => console.log('Toggle wishlist:', id)}
        isAuthenticated={!!localStorage.getItem('token')}
        wishlist={[]} // or from redux if available
        searchTerm={query}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default SearchResults;
