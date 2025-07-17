// components/ProductListing/Pagination.jsx
import React from 'react';
import './Pagination.css';

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [3, 6, 9,12]
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        <button
          className="page-btn"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => handleClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* 👇 Items per page dropdown placed below */}
      <div className="page-size-selector">
        <label htmlFor="pageSize">ITEMS PER PAGE:</label>
        <select
          id="pageSize"
          value={itemsPerPage}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
