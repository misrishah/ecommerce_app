// pages/ProductsPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';

import ProductCard from '../components/ProductListing/ProductCard';
import SortBar from '../components/ProductListing/SortBar';
import Pagination from '../components/ProductListing/Pagination';
import QuickViewModal from '../components/ProductListing/QuickViewModal';

import '../components/ProductListing/ProductGrid.css';

// Dummy products (replace later with real API)
const sampleProducts = [
  {
    id: 1,
    title: 'Wooden Table',
    image: 'https://via.placeholder.com/150',
    price: 999,
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Gaming Chair',
    image: 'https://via.placeholder.com/150',
    price: 1499,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Bluetooth Headphones',
    image: 'https://via.placeholder.com/150',
    price: 499,
    rating: 4.2,
  },
  {
    id: 4,
    title: 'Wired Headphones',
    image: 'https://via.placeholder.com/150',
    price: 369,
    rating: 4.1,
  },
  {
    id: 5,
    title: 'Television',
    image: 'https://via.placeholder.com/150',
    price: 22199,
    rating: 3.5,
  },
  {
    id: 6,
    title: 'Laptop',
    image: 'https://via.placeholder.com/150',
    price: 31499,
    rating: 4.6,
  },
  {
    id: 7,
    title: 'Smart Watch',
    image: 'https://via.placeholder.com/150',
    price: 1700,
    rating: 4.2,
  },
];

const ProductsPage = () => {
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortedProducts, setSortedProducts] = useState(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Handlers
  const handleSortChange = (sortBy) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (product) => {
    dispatch(toggleWishlist(product));
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
