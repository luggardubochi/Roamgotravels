import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Roamgo Travels</h1>
          <p>Creating unforgettable travel experiences since 2018</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2018, Roamgo Travels began with a simple mission: to make extraordinary travel experiences accessible to everyone.
                What started as a small team of passionate travelers has grown into a trusted travel partner for thousands of adventurers worldwide.
              </p>
              <p>
                Our journey began when our founders, Sarah and Michael, returned from a life-changing backpacking trip through Southeast Asia.
                They realized that the best travel experiences weren't just about seeing new places, but about connecting with people, cultures,
                and creating memories that last a lifetime.
              </p>
              <p>
                Today, we've helped over 50,000 travelers explore more than 100 destinations across 6 continents. From solo adventurers to
                family vacations, from romantic getaways to group expeditions, we've crafted experiences that go beyond the ordinary.
              </p>
            </div>
            <div className="story-image">
              <img src="/src/assets/IMG-20250620-WA0048.jpg" alt="Our team exploring the world" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Authentic Experiences</h3>
              <p>We believe in authentic travel that connects you with local cultures, traditions, and people. Every trip is designed to provide genuine experiences that go beyond tourist attractions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Personalized Service</h3>
              <p>Every traveler is unique, and so should be their journey. Our expert travel consultants work closely with you to create customized itineraries that match your interests, budget, and travel style.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainable Travel</h3>
              <p>We're committed to responsible tourism that benefits local communities and preserves the natural beauty of our destinations for future generations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Let us help you create memories that will last a lifetime</p>
          <div className="cta-buttons">
            <a href="/trip" className="cta-btn primary">Explore Our Trips</a>
            <a href="/contact" className="cta-btn secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <h2>Why Choose Roamgo Travels?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">01
                <h3>Expert Travel Planning</h3>
              </div>
              <p>Our team of certified travel experts has visited every destination we offer, ensuring you get insider knowledge and the best recommendations.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">02
                <h3>24/7 Support</h3>
              </div>
              <p>Travel with confidence knowing our support team is available around the clock to assist you with any questions or emergencies during your trip.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">03
                <h3>Best Price Guarantee</h3>
              </div>
              <p>We work directly with hotels, airlines, and local partners to ensure you get the best possible prices without compromising on quality.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">04
                <h3>Flexible Booking</h3>
              </div>
              <p>Life happens, and plans change. We offer flexible booking options and generous cancellation policies to give you peace of mind.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">05
                <h3>Local Partnerships</h3>
              </div>
              <p>We've built strong relationships with local guides, hotels, and service providers to ensure authentic and high-quality experiences.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">06
                <h3>Safety First</h3>
              </div>
              <p>Your safety is our priority. We carefully vet all our partners and provide comprehensive travel insurance options for every trip.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="team-intro">Our passionate team of travel experts is here to make your dreams come true</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/src/assets/cards/IMG-20250620-WA0046.jpg" alt="Sarah Johnson" />
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">With 15+ years in the travel industry, Sarah's passion for authentic experiences drives our company's vision and growth.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/src/assets/cards/IMG-20250620-WA0050.jpg" alt="Michael Chen" />
              </div>
              <h3>Michael Chen</h3>
              <p className="member-role">Co-Founder & COO</p>
              <p className="member-bio">Michael's expertise in operations and logistics ensures every trip runs smoothly from start to finish.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/src/assets/cards/IMG-20250620-WA0054.jpg" alt="Emma Rodriguez" />
              </div>
              <h3>Emma Rodriguez</h3>
              <p className="member-role">Head of Customer Experience</p>
              <p className="member-bio">Emma leads our customer service team, ensuring every traveler receives personalized attention and support.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/src/assets/cards/IMG-20250620-WA0048.jpg" alt="David Kim" />
              </div>
              <h3>David Kim</h3>
              <p className="member-role">Senior Travel Consultant</p>
              <p className="member-bio">David's extensive knowledge of Asian destinations makes him the go-to expert for travelers exploring the Far East.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Continents</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="awards-section">
        <div className="container">
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <h3>Best Travel Agency 2023</h3>
              <p>Travel Weekly Awards</p>
            </div>
            <div className="award-item">
              <div className="award-icon">⭐</div>
              <h3>Excellence in Customer Service</h3>
              <p>Tourism Industry Association</p>
            </div>
            <div className="award-item">
              <div className="award-icon">🌱</div>
              <h3>Sustainable Travel Partner</h3>
              <p>Green Tourism Initiative</p>
            </div>
            <div className="award-item">
              <div className="award-icon">👥</div>
              <h3>Top Employer 2023</h3>
              <p>Travel Industry Magazine</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About; 