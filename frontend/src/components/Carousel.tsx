import React, { useState, useEffect } from 'react';
import './Carousel.css';

const images = [
  'src/assets/carousel_image_1.jpg',
  'src/assets/carousel_image_2.jpg',
  'src/assets/carousel_image_3.jpg',
  'src/assets/carousel_image_4.jpg',
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  // const prevSlide = () => {
  //   setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  // const nextSlide = () => {
  //   setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  return (
    <div className="carousel">
      <img src={images[current]} alt={`Slide ${current + 1}`} className="carousel-image" />
      {/* <button className="carousel-btn left" onClick={prevSlide}>&lt;</button> */}
      {/* <button className="carousel-btn right" onClick={nextSlide}>&gt;</button> */}
      <div className="carousel-message">
        <h2>Let's roam the world together</h2>
      </div>
    </div>
  );
};

export default Carousel; 