import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface TripApplication {
  id: string;
  user: {
    fullName: string;
    email: string;
  };
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    nationality: string;
  };
  locationPrefs: {
    location1: string;
    location2: string;
    location3: string;
    suggestForMe: string;
  };
  hotelPrefs: string[];
  duration: string;
  holidayVibe: string;
  flightVisa: string[];
  packageType: string;
  holidayBudget: string;
  holidayBudgetCurrency: string;
  additionalNotes: string;
  companions: any[];
  emergencyContact: {
    fullName: string;
    phone: string;
    email: string;
  };
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt: string;
} 

interface VisaApplication {
  id: string;
  user: {
    fullName: string;
    email: string;
  };
  personalInfo: {
    fullName: string;
    gender: string;
    dob: string;
    nationality: string;
    passportNumber: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  travelInfo: {
    purpose: string;
    memberStates: string;
    arrivalDate: string;
    departureDate: string;
  };
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'resolved';
  submittedAt: string;
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [tripApplications, setTripApplications] = useState<TripApplication[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock data for visa applications and contact submissions
  const mockVisaApplications: VisaApplication[] = [
    {
      id: '1',
      user: { fullName: 'John Doe', email: 'john@example.com' },
      personalInfo: {
        fullName: 'John Doe',
        gender: 'Male',
        dob: '1990-05-15',
        nationality: 'American',
        passportNumber: 'A12345678'
      },
      contactInfo: {
        phone: '+1-555-0123',
        email: 'john@example.com',
        address: '123 Main St, New York, NY 10001'
      },
      travelInfo: {
        purpose: 'Tourism',
        memberStates: 'France, Italy',
        arrivalDate: '2024-06-15',
        departureDate: '2024-06-30'
      },
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      user: { fullName: 'Jane Smith', email: 'jane@example.com' },
      personalInfo: {
        fullName: 'Jane Smith',
        gender: 'Female',
        dob: '1985-08-22',
        nationality: 'Canadian',
        passportNumber: 'C87654321'
      },
      contactInfo: {
        phone: '+1-555-0456',
        email: 'jane@example.com',
        address: '456 Oak Ave, Toronto, ON M5V 2H1'
      },
      travelInfo: {
        purpose: 'Business',
        memberStates: 'Germany',
        arrivalDate: '2024-07-01',
        departureDate: '2024-07-10'
      },
      status: 'under_review',
      submittedAt: '2024-01-20T14:15:00Z'
    }
  ];

  const mockContactSubmissions: ContactSubmission[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your travel packages to Europe.',
      status: 'new',
      submittedAt: '2024-01-25T09:00:00Z'
    },
    {
      id: '2',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      subject: 'Booking Question',
      message: 'Do you offer group discounts for 10+ people?',
      status: 'read',
      submittedAt: '2024-01-24T16:30:00Z'
    },
    {
      id: '3',
      name: 'Carol Brown',
      email: 'carol@example.com',
      subject: 'Visa Assistance',
      message: 'I need help with Schengen visa application process.',
      status: 'replied',
      submittedAt: '2024-01-23T11:45:00Z'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        // Fetch users
        const usersRes = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData);
        }

        // Fetch trip applications (user bookings)
        const tripsRes = await fetch('/api/user-bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (tripsRes.ok) {
          const tripsData = await tripsRes.json();
          setTripApplications(tripsData);
        }

        // Use mock data for visa and contact forms
        setVisaApplications(mockVisaApplications);
        setContactSubmissions(mockContactSubmissions);

      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateStatus = async (type: string, id: string, status: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      let endpoint = '';
      switch (type) {
        case 'trip':
          endpoint = `/api/user-bookings/${id}`;
          break;
        case 'visa':
          // Mock update for visa applications
          setVisaApplications(prev => 
            prev.map(app => app.id === id ? { ...app, status: status as any } : app)
          );
          return;
        case 'contact':
          // Mock update for contact submissions
          setContactSubmissions(prev => 
            prev.map(sub => sub.id === id ? { ...sub, status: status as any } : sub)
          );
          return;
        default:
          return;
      }

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        // Refresh data
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      let endpoint = '';
      switch (type) {
        case 'user':
          endpoint = `/api/users/${id}`;
          break;
        case 'trip':
          endpoint = `/api/user-bookings/${id}`;
          break;
        case 'visa':
          // Mock delete for visa applications
          setVisaApplications(prev => prev.filter(app => app.id !== id));
          return;
        case 'contact':
          // Mock delete for contact submissions
          setContactSubmissions(prev => prev.filter(sub => sub.id !== id));
          return;
        default:
          return;
      }

      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // Refresh data
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'new':
        return '#ff9800';
      case 'reviewed':
      case 'under_review':
      case 'read':
        return '#2196f3';
      case 'approved':
      case 'replied':
        return '#4caf50';
      case 'rejected':
      case 'cancelled':
        return '#f44336';
      case 'resolved':
        return '#9c27b0';
      default:
        return '#757575';
    }
  };

  const tabStyle = {
    padding: '12px 24px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    borderBottom: '3px solid transparent',
    transition: 'all 0.3s ease',
  };

