// pages/ProductsPage.jsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductListing/ProductCard';
import SortBar from '../components/ProductListing/SortBar';
import Pagination from '../components/ProductListing/Pagination';
import QuickViewModal from '../components/ProductListing/QuickViewModal';
import '../components/ProductListing/ProductGrid.css'; // style file

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
  // ...add more
];

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortedProducts, setSortedProducts] = useState(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState(null); // for modal
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  const handleSortChange = (sortBy) => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleQuickView = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="products-page">
      <div className="products-header">
        <SortBar onSortChange={handleSortChange} viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className={`products-container ${viewMode}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
            onAddToCart={() => console.log('Add to cart:', product)}
            onWishlistToggle={() => console.log('Toggle wishlist:', product)}
            isAuthenticated={true} // later: fetch from context/auth
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
