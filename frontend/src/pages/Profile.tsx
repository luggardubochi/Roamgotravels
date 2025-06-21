import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { BACKEND_API } from '../components/config';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const res = await fetch(BACKEND_API+'/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setForm({
          email: data.user.email,
          username: data.user.username,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          phone_number: data.user.phone_number,
        });
      } else {
        setError('Unauthorized. Please log in again.');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !user) return;
    const res = await fetch(BACKEND_API+`/api/users/${user.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Profile updated successfully!');
      setEditMode(false);
      const data = await res.json();
      setUser(data.user);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Failed to update profile.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (error) return (
    <div className="profile-error">
      <div className="error-container">
        <h2>Profile Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/login')} className="error-btn">Go to Login</button>
      </div>
    </div>
  );

  if (!user) return (
    <div className="profile-loading">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-hero">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.first_name ? user.first_name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <div className="profile-info">
            <h1>Welcome back, {user.first_name || user.username}!</h1>
            <p>Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-nav">
        <div className="nav-container">
          <button 
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span>
            Profile
          </button>
          <button 
            className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <span className="tab-icon">✈️</span>
            My Bookings
          </button>
          <button 
            className={`nav-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <span className="tab-icon">⚙️</span>
            Preferences
          </button>
          <button 
            className={`nav-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="tab-icon">🔒</span>
            Security
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        <div className="content-container">
          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="tab-content">
              <div className="profile-section">
                <h2>Personal Information</h2>
                {editMode ? (
                  <form onSubmit={handleSave} className="profile-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input 
                          name="first_name" 
                          value={form.first_name || ''} 
                          onChange={handleChange} 
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input 
                          name="last_name" 
                          value={form.last_name || ''} 
                          onChange={handleChange} 
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input 
                          name="username" 
                          value={form.username || ''} 
                          onChange={handleChange} 
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input 
                          name="email" 
                          type="email"
                          value={form.email || ''} 
                          onChange={handleChange} 
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                          name="phone_number" 
                          value={form.phone_number || ''} 
                          onChange={handleChange} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Save Changes</button>
                      <button type="button" onClick={() => setEditMode(false)} className="btn-secondary">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-details">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label>First Name</label>
                        <p>{user.first_name || 'Not provided'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Last Name</label>
                        <p>{user.last_name || 'Not provided'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Username</label>
                        <p>{user.username}</p>
                      </div>
                      <div className="detail-item">
                        <label>Email</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="detail-item">
                        <label>Phone Number</label>
                        <p>{user.phone_number || 'Not provided'}</p>
                      </div>
                      <div className="detail-item">
                        <label>Member Since</label>
                        <p>{new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button onClick={() => setEditMode(true)} className="btn-primary">Edit Profile</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="tab-content">
              <div className="bookings-section">
                <h2>My Travel Bookings</h2>
                <div className="bookings-empty">
                  <div className="empty-icon">✈️</div>
                  <h3>No bookings yet</h3>
                  <p>Start your adventure by exploring our amazing destinations!</p>
                  <button onClick={() => navigate('/trip')} className="btn-primary">Browse Trips</button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="tab-content">
              <div className="preferences-section">
                <h2>Travel Preferences</h2>
                <div className="preferences-grid">
                  <div className="preference-card">
                    <h3>Destination Preferences</h3>
                    <p>Set your preferred travel destinations and regions</p>
                    <button className="btn-secondary">Configure</button>
                  </div>
                  <div className="preference-card">
                    <h3>Travel Style</h3>
                    <p>Choose your preferred travel style and accommodation type</p>
                    <button className="btn-secondary">Configure</button>
                  </div>
                  <div className="preference-card">
                    <h3>Budget Range</h3>
                    <p>Set your preferred budget range for trips</p>
                    <button className="btn-secondary">Configure</button>
                  </div>
                  <div className="preference-card">
                    <h3>Travel Dates</h3>
                    <p>Set your preferred travel dates and availability</p>
                    <button className="btn-secondary">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="tab-content">
              <div className="security-section">
                <h2>Account Security</h2>
                <div className="security-options">
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Change Password</h3>
                      <p>Update your account password for enhanced security</p>
                    </div>
                    <button className="btn-secondary">Change Password</button>
                  </div>
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Login History</h3>
                      <p>View your recent login activity and sessions</p>
                    </div>
                    <button className="btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="profile-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile; 