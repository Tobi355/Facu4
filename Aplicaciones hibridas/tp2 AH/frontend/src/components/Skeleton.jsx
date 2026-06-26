import React from 'react';

const Skeleton = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <div className="row g-4">
        {Array.from({ length: count }).map((_, i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="card border-0 h-100 p-4">
              <div className="skeleton skeleton-title mb-3" />
              <div className="skeleton skeleton-text mb-2" />
              <div className="skeleton skeleton-text w-75 mb-2" />
              <div className="skeleton skeleton-text w-50 mb-3" />
              <div className="d-flex justify-content-between">
                <div className="skeleton skeleton-badge" />
                <div className="skeleton skeleton-button" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div>
        {Array.from({ length: count }).map((_, i) => (
          <div className="d-flex gap-3 mb-3 align-items-center" key={i}>
            <div className="skeleton skeleton-text w-25" />
            <div className="skeleton skeleton-text w-25" />
            <div className="skeleton skeleton-text w-15" />
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-button w-10" />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default Skeleton;
