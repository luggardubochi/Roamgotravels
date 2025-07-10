import React from 'react';
import Card from '../components/Card';
import TripCard from '../components/TripCard';
import { GroupTripInfo } from '../components/TripInfo';
import GroupImage1 from './../assets/cards/IMG-20250620-WA0046.jpg';
import GroupImage2 from './../assets/cards/IMG-20250620-WA0050.jpg';
import GroupImage3 from './../assets/cards/IMG-20250620-WA0054.jpg';

const trips = [
  {
    imageSrc: GroupImage1,
    title: "Single's Trip",
    details: 'Solo adventures for independent travelers. Discover new places and meet new friends!'
  },
  {
    imageSrc: GroupImage2,
    title: 'Couples Trip',
    details: 'Romantic getaways for two. Enjoy curated experiences and beautiful destinations.'
  },
  {
    imageSrc: GroupImage3,
    title: 'Group Trips',
    details: 'Travel with friends, family, or colleagues. Group discounts and fun activities.'
  },
];

const Trips: React.FC = () => {
  return (
    <div style={{ fontFamily: "'Nunito', 'Lato', Arial, sans-serif", width: '100vw', background: 'var(--color-neutral)', minHeight: '100vh', paddingBottom: '40px' }}>
      <section style={{ width: '100%', padding: '60px 0 30px 0', background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-neutral) 100%)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 900, color: 'var(--color-text-light)', letterSpacing: '1.5px', textShadow: '0 2px 12px rgba(0,0,0,0.12)', fontFamily: 'Poppins, Inter, Arial, sans-serif', margin: 0 }}>
          Explore Our Trips
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-light)', fontSize: '1.25rem', marginTop: '1rem', fontWeight: 500, fontFamily: 'Inter, Arial, sans-serif' }}>
          Find the perfect adventure for you, your partner, or your group.
        </p>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 2vw 0 2vw', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
        {trips.map((trip, idx) => (
          <Card key={idx} imageSrc={trip.imageSrc} title={trip.title} details={trip.details} />
        ))}
      </div>

      {/* Solo Trip Section */}
      <section style={{ width: '100%', padding: '50px 0', background: 'var(--color-primary)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 2vw', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '1.5rem', letterSpacing: '1px', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
            Solo Trip
          </h2>
          <p style={{ color: 'var(--color-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', fontWeight: 500, fontFamily: 'Inter, Arial, sans-serif', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            Embark on a journey of self-discovery and adventure with our Solo Trip packages. Whether you're a seasoned solo traveler or taking your first independent trip, our curated experiences ensure safety, excitement, and opportunities to meet like-minded explorers. Enjoy flexible itineraries, handpicked accommodations, and the freedom to explore at your own pace. Step out of your comfort zone and create unforgettable memories—just for you.
          </p>
          <a href="/bookme?type=solo" style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg, var(--color-secondary) 60%, var(--color-accent) 100%)',
            color: 'var(--color-text-light)',
            fontWeight: 700,
            fontSize: '1.15rem',
            borderRadius: 8,
            padding: '14px 38px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(30,34,45,0.08)',
            letterSpacing: '1px',
            transition: 'background 0.18s',
          }}>Book a Solo Trip</a>
        </div>
      </section>

      {/* Featured Trips Section */}
      <section style={{ width: '100%', padding: '60px 0', background: 'var(--color-text-light)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2vw' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '3rem', letterSpacing: '1px', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
            Upcoming Group Trips
          </h2>

          {GroupTripInfo.map((value) => (
            <TripCard
              id={value.id}
              reverse={value.reverse}
              imageSrc={value.imagesrc}
              title={value.title}
              description={value.description}
              bulletPoints={value.bulletpoints}
              price={value.price}
              duration={value.duration}
            />))}
        </div>
      </section>
    </div>
  );
};

export default Trips; 