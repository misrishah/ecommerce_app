import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import CartPopup from './CartPopup';
import WishlistPopup from './WishlistPopup';

function Header() {
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const isAuthenticated = !!localStorage.getItem('token');
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCartClick = () => {
    setIsWishlistOpen(false); // Close wishlist if open
    setIsCartOpen(true);
  };

  const handleWishlistClick = () => {
    setIsCartOpen(false); // Close cart if open
    setIsWishlistOpen(true);
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
            <input type="text" placeholder="Search products..." />
          </div>

          {isAuthenticated ? (
            <>
              <Link to="/myAccount" className="header__btn">My Account</Link>

              {/* Wishlist icon */}
              <button className="header__icon" onClick={handleWishlistClick}>
                <AiOutlineHeart size={22} />
                {wishlistCount > 0 && <span>{wishlistCount}</span>}
              </button>

              {/* User dropdown */}
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

          {/* Cart icon */}
          <button className="header__icon" onClick={handleCartClick}>
            <AiOutlineShoppingCart size={25} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Panels */}
      {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
      {isWishlistOpen && <WishlistPopup onClose={() => setIsWishlistOpen(false)} />}
    </>
  );
}

export default Header;
