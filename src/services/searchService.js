// Search service for handling product search logic
export class SearchService {
  
  // Perform search across products
  static searchProducts(products, query) {
    if (!query.trim()) {
      return products;
    }

    const searchTerm = query.toLowerCase();
    
    const filtered = products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm) ||
      product.brand?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    // Sort by relevance (name matches first, then category, then rating)
    return filtered.sort((a, b) => {
      const aNameMatch = a.name?.toLowerCase().includes(searchTerm);
      const bNameMatch = b.name?.toLowerCase().includes(searchTerm);
      
      // Prioritize name matches
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Secondary sort by rating
      return (b.rating || 0) - (a.rating || 0);
    });
  }

  // Get search suggestions
  static getSearchSuggestions(products, query) {
    if (!query.trim()) return [];
    
    const suggestions = new Set();
    const searchTerm = query.toLowerCase();
    
    // Product name suggestions
    products.forEach(product => {
      if (product.name?.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.name);
      }
    });

    // Category suggestions
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchTerm)) {
        suggestions.add(category);
      }
    });

    // Brand suggestions
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    brands.forEach(brand => {
      if (brand.toLowerCase().includes(searchTerm)) {
        suggestions.add(brand);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  }

  // Highlight matching text in search results
  static highlightText(text, query) {
    if (!query.trim() || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-purple-800 font-semibold">$1</mark>');
  }

  // Get search filters based on current results
  static getSearchFilters(products) {
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    const priceRanges = [
      { label: 'Under ₹500', min: 0, max: 500 },
      { label: '₹500 - ₹1,000', min: 500, max: 1000 },
      { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
      { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
      { label: 'Above ₹10,000', min: 10000, max: Infinity }
    ];

    return {
      categories: categories.sort(),
      brands: brands.sort(),
      priceRanges
    };
  }

  // Apply filters to search results
  static applyFilters(products, filters) {
    let filtered = [...products];

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Brand filter
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(product => 
        (product.rating || 0) >= filters.minRating
      );
    }

    return filtered;
  }

  // Sort search results
  static sortResults(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
      default:
        return sorted;
    }
  }
}