import { useState, useEffect } from 'react';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const res = await fetch('/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
        setUser(data.user);
      } else if (res.status === 403) {
        setError('Forbidden: You are not an admin.');
      } else {
        setError('Unauthorized. Please log in again.');
      }
    };
    fetchAdmin();
  }, []);

  if (error) return <div><h2>Admin Page</h2><p>{error}</p></div>;
  if (!user) return <div><h2>Admin Page</h2><p>Loading...</p></div>;
  return (
    <div>
      <h2>Admin Page</h2>
      <p>{message}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default AdminPage; 