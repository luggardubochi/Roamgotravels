import React, { useState, useEffect } from 'react';
import './Carousel.css';
import Image1 from './../assets/carousel_image_1.jpg';
import Image2 from './../assets/carousel_image_2.jpg';
import Image3 from './../assets/carousel_image_3.jpg';
import Image4 from './../assets/carousel_image_4.jpg';

const images = [Image1, Image2, Image3, Image4];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <img src={images[current]} alt={`Slide ${current + 1}`} className="carousel-image" />
      {/* <button className="carousel-btn left" onClick={prevSlide}>&lt;</button> */}
      {/* <button className="carousel-btn right" onClick={nextSlide}>&gt;</button> */}
      {/* <div className="carousel-message">
        <h2>Let's roam the world together</h2>
      </div> */}
    </div>
  );
};

export default Carousel; 