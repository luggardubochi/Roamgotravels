import React from 'react';
import Card from '../components/Card';
import TripCard from '../components/TripCard';

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
          
          {/* Morocco Trip */}
          <TripCard
            reverse={false}
            imageSrc="src/assets/cards/IMG-20250620-WA0046.jpg"
            title="Morocco Adventure 20th - 23rd of June"
            description="Experience the magic of Morocco with our curated adventure package. Explore ancient medinas, ride camels in the Sahara, and immerse yourself in rich culture."
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "3 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Sahara desert tour",
              "Traditional Moroccan dinner"
            ]}
            price="€750"
            duration="4 Days"
          />

          {/* Albania Trip (May) */}
          <TripCard
            reverse={true}
            imageSrc="src/assets/cards/IMG-20250620-WA0050.jpg"
            title="Albania Discovery 23rd - 26th of May"
            description="Discover the hidden gem of Albania with pristine beaches, ancient ruins, and stunning mountain landscapes."
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "3 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Coastal boat tour",
              "Historical city tour"
            ]}
            price="€550"
            duration="4 Days"
          />

          {/* Thailand Trip */}
          <TripCard
            reverse={false}
            imageSrc="src/assets/cards/IMG-20250620-WA0054.jpg"
            title="Thailand Paradise 19th - 24th of September"
            description="Escape to tropical paradise with pristine beaches, vibrant culture, and unforgettable experiences in Thailand."
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "5 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Island hopping tour",
              "Thai cooking class"
            ]}
            price="€950"
            duration="6 Days"
          />

          {/* Greece Trip */}
          <TripCard
            reverse={true}
            imageSrc="src/assets/cards/IMG-20250620-WA0048.jpg"
            title="Greece Islands 10th - 13th of October"
            description="Experience the beauty of Greek islands with crystal clear waters, white-washed buildings, and Mediterranean charm."
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "3 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Island boat cruise",
              "Sunset dinner experience"
            ]}
            price="€680"
            duration="4 Days"
          />

          {/* Switzerland Trip */}
          <TripCard
            reverse={false}
            imageSrc="src/assets/cards/IMG-20250620-WA0046.jpg"
            title="Switzerland Alpine 20th - 23rd of November"
            description="Experience the majestic Swiss Alps with breathtaking mountain views, charming villages, and world-class hospitality."
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "3 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Mountain cable car ride",
              "Swiss chocolate tasting"
            ]}
            price="€850"
            duration="4 Days"
          />

          {/* Albania Trip (July) - Original */}
          <TripCard
            reverse={true}
            imageSrc="src/assets/cards/IMG-20250620-WA0048.jpg"
            title="Albania Tour 11th - 14th of July"
            description="600 euros per person"
            bulletPoints={[
              "Return flight tickets",
              "Airport transfer",
              "3 nights stay at a 4 star hotel",
              "Daily breakfast",
              "Boat cruise",
              "Paint and sip by the beach"
            ]}
            price="€600"
            duration="4 Days"
          />
        </div>
      </section>
    </div>
  );
};

export default Trips; 