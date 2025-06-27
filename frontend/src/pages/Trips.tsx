import React from 'react';
import Card from '../components/Card';
import TripCard from '../components/TripCard';
import { GroupTripInfo } from '../components/TripInfo';

const trips = [
  {
    imageSrc: 'src/assets/cards/IMG-20250620-WA0046.jpg',
    title: "Single's Trip",
    details: 'Solo adventures for independent travelers. Discover new places and meet new friends!'
  },
  {
    imageSrc: 'src/assets/cards/IMG-20250620-WA0050.jpg',
    title: 'Couples Trip',
    details: 'Romantic getaways for two. Enjoy curated experiences and beautiful destinations.'
  },
  {
    imageSrc: 'src/assets/cards/IMG-20250620-WA0054.jpg',
    title: 'Group Trips',
    details: 'Travel with friends, family, or colleagues. Group discounts and fun activities.'
  },
];

const Trips: React.FC = () => {
  return (
    <div style={{ width: '100vw', background: '#f7f9fc', minHeight: '100vh', paddingBottom: '40px' }}>
      <section style={{ width: '100%', padding: '60px 0 30px 0', background: 'linear-gradient(90deg, #ff7043 0%, #fff3e0 100%)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 900, color: '#fff', letterSpacing: '1.5px', textShadow: '0 2px 12px rgba(0,0,0,0.12)', fontFamily: 'Poppins, Inter, Arial, sans-serif', margin: 0 }}>
          Explore Our Trips
        </h1>
        <p style={{ textAlign: 'center', color: '#fff', fontSize: '1.25rem', marginTop: '1rem', fontWeight: 500, fontFamily: 'Inter, Arial, sans-serif' }}>
          Find the perfect adventure for you, your partner, or your group.
        </p>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 2vw 0 2vw', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center' }}>
        {trips.map((trip, idx) => (
          <Card key={idx} imageSrc={trip.imageSrc} title={trip.title} details={trip.details} />
        ))}
      </div>

      {/* Featured Trips Section */}
      <section style={{ width: '100%', padding: '60px 0', background: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2vw' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.4rem', fontWeight: 800, color: '#1a237e', marginBottom: '3rem', letterSpacing: '1px', fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
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