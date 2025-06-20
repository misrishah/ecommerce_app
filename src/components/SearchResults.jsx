// src/components/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchService from '../services/searchService';
import ProductCard from './ProductListing/ProductCard';
import './SearchResults.css';

const SearchResults = ({ isAuthenticated, onQuickView, onAddToCart, onToggleWishlist, wishlist }) => {
  const location = useLocation();
  const currentQuery = new URLSearchParams(location.search).get('q') || '';

  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const [loading, setLoading] = useState(false);
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!currentQuery) return;
      setLoading(true);
      try {
        const products = await SearchService.searchProducts(currentQuery);
        setResults(products);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const loadPopularSearches = () => {
      // You can customize this logic if needed
      const dummyPopular = ['phone', 'laptop', 'watch', 'headphones'];
      setPopularSearches(dummyPopular);
    };

    setSearchTerm(currentQuery);
    loadPopularSearches();
    fetchResults(); // ✅ important!
  }, [currentQuery]);

  return (
    <div className="search-results">
      <div className="search-header">
        <h2>Results for "<span>{searchTerm}</span>"</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isAuthenticated={isAuthenticated}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        <p className="no-results">No products found for "{searchTerm}"</p>
      )}

      {popularSearches.length > 0 && (
        <div className="popular-searches">
          <h4>Popular searches:</h4>
          <ul>
            {popularSearches.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
