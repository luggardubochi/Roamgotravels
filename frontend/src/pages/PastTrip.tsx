import React, { useState } from 'react';

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

const pastTripImages = [
  'src/assets/IMG-20250620-WA0065.jpg',
  'src/assets/IMG-20250620-WA0057.jpg',
  'src/assets/IMG-20250620-WA0048.jpg',
  'src/assets/15+Places+You+Must+Visit+in+Albania1.jpg',
  'src/assets/65c27d6543bb77284ba42029.jpeg',
  'src/assets/thailandnwbeachsplash.jpg',
  'src/assets/jyoshankar_travelblogger_desertluxurycamp_morocco_merzouga_saharadesert_glamping_ergchebbi_2.jpg',
];

const pastTripVideos = [
  { src: 'videos/VID-20250620-WA0077.mp4', poster: pastTripImages[0], title: 'Past Trip Video 1', description: 'Our unforgettable adventure in Morocco, featuring camel rides, desert nights, and vibrant markets.' },
  { src: 'videos/VID-20250620-WA0080.mp4', poster: pastTripImages[1], title: 'Past Trip Video 2', description: 'A breathtaking journey through the Swiss Alps, with stunning mountain views and cozy village stays.' },
  { src: 'videos/VID-20250620-WA0081.mp4', poster: pastTripImages[2], title: 'Past Trip Video 3', description: 'Exploring the beautiful beaches and rich culture of Thailand, from island hopping to local cuisine.' },
];

const PastTrip: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const prevVideo = () => {
    setCurrent((prev) => (prev === 0 ? pastTripVideos.length - 1 : prev - 1));
    console.log("Going to the previous video");
  };
  const nextVideo = () => {
    setCurrent((prev) => (prev === pastTripVideos.length - 1 ? 0 : prev + 1));
    console.log("Going to the next video");
  };
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Lora', 'Poppins', Arial, serif", width: '100vw', background: '#f7f9fc', minHeight: '100vh', paddingBottom: '40px' }}>
      <section style={{ width: '100%', padding: '60px 0 30px 0', background: 'linear-gradient(90deg, #ff7043 0%, #fff3e0 100%)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 900, color: '#fff', letterSpacing: '1.5px', textShadow: '0 2px 12px rgba(0,0,0,0.12)', fontFamily: 'Poppins, Inter, Arial, sans-serif', margin: 0 }}>
          Past Trips
        </h1>
        <p style={{ textAlign: 'center', color: '#fff', fontSize: '1.25rem', marginTop: '1rem', fontWeight: 500, fontFamily: 'Inter, Arial, sans-serif' }}>
          Relive the memories from our amazing past adventures!
        </p>
      </section>

      {/* Video Section */}
      <section style={{ width: '100%', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '40px 0', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 2vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 800, color: '#1a237e', marginBottom: '2rem', letterSpacing: '1px', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
            Video Highlights
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', position: 'relative', minHeight: '62vh', minWidth: '80vw', width: '100%' }}>
            <button
              onClick={prevVideo}
              style={{
                fontSize: isMobile ? 24 : 32,
                background: 'linear-gradient(135deg, #ff7043 60%, #ffa270 100%)',
                color: '#fff',
                border: '2px solid #fff3e0',
                fontWeight: 900,
                boxShadow: '0 4px 16px rgba(255,112,67,0.18)',
                borderRadius: '50%',
                width: isMobile ? 32 : 48,
                height: isMobile ? 32 : 48,
                minWidth: isMobile ? 32 : 48,
                minHeight: isMobile ? 32 : 48,
                maxWidth: isMobile ? 32 : 48,
                maxHeight: isMobile ? 32 : 48,
                aspectRatio: '1 / 1',
                cursor: 'pointer',
                position: 'absolute',
                left: 0,
                zIndex: 2,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
              }}
              aria-label="Previous Video"
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.15) scale(1.12)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <span style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#x2039;</span>
            </button>
            <div
              style={{
                width: isMobile ? '98vw' : '80vw',
                height: isMobile ? '30vh' : '60vh',
                maxWidth: isMobile ? '98vw' : 1200,
                maxHeight: isMobile ? 220 : 700,
                background: '#eee',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <video
                width="100%"
                height="100%"
                controls
                poster={pastTripVideos[current].poster}
                style={{ background: '#000', borderRadius: 18, width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src={pastTripVideos[current].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {hovered && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  background: 'rgba(30,30,30,0.85)',
                  color: '#fff',
                  padding: isMobile ? '0.7rem 1rem 0.7rem 0.7rem' : '1.2rem 2rem 1.2rem 1.5rem',
                  borderTopRightRadius: 16,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  maxWidth: isMobile ? '90vw' : '60%',
                  zIndex: 3,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  transition: 'opacity 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <h3 style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#ff7043', fontWeight: 700, margin: 0, marginBottom: 6 }}>{pastTripVideos[current].title}</h3>
                  <span>{pastTripVideos[current].description}</span>
                </div>
              )}
            </div>
            <button
              onClick={nextVideo}
              style={{
                fontSize: isMobile ? 24 : 32,
                background: 'linear-gradient(135deg, #ff7043 60%, #ffa270 100%)',
                color: '#fff',
                border: '2px solid #fff3e0',
                fontWeight: 900,
                boxShadow: '0 4px 16px rgba(255,112,67,0.18)',
                borderRadius: '50%',
                width: isMobile ? 32 : 48,
                height: isMobile ? 32 : 48,
                minWidth: isMobile ? 32 : 48,
                minHeight: isMobile ? 32 : 48,
                maxWidth: isMobile ? 32 : 48,
                maxHeight: isMobile ? 32 : 48,
                aspectRatio: '1 / 1',
                cursor: 'pointer',
                position: 'absolute',
                right: 0,
                zIndex: 2,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
              }}
              aria-label="Next Video"
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.15) scale(1.12)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <span style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#x203A;</span>
            </button>
          </div>
          {/* Video Description Section removed for overlay */}
          <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#333', fontSize: '1.1rem' }}>
            Watch the best moments from our previous trips, from breathtaking landscapes to unforgettable group activities.
          </p>
        </div>
      </section>

      {/* Picture Section */}
      <section style={{ width: '100%', padding: '40px 0', background: '#f7f9fc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2vw' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: '#1a237e', marginBottom: '2rem', letterSpacing: '1px', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
            Photo Gallery
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {pastTripImages.map((src, idx) => (
              <div key={idx} style={{ width: 260, height: 180, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', background: '#fff' }}>
                <img src={src} alt={`Past trip ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#333', fontSize: '1.1rem' }}>
            Explore our gallery to see the fun, friendship, and adventure that define every Roamgo Travels trip.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PastTrip; 