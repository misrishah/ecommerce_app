// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
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
        <div className="header__search">
          <input type="text" placeholder="Search products..." />
        </div>

        {isAuthenticated ? (
          <>
            <Link to="/myAccount" className="header__btn">My Account</Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="header__icon">
              <AiOutlineHeart size={22} />
              <span>1</span> {/* Replace with dynamic count */}
            </Link>

            {/* User Dropdown */}
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

        {/* Cart Icon */}
        <Link to="/cart" className="header__icon">
          <AiOutlineShoppingCart size={25} />
          <span>0</span> {/* Replace with dynamic cart count */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