  const activeTabStyle = {
    ...tabStyle,
    color: '#1976d2',
    borderBottomColor: '#1976d2',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '20px',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const thStyle = {
    background: '#f5f5f5',
    padding: '16px 12px',
    textAlign: 'left' as const,
    fontWeight: 600,
    fontSize: '14px',
    color: '#333',
    borderBottom: '1px solid #e0e0e0',
  };

  const tdStyle = {
    padding: '16px 12px',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '14px',
    color: '#333',
  };

  const statusBadgeStyle = (status: string) => ({
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#fff',
    background: getStatusColor(status),
    display: 'inline-block',
  });

  const actionButtonStyle = {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
  };

  if (error) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2 style={{ color: '#d32f2f' }}>Admin Dashboard</h2>
      <p style={{ color: '#666' }}>{error}</p>
    </div>
  );

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Admin Dashboard</h2>
      <p>Loading...</p>
    </div>
  );

  return (
    <div style={{ padding: '40px', background: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          color: '#1976d2', 
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          background: '#fff', 
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '0'
        }}>
          <button
            style={activeTab === 'users' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('users')}
          >
            Registered Users ({users.length})
          </button>
          <button
            style={activeTab === 'trips' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('trips')}
          >
            Trip Applications ({tripApplications.length})
          </button>
          <button
            style={activeTab === 'visas' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('visas')}
          >
            Visa Applications ({visaApplications.length})
          </button>
          <button
            style={activeTab === 'contacts' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('contacts')}
          >
            Contact Submissions ({contactSubmissions.length})
          </button>
        </div>

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: '0 0 8px 8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Registered Users</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Joined</th>
                    <th style={thStyle}>Last Login</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={tdStyle}>{user.firstName} {user.lastName}</td>
                      <td style={tdStyle}>{user.email}</td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(user.role)}>{user.role}</span>
                      </td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(user.isActive ? 'active' : 'inactive')}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={tdStyle}>{formatDate(user.createdAt)}</td>
                      <td style={tdStyle}>{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</td>
                      <td style={tdStyle}>
                        <button
                          style={{ ...actionButtonStyle, background: '#f44336', color: '#fff' }}
                          onClick={() => deleteItem('user', user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Trip Applications Tab */}
          {activeTab === 'trips' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Trip Applications</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Applicant</th>
                    <th style={thStyle}>Contact</th>
                    <th style={thStyle}>Destinations</th>
                    <th style={thStyle}>Package Type</th>
                    <th style={thStyle}>Budget</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Submitted</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tripApplications.map(app => (
                    <tr key={app.id}>
                      <td style={tdStyle}>{app.personalInfo.fullName}</td>
                      <td style={tdStyle}>
                        <div>{app.personalInfo.email}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{app.personalInfo.phone}</div>
                      </td>
                      <td style={tdStyle}>
                        {app.locationPrefs.suggestForMe === 'yes' ? 'Auto-suggest' : 
                          `${app.locationPrefs.location1}, ${app.locationPrefs.location2}, ${app.locationPrefs.location3}`
                        }
                      </td>
                      <td style={tdStyle}>{app.packageType}</td>
                      <td style={tdStyle}>{app.holidayBudget} {app.holidayBudgetCurrency}</td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(app.status)}>{app.status}</span>
                      </td>
                      <td style={tdStyle}>{formatDate(app.submittedAt)}</td>
                      <td style={tdStyle}>
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus('trip', app.id, e.target.value)}
                          style={{ ...actionButtonStyle, background: '#2196f3', color: '#fff' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          style={{ ...actionButtonStyle, background: '#f44336', color: '#fff' }}
                          onClick={() => deleteItem('trip', app.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Visa Applications Tab */}
          {activeTab === 'visas' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Visa Applications</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Applicant</th>
                    <th style={thStyle}>Contact</th>
                    <th style={thStyle}>Purpose</th>
                    <th style={thStyle}>Destination</th>
                    <th style={thStyle}>Travel Dates</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Submitted</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visaApplications.map(app => (
                    <tr key={app.id}>
                      <td style={tdStyle}>{app.personalInfo.fullName}</td>
                      <td style={tdStyle}>
                        <div>{app.contactInfo.email}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{app.contactInfo.phone}</div>
                      </td>
                      <td style={tdStyle}>{app.travelInfo.purpose}</td>
                      <td style={tdStyle}>{app.travelInfo.memberStates}</td>
                      <td style={tdStyle}>
                        <div>{formatDate(app.travelInfo.arrivalDate)}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>to {formatDate(app.travelInfo.departureDate)}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(app.status)}>{app.status.replace('_', ' ')}</span>
                      </td>
                      <td style={tdStyle}>{formatDate(app.submittedAt)}</td>
                      <td style={tdStyle}>
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus('visa', app.id, e.target.value)}
                          style={{ ...actionButtonStyle, background: '#2196f3', color: '#fff' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          style={{ ...actionButtonStyle, background: '#f44336', color: '#fff' }}
                          onClick={() => deleteItem('visa', app.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contact Submissions Tab */}
          {activeTab === 'contacts' && (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Contact Form Submissions</h3>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Subject</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Submitted</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactSubmissions.map(sub => (
                    <tr key={sub.id}>
                      <td style={tdStyle}>{sub.name}</td>
                      <td style={tdStyle}>{sub.email}</td>
                      <td style={tdStyle}>{sub.subject}</td>
                      <td style={tdStyle}>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {sub.message}
                        </div>
                      </td>
                      <td style={tdStyle}>
                        <span style={statusBadgeStyle(sub.status)}>{sub.status}</span>
                      </td>
                      <td style={tdStyle}>{formatDate(sub.submittedAt)}</td>
                      <td style={tdStyle}>
                        <select
                          value={sub.status}
                          onChange={(e) => updateStatus('contact', sub.id, e.target.value)}
                          style={{ ...actionButtonStyle, background: '#2196f3', color: '#fff' }}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button
                          style={{ ...actionButtonStyle, background: '#f44336', color: '#fff' }}
                          onClick={() => deleteItem('contact', sub.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 