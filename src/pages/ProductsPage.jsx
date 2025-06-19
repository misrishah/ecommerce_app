// pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';

import ProductGrid from '../components/ProductListing/ProductGrid';
import SortBar from '../components/ProductListing/SortBar';
import Pagination from '../components/ProductListing/Pagination';
import QuickViewModal from '../components/ProductListing/QuickViewModal';

import '../components/ProductListing/ProductGrid.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [viewMode, setViewMode] = useState('grid'); // 👈 grid/list toggle

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        const data = await res.json();
        setProducts(data);
        setSortedProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleSortChange = (sortBy) => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
    setSortedProducts(sorted);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleWishlistToggle = (product) => dispatch(addToWishlist(product));
  const handleQuickView = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="products-page">
      <SortBar
        onSortChange={handleSortChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ProductGrid
        products={currentProducts}
        layout={viewMode}
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleWishlistToggle}
      />

      <Pagination
        totalItems={sortedProducts.length}
        itemsPerPage={productsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setProductsPerPage}
        itemsPerPageOptions={[3, 6, 9, 12]}
      />

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductsPage;
