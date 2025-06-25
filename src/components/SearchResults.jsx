import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductListing/ProductCard'; // Adjust if your path differs
import './SearchResults.css';
import { useSearch } from '../context/SearchContext';

const SearchResults = () => {
  const { query } = useSearch();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts(allProducts);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }
  }, [query, allProducts]);

  return (
    <div className="search-results">
      <h2>Search Results for: <em>{query}</em></h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
