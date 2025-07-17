// src/services/searchService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // json-server default

const searchProducts = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const allProducts = res.data;

    // Do the filtering here
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    return filtered;
    
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

const searchService = {
  searchProducts,
};

export default searchService;

