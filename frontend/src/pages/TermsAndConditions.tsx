import React from 'react';

const TermsAndConditions: React.FC = () => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2vw', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
    <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 900, color: '#ff7043', marginBottom: '2rem' }}>Terms & Conditions</h1>
    <section style={{ marginBottom: '2rem' }}>
      <h2>1. Introduction</h2>
      <p>Welcome to Roamgo Travels. By booking a trip or using our services, you agree to the following terms and conditions. Please read them carefully.</p>
    </section>
    <section style={{ marginBottom: '2rem' }}>
      <h2>2. Booking Policy</h2>
      <p>All bookings are subject to availability. A deposit may be required to secure your reservation. Full payment is due before the start of your trip unless otherwise stated.</p>
    </section>
    <section style={{ marginBottom: '2rem' }}>
      <h2>3. Cancellation Policy</h2>
      <p>Cancellations must be made in writing. Refunds are subject to our cancellation policy, which may vary depending on the trip or service booked. Please refer to your booking confirmation for details.</p>
    </section>
    <section style={{ marginBottom: '2rem' }}>
      <h2>4. Liability</h2>
      <p>Roamgo Travels is not liable for any loss, injury, or damage to persons or property during your trip. We recommend purchasing travel insurance for your protection.</p>
    </section>
    <section style={{ marginBottom: '2rem' }}>
      <h2>5. Privacy</h2>
      <p>Your privacy is important to us. We will never share your personal information with third parties except as required to provide our services or by law.</p>
    </section>
    <section style={{ marginBottom: '2rem' }}>
      <h2>6. Contact</h2>
      <p>If you have any questions about these terms, please contact us at <a href="mailto:info@roamgotravels.com">info@roamgotravels.com</a>.</p>
    </section>
    <p style={{ textAlign: 'center', color: '#888', fontSize: '1rem', marginTop: '2rem' }}>Last updated: June 2024</p>
  </div>
);

export default TermsAndConditions; 