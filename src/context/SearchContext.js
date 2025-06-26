import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react';
import debounce from 'lodash.debounce';
import SearchService from '../services/searchService';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadRecent = () => {
      const stored = JSON.parse(localStorage.getItem('recentSearches')) || [];
      setRecent(stored);
    };
    loadRecent();
  }, []);

  const saveRecent = useCallback((term) => {
    if (!term) return;
    setRecent(prev => {
      const updated = [term, ...prev.filter(t => t !== term)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const performSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const data = await SearchService.searchProducts(searchTerm);
      setResults(data);
      setSuggestions(data); // assuming suggestions = results
      saveRecent(searchTerm);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [saveRecent]);

 // debouncedSearch.js inside SearchContext.js
const debouncedSearch = useMemo(() =>
  debounce((q) => {
    performSearch(q);
  }, 500),
[performSearch]);

// SearchContext.js

const removeRecentItem = (itemToRemove) => {
  const updated = recent.filter(item => item !== itemToRemove);
  setRecent(updated);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
};

const clearAllRecent = () => {
  setRecent([]);
  localStorage.removeItem('recentSearches');
};



  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <SearchContext.Provider value={{
      query,
      setQuery,
      suggestions,
      results,
      loading,
      recent,
      removeRecentItem,
      clearAllRecent
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
