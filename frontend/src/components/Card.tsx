import React from 'react';
import './Card.css';

interface CardProps {
  imageSrc: string;
  title: string;
  details: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, details }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-title-caption">{title}</div>
      <div className="card-details">{details}</div>
    </div>
  );
};

export default Card; 