import React from 'react';
import { TbBrandFacebook, TbBrandInstagram, TbBrandX } from "react-icons/tb";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
  <footer style={{
    width: '100%',
    position: 'sticky',
    left: 0,
    bottom: 0,
    zIndex: 100,
    color: '#fff',
    padding: '2.5rem 0 1.2rem 0',
    textAlign: 'center',
    fontFamily: 'Poppins, Inter, Arial, sans-serif',
    borderTop: '3px solid #ff7043',
    background: 'linear-gradient(90deg, #ff7043 100%, #fff3e0 2000%)'
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.3rem', letterSpacing: '1px', color: '#fff' }}>Roamgo Travels</div>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '1.05rem' }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Home</a>
        <a href="/trip" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Trip</a>
        <a href="/past-trip" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Past Trip</a>
        <a href="/about" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>About Us</a>
        <a href="/contact" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Contact</a>
        <a href="/terms" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Terms & Conditions</a>
        {/* <a href="/career" style={{ color: '#fff', textDecoration: 'none', opacity: 0.95, fontWeight: 600 }}>Career</a> */}
      </div>
      <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', margin: '0.5rem 0' }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', opacity: 0.8 }} aria-label="Facebook"><TbBrandFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', opacity: 0.8 }} aria-label="Instagram"><TbBrandInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.5rem', opacity: 0.8 }} aria-label="Twitter"><TbBrandX /></a>
      </div>
      <div style={{ fontSize: '0.98rem', opacity: 0.7, color: '#fff' }}>
        &copy; {currentYear} Roamgo Travels. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 