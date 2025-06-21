import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleHamburger = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="src/assets/roamtravel_logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <nav className={`header-nav${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
          <Link to="/trip">Trip</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          {/* <Link to="/career">Career</Link> */}
        </nav>
        <div className="header-actions">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}
          <button className="hamburger" onClick={handleHamburger} aria-label="Menu">
            &#9776;
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 