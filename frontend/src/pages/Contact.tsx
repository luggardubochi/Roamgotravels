import React, { useState, type ChangeEvent } from 'react';
import '../style/Contact.css';
import { BACKEND_API } from '../components/config';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    subject: '',
    message: ''
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    // Simulate form submission
    setTimeout(async () => {
      if (isSubmitting) {
        console.log("IT");
      }
      let req = await fetch(`${BACKEND_API}/api/contact/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      let res = await req.json()
      console.log(res);
      if (req.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
          fullname: '',
          email: '',
          phone_number: '',
          subject: '',
          message: ''
        });
      }
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fc' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)',
        padding: '80px 0 60px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Get in touch with our travel experts and start planning your next adventure
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '60px 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', padding: '0 2rem' }}>

          {/* Contact Form */}
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#1a237e' }}>
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your full name"
                  name='fullname'
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your email address"
                  name='email'
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your phone number"
                  name='phone_number'
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>
                  Subject *
                </label>
                <select
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  onChange={e => handleChange(e)}
                  name='subject'
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Booking Information">Booking Information</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#333' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us about your travel plans or any questions you have..."
                  onChange={handleChange}
                  name="message"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #2196f3, #1976d2)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#1a237e' }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem' }}>
              We're here to help you plan the perfect trip. Reach out to us through any of these channels:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.01rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>📧</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Us</h3>
                  <p style={{ color: '#666' }}>info@roamgotravels.com</p>
                  <p style={{ color: '#666' }}>support@roamgotravels.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>📞</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Call Us</h3>
                  <p style={{ color: '#666' }}>+44 7407 628596</p>
                  <p style={{ color: '#666' }}>Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>📍</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Visit Us</h3>
                  <p style={{ color: '#666' }}>Brooklyn Bridge, </p>
                  <p style={{ color: '#666' }}>United Kingdom</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>💬</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Live Chat</h3>
                  <p style={{ color: '#666' }}>Available 24/7</p>
                  <p style={{ color: '#666' }}>Click the chat icon below</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 15px', background: '#1877f2', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
                  📘 Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 15px', background: '#e4405f', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
                  📸 Instagram
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ padding: '10px 15px', background: '#1da1f2', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
                  🐦 Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="container">
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I book a trip?</h3>
              <p>You can book a trip through our website, by calling us directly, or by sending us an email. Our travel experts will help you customize your perfect itinerary.</p>
            </div>
            <div className="faq-item">
              <h3>What is your cancellation policy?</h3>
              <p>We offer flexible cancellation policies. Most bookings can be cancelled up to 30 days before departure with a full refund. Please check specific trip details for exact terms.</p>
            </div>
            {/* <div className="faq-item">
              <h3>Do you offer travel insurance?</h3>
              <p>Yes, we highly recommend travel insurance for all trips. We can help you arrange comprehensive coverage that includes medical, trip cancellation, and baggage protection.</p>
            </div> */}
            <div className="faq-item">
              <h3>Can I customize my trip itinerary?</h3>
              <p>Absolutely! We specialize in creating custom itineraries. Our travel experts will work with you to design the perfect trip that matches your interests, budget, and schedule.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 