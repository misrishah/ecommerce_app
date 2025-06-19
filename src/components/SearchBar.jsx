import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp, X } from 'lucide-react';

const SearchBar = ({ 
  onSearch, 
  onSuggestionClick, 
  products = [], 
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  // Popular search terms
  const popularSearches = ['Electronics', 'Audio', 'Gaming', 'Smartphone', 'Wireless'];

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quickcart-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearches = (searches) => {
    localStorage.setItem('quickcart-recent-searches', JSON.stringify(searches));
    setRecentSearches(searches);
  };

  // Get search suggestions
  const getSuggestions = (query) => {
    if (!query.trim()) return [];
    
    const suggestions = [];
    
    // Product name suggestions
    products.forEach(product => {
      if (product.name?.toLowerCase().includes(query.toLowerCase()) && 
          !suggestions.some(s => s.text === product.name)) {
        suggestions.push({ text: product.name, type: 'product' });
      }
    });

    // Category suggestions
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(query.toLowerCase()) && 
          !suggestions.some(s => s.text === category)) {
        suggestions.push({ text: category, type: 'category' });
      }
    });

    return suggestions.slice(0, 6);
  };

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 text-purple-800 font-semibold">{part}</span> : 
        part
    );
  };

  // Handle search input
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (query = searchQuery) => {
    if (!query.trim()) return;
    
    setShowSuggestions(false);
    onSearch(query);
    
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    saveRecentSearches(newRecent);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearchSubmit(suggestion);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onSearch('');
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInput}
          onFocus={() => searchQuery && setShowSuggestions(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchQuery ? (
            <>
              {getSuggestions(searchQuery).length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 mb-2">SUGGESTIONS</div>
                  {getSuggestions(searchQuery).map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                    >
                      <Search className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="flex-1">{highlightText(suggestion.text, searchQuery)}</span>
                      <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Quick search submit */}
              <div className="border-t p-2">
                <div
                  onClick={() => handleSearchSubmit()}
                  className="flex items-center px-3 py-2 hover:bg-purple-50 cursor-pointer rounded text-purple-600"
                >
                  <Search className="w-4 h-4 mr-3" />
                  <span>Search for "{searchQuery}"</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 mb-2">RECENT SEARCHES</div>
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                    >
                      <Clock className="w-4 h-4 text-gray-400 mr-3" />
                      <span>{search}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Popular Searches */}
              <div className={`${recentSearches.length > 0 ? 'border-t' : ''} p-2`}>
                <div className="text-xs font-semibold text-gray-500 mb-2">TRENDING</div>
                {popularSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(search)}
                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                  >
                    <TrendingUp className="w-4 h-4 text-gray-400 mr-3" />
                    <span>{search}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;