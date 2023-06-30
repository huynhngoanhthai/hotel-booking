import React, { useState } from 'react';
import '../styles/CatalogItem.css';

const CatalogItem = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    // Xử lý logic khi mục được nhấp
  };

  return (
    <div
      className={`catalog-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CatalogItem;
