import React from 'react';

const Loader = ({ children }) => (
  <div className="container py-5">
    {children || (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}
  </div>
);

export default Loader;
