import { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }
    const res = await fetch('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    } else {
      setError('Unauthorized or forbidden.');
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const promoteToAdmin = async (userId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`/api/users/${userId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: 'admin' }),
    });
    if (res.ok) {
      setMessage('User promoted to admin.');
      fetchUsers();
    } else {
      setMessage('Failed to promote user.');
    }
  };

  const deleteUser = async (userId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setMessage('User deleted.');
      fetchUsers();
    } else {
      setMessage('Failed to delete user.');
    }
  };

  const currentUserId = (() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return '';
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id;
    } catch {
      return '';
    }
  })();

  if (error) return <div><h2>Users</h2><p>{error}</p></div>;
  return (
    <div>
      <h2>All Users</h2>
      {message && <p>{message}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Promote</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'admin' && (
                  <button onClick={() => promoteToAdmin(user.user_id)}>Promote to Admin</button>
                )}
              </td>
              <td>
                {user.user_id !== currentUserId && (
                  <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage; 