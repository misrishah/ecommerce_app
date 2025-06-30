import React from 'react';
import './SortBar.css';

const SortBar = ({ onSortChange, viewMode, setViewMode }) => {
  return (
    <div className="sortbar-container">
      <div className="view-toggle">
        <button
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          🔳<span>Grid</span>
        </button>
        <button
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
        >
          📋<span>List</span>
        </button>
      </div>

      <div className="sort-dropdown">
        <label htmlFor="sortSelect">Sort by:</label>
        <select id="sortSelect" onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Select</option>
          <option value="price">Price (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="name">Name (A-Z)</option>
          <option value="date">Date (Newest)</option>
        </select>
      </div>
    </div>
  );
};

export default SortBar;
