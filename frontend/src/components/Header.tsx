import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './../assets/roamtravel_logo.png';
import './Header.css';
import { BACKEND_API } from './config';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);
  const [link, setLink] = useState<string>("/profile");
  const [name, setName] = useState<String>("Profile");

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    async function CheckAdmin() {
      try {
        if (isLoggedIn) {
          const res = await fetch(`${BACKEND_API}/api/isadmin`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
          })
          const data = await res.json();
          console.log(data);
          if (data.isAdmin) {
            setLink("/admin");
            setName("Admin");
          }
        }
      } catch (e) { }
      console.log(isLoggedIn);
    }
    CheckAdmin();
  }, [isLoggedIn])

  const handleHamburger = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <nav className={`header-nav${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
          <Link to="/trip">Trip</Link>
          <Link to="/past-trip">Past Trip</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          {isLoggedIn ? (<Link to={link}>{name}</Link>) : ''}
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