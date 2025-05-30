import React, { useState } from 'react';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Stored users:', storedUsers);

    const existingUser = storedUsers.find(
      user =>
        (user.username === username || user.email === username) &&
        user.password === password
    );
    console.log('Found user:', existingUser);

    if (existingUser) {
      alert('Login successful!');
      localStorage.setItem('username', existingUser.username);
      localStorage.setItem('token', 'dummy-auth-token'); // Optional token
      window.location.href = '/dashboard';
    } else {
      alert('Invalid username/email or password.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}

export default Login;
