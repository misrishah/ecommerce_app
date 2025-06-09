import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Public Route Component (redirects authenticated users)
function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

// App layout with conditional header
function AppContent() {
  const location = useLocation();

  // Hide header on login/register page
  const hideHeaderRoutes = ['/login', '/register'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
          <Route
              path="/"
              exact
              element={<Navigate to="/home" replace />}
          />


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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
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
