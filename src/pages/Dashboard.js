import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        navigate('/login', { replace: true });
        return;
      }

      // Get user details from stored users
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = storedUsers.find(u => u.username === username);
      
      if (currentUser) {
        setUser(currentUser);
      } else {
        // User not found in stored users, logout
        handleLogout();
        return;
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [navigate, handleLogout]);

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.firstName} {user.lastName}!</h2>
      <h4>This is your dashboard.</h4>
      
      <div className="user-info">
        <h3>YOUR PROFILE</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
        
      </div>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;