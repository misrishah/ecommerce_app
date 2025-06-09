// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure this path is correct!
import { AiOutlineShoppingCart } from 'react-icons/ai';
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
      <div className="header__search">
        <input type="text" placeholder="Search products..." />
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="header__btn">Login</Link>
            <Link to="/register" className="header__btn">Register</Link>
          </>
        ) : (
          <button className="header__btn" onClick={handleLogout}>Logout</button>
        )}
{/* ✅ Cart Icon */}
        <Link to="/cart" className="header__icon">
          <AiOutlineShoppingCart size={24} />
          <span>0</span> {/* You can dynamically show cart count here */}
        </Link>
      </div>
    </header>
  );
}

export default Header;
