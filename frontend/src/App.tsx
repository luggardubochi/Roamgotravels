import React from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AdminPage from './pages/AdminPage'
import UsersPage from './pages/UsersPage'
import Trips from './pages/Trips'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './pages/Contact'
import About from './pages/About'
import Booking from './pages/Booking'
import BookMePage from './pages/BookMePage'
import { SchengenPage } from './pages/schengenvisa'
import PastTrip from './pages/PastTrip'
import TermsAndConditions from './pages/TermsAndConditions'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    // Redirect to login with redirect param
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
        <Route path="/trip" element={<Trips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/past-trip" element={<PastTrip />} />
        {/* BookMePage routes (protected) */}
        <Route path="/bookme" element={<PrivateRoute><BookMePage /></PrivateRoute>} />
        <Route path="/bookme/:id" element={<PrivateRoute><BookMePage /></PrivateRoute>} />
        <Route path="/getvisa/:id" element={<PrivateRoute><SchengenPage /></PrivateRoute>} />
        <Route path="/bookme/type/:type" element={<PrivateRoute><BookMePage /></PrivateRoute>} />
        <Route path="/bookme/:id/type/:type" element={<PrivateRoute><BookMePage /></PrivateRoute>} />
        {/* Booking routes */}
        <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
        <Route path="/booking/:bookingId" element={<PrivateRoute><Booking /></PrivateRoute>} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
