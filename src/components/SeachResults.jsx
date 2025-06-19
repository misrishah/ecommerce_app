import React from 'react';

const SearchResults = ({ 
  results = [], 
  searchQuery = '', 
  onProductClick,
  loading = false 
}) => {
  
  // Highlight matching text
  const highlightText = (text, query) => {
    if (!query.trim() || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 text-purple-800 font-semibold">{part}</span> : 
        part
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && searchQuery) {
    return (
      <div className="text-center text-white py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold mb-2">No products found</h3>
        <p className="text-purple-200">
          Try adjusting your search terms or browse our categories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((product) => (
        <div 
          key={product.id} 
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => onProductClick && onProductClick(product)}
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">Product Image</span>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              {highlightText(product.name, searchQuery)}
            </h3>
            {product.description && (
              <p className="text-gray-600 mb-2 text-sm">
                {highlightText(product.description, searchQuery)}
              </p>
            )}
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-purple-600">
                ₹{product.price?.toLocaleString()}
              </span>
              {product.rating && (
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>
            {product.category && (
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {highlightText(product.category, searchQuery)}
                </span>
              </div>
            )}
            <div className="flex space-x-2">
              <button className="flex-1 bg-purple-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors">
                Quick View
              </button>
              <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;