import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import { SearchService } from '../services/searchService';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  
  const searchQuery = searchParams.get('q') || '';

  // Sample products - replace with your actual data
  const [products] = useState([
    { id: 1, name: 'Smart Watch', category: 'Electronics', price: 1700, rating: 4.2, brand: 'Apple', description: 'Advanced fitness tracking smartwatch' },
    { id: 2, name: 'Wireless Headphones', category: 'Audio', price: 2499, rating: 4.5, brand: 'Sony', description: 'Premium noise-canceling headphones' },
    { id: 3, name: 'Bluetooth Speaker', category: 'Audio', price: 1399, rating: 4.0, brand: 'JBL', description: 'Portable wireless speaker with deep bass' },
    { id: 4, name: 'Gaming Mouse', category: 'Computer', price: 899, rating: 4.3, brand: 'Logitech', description: 'High-precision gaming mouse' },
    { id: 5, name: 'Mechanical Keyboard', category: 'Computer', price: 1299, rating: 4.4, brand: 'Corsair', description: 'RGB mechanical gaming keyboard' },
    { id: 6, name: 'Smartphone', category: 'Electronics', price: 45999, rating: 4.6, brand: 'Samsung', description: 'Latest flagship smartphone' },
    { id: 7, name: 'Laptop Stand', category: 'Accessories', price: 599, rating: 4.1, brand: 'Generic', description: 'Adjustable aluminum laptop stand' },
    { id: 8, name: 'USB Cable', category: 'Accessories', price: 199, rating: 3.9, brand: 'Anker', description: 'Fast charging USB-C cable' },
    { id: 9, name: 'Wireless Charger', category: 'Electronics', price: 799, rating: 4.2, brand: 'Belkin', description: 'Qi wireless charging pad' },
    { id: 10, name: 'Tablet', category: 'Electronics', price: 25999, rating: 4.4, brand: 'iPad', description: 'High-performance tablet for work and play' }
  ]);

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const results = SearchService.searchProducts(products, searchQuery);
        const sortedResults = SearchService.sortResults(results, sortBy);
        setSearchResults(sortedResults);
        setLoading(false);
      }, 300);
    } else {
      setSearchResults(products);
    }
  }, [searchQuery, sortBy, products]);

  // Handle new search
  const handleSearch = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${newParams}`);
  };

  // Handle sort change
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // Handle product click
  const handleProductClick = (product) => {
    // Navigate to product detail page
    console.log('Product clicked:', product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      <Header onSearch={handleSearch} products={products} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
            </h2>
            <p className="text-purple-200">
              {loading ? 'Searching...' : `${searchResults.length} products found`}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded font-medium ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded font-medium ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                List
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-3 py-2"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        <SearchResults 
          results={searchResults}
          searchQuery={searchQuery}
          onProductClick={handleProductClick}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default SearchPage;