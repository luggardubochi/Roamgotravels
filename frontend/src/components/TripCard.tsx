import React from 'react';
import './TripCard.css';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  id: string,
  reverse: boolean;
  imageSrc: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price?: string;
  duration?: string;
}

const TripCard: React.FC<TripCardProps> = ({
  id,
  reverse,
  imageSrc,
  title,
  description,
  bulletPoints,
  price,
  duration
}) => {
  const navigate = useNavigate();
  const handleBookMe = () => {
    const token = localStorage.getItem('token');
    const targetUrl = `/group/${id}`;
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    } else {
      navigate(targetUrl);
    }
  };
  const contentSection = (
    <div className="trip-content" id={id}>
      <h2 className="trip-title">{title}</h2>
      <p className="trip-description">{description}</p>
      
      <div className="trip-details">
        {price && <span className="trip-price">{price}</span>}
        {duration && <span className="trip-duration">{duration}</span>}
      </div>
      
      <ul className="trip-bullet-points">
        {bulletPoints.map((point, index) => (
          <li key={index} className="bullet-point">
            <span className="bullet-icon">✓</span>
            {point}
          </li>
        ))}
      </ul>
      
      <button className="book-me-btn" onClick={handleBookMe}>
        Book Me
      </button>
    </div>
  );

  const imageSection = (
    <div className="trip-image-container">
      <img src={imageSrc} alt={title} className="trip-image" />
    </div>
  );

  return (
    <div className="trip-card">
      {reverse ? (
        <>
          {imageSection}
          {contentSection}
        </>
      ) : (
        <>
          {contentSection}
          {imageSection}
        </>
      )}
    </div>
  );
};

export default TripCard; 