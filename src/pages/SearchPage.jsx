// src/pages/SearchPage.jsx
import React from 'react';
import SearchResults from '../components/SearchResults';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistIds = wishlistItems.map((item) => item.id);

  return (
    <>
      <Header />
      <SearchResults
        isAuthenticated={isAuthenticated}
        wishlist={wishlistIds}
        onAddToCart={(product) => dispatch(addToCart(product))}
        onToggleWishlist={(product) => dispatch(toggleWishlist(product))}
        onQuickView={() => {}}
      />
      <Footer />
    </>
  );
};

export default SearchPage;
