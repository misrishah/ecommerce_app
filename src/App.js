import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './components/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SearchPage from './pages/SearchPage';

import Header from './components/Header';
import Footer from './components/Footer';

import { SearchProvider } from './context/SearchContext'; // ✅ Wrap your app with this

import './App.css';

// Public Route (used to block access for already logged-in users)
function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

// Conditionally show Header/Footer
function AppContent() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ['/login', '/register'];
  const showHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="page-wrapper">
      {showHeaderFooter && <Header />}

      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/search" element={<SearchPage />} /> {/* Optional */}
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

// ✅ Final App Component wrapped with SearchProvider
function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
