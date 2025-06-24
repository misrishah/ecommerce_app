// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
    } 
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
