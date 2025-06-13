import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage'; // ✅ New import


import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';



// Public Route Component (redirects authenticated users)
function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

// App layout with conditional header and footer
function AppContent() {
  const location = useLocation();

  // Routes where header/footer should not be shown
  const hideHeaderFooterRoutes = ['/login', '/register'];
  const showHeaderFooter = !hideHeaderFooterRoutes.includes(location.pathname);
console.log("✅ ProductsPage type:", typeof ProductsPage);

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

          {/* ✅ New route for Product Listing Page */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
