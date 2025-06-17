// pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist} from '../store/wishlistSlice';

import ProductCard from '../components/ProductListing/ProductCard';
import SortBar from '../components/ProductListing/SortBar';
import Pagination from '../components/ProductListing/Pagination';
import QuickViewModal from '../components/ProductListing/QuickViewModal';

import '../components/ProductListing/ProductGrid.css';

const ProductsPage = () => {   
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  // Fetch from db.json
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        const data = await res.json();
        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Sort handler
  const handleSortChange = (sortBy) => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
          if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt); // Sort
      return 0;
    });
    setSortedProducts(sorted);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (product) => {
    dispatch(addToWishlist(product)); // or toggle if you implement toggling logic
  };

  const handleQuickView = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="products-page">
      <div className="products-header">
        <SortBar
          onSortChange={handleSortChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      <div className={`products-container ${viewMode}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            isAuthenticated={true}
          />
        ))}
      </div>

      <Pagination
        totalItems={sortedProducts.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductsPage;
