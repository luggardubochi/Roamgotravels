import React from 'react';
import '../style/About.css';
import StoryImage from './../assets/IMG-20250620-WA0048.jpg';
import StoryContentImage from "./../assets/IMG-20250625-WA0065.jpg";

const About: React.FC = () => {
  return (
    <div className="about-page" style={{ fontFamily: "'Merriweather', 'Playfair Display', 'Poppins', Arial, serif" }}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Roamgo Travels</h1>
          <p>Creating unforgettable travel experiences since 2018</p>
        </div>
      </section>

      {/* RoamGO Travels is a UK-based, registered travel agency offering both local and international travel services. Our team specializes in creating personalized travel experiences, including booking flights, hotels, activities, and airport transfers.

We also offer: 

group tours, where one of our team members will accompany you as a tour guide to ensure

a seamless and enjoyable experience



RoamGo is all about encouraging everyone to adventure more by breaking barriers and making travel exciting and accessible with our bucket list experiences!



To me travel is an essential pillar to living a life filled with purpose and meaning. It enables you to venture beyond your small pocket of the world and find beauty in the unknown. We help travelers each year plan stress-free getaways, from our group travel meet-ups to our private experiences!



Whether you are a seasoned traveler or you finally mustered up the courage to take that first step, the experiences and travel packages we curate are all about building lasting friendships beyond your existing circle of friends, opening up to new cultures and supporting the local communities in the destinations we visit. */}
      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                RoamGo Travels is a UK-based, registered travel agency offering both local and international travel services. Our team specializes in creating personilized travel experiences, including booking flights, hotels, activities and airport transfers.
              </p>
              <p> RoamGO see travel as an essential pillar to living a life filled with purpose and meaning. It enables you to venture beyond your small pocket of the world and find beauty in the unknown. We help travelers each year plan stress-free getaways, from our group travels meetups to our private experiences!.
              </p><p>
                Does not matter which category you fall under, either you are a seasoned traveler or a total beginner, the experience and travel package we curate are all about building lasting friendship beyond your existing circle of friends, opening up to new cultures and supporting the local communities in the destinations as we visit.
              </p>
              <p>
                Today, we've helped over 50,000 travelers explore more than 100 destinations across 6 continents. From solo adventurers to
                family vacations, from romantic getaways to group expeditions, we've crafted experiences that go beyond the ordinary.
              </p>
            </div>
            <div className="story-image">
              <img src={StoryImage} alt="Our team exploring the world" />
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


      {/* Founder Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet The Founder</h2>
          <div className="container">
            <div className="story-content">
              <div className="story-image">
                <img src={StoryContentImage} alt="Our team exploring the world" />
              </div>
              <div className="story-text">
                <p>
                  I'm Sheba Monday, Founder and CEO of RoamGo Travels where we believe the world is meant to be explored with heart, joy and intentions.
                </p>
                <p>
                  Travel has always been more than just destinations to me. It's about the connections, the laughter, the unforgetable experiences and the beautiful souls we meet along the way. Thah's what inspired me to create RoamGo Travels! A space where women (and men too) can explore the world confidently, safely and stylishly where solo or in a vibrant group.
                </p>
                <p>
                  At RoamGo, every client is a famil. I take greeat pride in personally curating every trip with  care and attention to details from carefuly selected destinations and boutique hotels, to visasupport and unique cultural experiences. Whetheryou're chasing your first solo trip, planning a luxury escape or joining one of out signature group tours, I want to feel seen, heared and xared for
                </p>
                <p>Over the years, RoamFo travels has grown into a warm, trusted travel famil where real friendship are born, laughter flows wasily and memories are ceated that last a lifetime.</p>
                <p>I am deeply grateful for every sing person who trusts me with their holiday dreams. Your intentional support means everything and i'm committed to making sure every trip feels special seamless and empowering</p>
                <p>Let's roam the world together. </p>
              </div>
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