import Carousel from '../components/Carousel';
import Card from '../components/Card';
import ImageVacation1 from './../assets/IMG-20250715-WA0102.jpg';
import ImageVacation2 from './../assets/cards/IMG-20250620-WA0050.jpg';
import ImageVacation3 from './../assets/IMG-20250715-WA0098.jpg';

const vacationPackages = [
  {
    imageSrc: ImageVacation1,
    title: "Single's Trip",
    details: 'Perfect for solo travelers seeking adventure and self-discovery. Enjoy curated experiences, meet new friends, and explore at your own pace.'
  },
  {
    imageSrc: ImageVacation2,
    title: 'Couples Trip',
    details: 'Romantic getaways for two. Enjoy private dinners, couples activities, and beautiful destinations designed for unforgettable memories.'
  },
  {
    imageSrc: ImageVacation3,
    title: 'Group Trips',
    details: 'Travel with friends, family, or colleagues. Group discounts, guided tours, and fun activities for everyone to enjoy together.'
  },
];

const Home = () => (
  <div style={{ fontFamily: "'Montserrat', 'Poppins', Arial, sans-serif" }}>
    <Carousel />
    <section style={{ width: '100vw', margin: '40px 0', padding: '0', background: '#fff' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.8rem',
        fontWeight: 900,
        color: '#1a237e',
        letterSpacing: '5px',
        // textShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontFamily: "PP Eiko Heavy",
        fontStyle: "italic",
      }}>
        Vacation Packages
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        {vacationPackages.map((pkg, idx) => (
          <Card key={idx} imageSrc={pkg.imageSrc} title={pkg.title} details={pkg.details} />
        ))}
      </div>
    </section>
    <section style={{ width: '100vw', background: '#f7f9fc', padding: '60px 0', margin: 0, fontFamily: 'Poppins, Inter, Arial, sans-serif' }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.6rem',
        fontWeight: 900,
        color: '#1a237e',
        marginBottom: '2.5rem',
        textTransform: 'uppercase',
        textShadow: '0 2px 8px rgba(0,0,0,0.08)',
        letterSpacing: '5px',
        // textShadow: '0 2px 8px rgba(0,0,0,0.08)',
        fontFamily: "PP Eiko Heavy",
        fontStyle: "italic",
      }}>
        How to Book a Session
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {[{
          emoji: '🧭',
          title: 'Select the trip of your choice!',
          desc: 'All trips have different inclusions and each trip has its own vibe.'
        }, {
          emoji: '💳',
          title: 'Pay your deposit',
          desc: 'Once you are ready to confirm your spot on the trip of your choice, pay your deposit! After your deposit has been made you will be able to manage your payment plan in our Roamgo travel portal.'
        }, {
          emoji: '✈️',
          title: 'Book your flight',
          desc: 'We do provide assistance with finding the right flight for your trip. You can coordinate flights with other travelers from your area.'
        }, {
          emoji: '🗺️',
          title: 'Leave the rest of the planning to us!',
          desc: 'We have the benefit of having a local team based in the destinations we curate experiences in. We will provide you with monthly updates regarding your upcoming trip and ensure you stay on track with any open items such as visas, flights etc'
        }].map((step, idx) => (
          <div
            key={idx}
            style={{
              flex: '1 1 240px',
              minWidth: 240,
              maxWidth: 340,
              background: '#fff',
              borderRadius: 22,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              padding: '2.5rem 1.7rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              border: '2px solid #e3e9f7',
              transition: 'box-shadow 0.2s, border 0.2s',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 18, lineHeight: 1 }}>{step.emoji}</div>
            <div style={{
              fontWeight: 800, fontSize: '1.35rem', marginBottom: 12, color: '#1a237e', letterSpacing: '0.5px', lineHeight: 1.2,
              // textShadow: '0 2px 8px rgba(0,0,0,0.08)',
              fontFamily: "PP Eiko Medium",
              fontStyle: "italic",
            }}>
              {step.title}
            </div>
            <div style={{
              color: '#444', fontSize: '1.13rem', fontWeight: 500, lineHeight: 1.5, marginBottom: 0,

              letterSpacing: '1px',
              textShadow: '0px 1px 0px',
              fontFamily: "PP Eiko thin",
              fontStyle: "italic",
            }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);
export default Home; 