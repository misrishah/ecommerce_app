import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // optional cleanup
    navigate('/login', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;

        const currentUser = users.find(u => u.username === username);

        if (currentUser) {
          setUser(currentUser);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
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
    return null; // will redirect to login
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
