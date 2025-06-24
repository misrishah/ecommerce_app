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

  // Search Context
  const {
    query,
    setQuery,
    suggestions,
    recent,
    loading
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
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150); // delay so click works
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">QuickCart</Link>
        </div>

        <nav className="header__nav">
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
        </nav>

        <div className="header__right">
          {/* Search bar */}
          <div className="header__search">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={handleBlur}
            />

            {/* Suggestion dropdown */}
            {showSuggestions && (suggestions.length > 0 || recent.length > 0) && (
              <div className="search-suggestions">
                {loading && <div className="loading">Loading...</div>}

                {query && suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(item.title)}
                  >
                    {item.title}
                  </div>
                ))}

                {!query && recent.length > 0 && (
                  <>
                    <div className="recent-label">Recent Searches:</div>
                    {recent.map((item, idx) => (
                      <div
                        key={idx}
                        className="suggestion-item recent"
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/myAccount" className="header__btn">My Account</Link>

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
              <Link to="/login" className="header__btn">Login</Link>
              <Link to="/register" className="header__btn">Register</Link>
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
