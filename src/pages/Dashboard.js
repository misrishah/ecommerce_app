import React, { useEffect } from 'react';

function Dashboard() {
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (!username) {
      window.location.href = '/login';
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <h2>Welcome, {username}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
