import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BACKEND_API } from '../components/config';

const bgImage = "src/assets/cards/IMG-20250620-WA0046.jpg";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search.includes('redirected=true')) {
      setMessage('Please log in to access the profile page.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    console.log(BACKEND_API);
    try {
      const res = await fetch(`${BACKEND_API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok && data.token) {
        setMessage('Login successful! Redirecting...');
        localStorage.setItem('token', data.token);
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(34,34,34,0.55), rgba(34,34,34,0.55)), url(${bgImage}) center/cover no-repeat`,
        transition: 'background 0.3s',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 4px 32px rgba(255,112,67,0.10)',
          padding: '2.5rem 2.2rem',
          minWidth: 340,
          maxWidth: 380,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'Poppins, Inter, Arial, sans-serif',
        }}
      >
        <h2 style={{ color: '#ff7043', fontWeight: 900, fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>Log In</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.9rem 1rem',
            marginBottom: '1.1rem',
            borderRadius: 8,
            border: '1.5px solid #ff7043',
            fontSize: '1.05rem',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.9rem 1rem',
            marginBottom: '1.1rem',
            borderRadius: 8,
            border: '1.5px solid #ff7043',
            fontSize: '1.05rem',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: '#ff7043',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1.2rem',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {error && <div style={{ color: '#d32f2f', marginBottom: '0.7rem', fontWeight: 600 }}>{error}</div>}
        {message && <div style={{ color: '#388e3c', marginBottom: '0.7rem', fontWeight: 600 }}>{message}</div>}
        <div style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#ff7043', fontWeight: 700, textDecoration: 'underline' }}>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 