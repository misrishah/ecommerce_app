// src/services/searchService.js
const API_BASE = 'https://dummyjson.com';

const searchProducts = async (query) => {
  const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.products;
};

const getAllProducts = async (limit = 1000, skip = 0) => {
  const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return data.products;
};

const SearchService = {
  searchProducts,
  getAllProducts,
};

export default SearchService;
