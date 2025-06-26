import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import CartPopup from './CartPopup';
import WishlistPopup from './WishlistPopup';
import { useSearch } from '../context/SearchContext';

function Header() {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isAuthenticated = !!localStorage.getItem('token');
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

  // Search context
  const {
    query,
    setQuery,
    suggestions,
    recent,
    loading,
    removeRecentItem,
    clearAllRecent
  } = useSearch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCartClick = () => {
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const handleWishlistClick = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setShowSuggestions(false);
    navigate('/search-results');
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150); // slight delay for click
  };

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">QuickCart</Link>
        </div>

        {/* Nav */}
        <nav className="header__nav">
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
        </nav>

        {/* Right Section */}
        <div className="header__right">
          {/* Search */}
          <div className="header__search">
            <button
              className="recent-toggle-btn"
              onClick={() => {
                setQuery('');
                setShowSuggestions((prev) => !prev);
              }}
            >
              Recent
            </button>

            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
            />

            {/* Suggestions Box */}
            {showSuggestions && (suggestions.length > 0 || recent.length > 0) && (
              <div className="search-suggestions">
                {loading && <div className="loading">Loading...</div>}

                {/* Searched Suggestions */}
                {query &&
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}

                {/* Recent Searches */}
                {!query && recent.length > 0 && (
                  <>
                    <div className="recent-label">Recent Searches:</div>

                    {recent.map((item, idx) => (
                      <div key={idx} className="suggestion-item recent">
                        <span onClick={() => handleSuggestionClick(item)}>{item}</span>
                        <button
                          className="remove-btn"
                          onClick={() => removeRecentItem(item)}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                   <div className="clear-recent-wrapper">
                      <button className="clear-recent-btn" onClick={clearAllRecent}>
                        Clear All
                      </button>
                      </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Account Section */}
          {isAuthenticated ? (
            <>
              <Link to="/myAccount" className="header__btn">
                My Account
              </Link>

              <button className="header__icon" onClick={handleWishlistClick}>
                <AiOutlineHeart size={22} />
                {wishlistCount > 0 && <span>{wishlistCount}</span>}
              </button>

              <div className="header__dropdown">
                <button className="header__btn">
                  <AiOutlineUser size={22} />
                </button>
                <div className="header__dropdown-content">
                  <Link to="/dashboard">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="header__btn">
                Login
              </Link>
              <Link to="/register" className="header__btn">
                Register
              </Link>
            </>
          )}

          <button className="header__icon" onClick={handleCartClick}>
            <AiOutlineShoppingCart size={25} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
      {isWishlistOpen && <WishlistPopup onClose={() => setIsWishlistOpen(false)} />}
    </>
  );
}

export default Header;
