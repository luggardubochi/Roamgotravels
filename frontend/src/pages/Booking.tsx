import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Booking.css';
import { BACKEND_API } from '../components/config';

const Booking: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [form, setForm] = useState({
    tripId: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    notes: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch available trips
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(BACKEND_API + '/api/trips', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch trips');
        const data = await res.json();
        setTrips(data.trips || []);
      } catch (err: any) {
        setError('Could not load available trips.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  // Fetch booking for edit
  useEffect(() => {
    if (bookingId) {
      setIsEdit(true);
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      fetch(BACKEND_API + `/api/bookings/${bookingId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch booking');
          return res.json();
        })
        .then(data => {
          setForm({
            tripId: data.booking.tripId?.toString() || '',
            startDate: data.booking.startDate?.slice(0, 10) || '',
            endDate: data.booking.endDate?.slice(0, 10) || '',
            travelers: data.booking.travelers || 1,
            notes: data.booking.notes || '',
          });
        })
        .catch(() => setError('Could not load booking.'))
        .finally(() => setLoading(false));
    }
  }, [bookingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const token = localStorage.getItem('token');
    const payload = {
      tripId: form.tripId,
      startDate: form.startDate,
      endDate: form.endDate,
      travelers: Number(form.travelers),
      notes: form.notes,
    };
    try {
      let res;
      if (isEdit && bookingId) {
        res = await fetch(BACKEND_API + `/api/bookings/${bookingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(BACKEND_API + '/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error('Failed to save booking');
      setMessage(isEdit ? 'Booking updated!' : 'Booking created!');
      setTimeout(() => navigate('/profile'), 1200);
    } catch (err: any) {
      setError('Could not save booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>{isEdit ? 'Edit Booking' : 'Create a Booking'}</h1>
        {error && <div className="booking-message" style={{ color: '#d32f2f' }}>{error}</div>}
        {loading ? (
          <div className="booking-loading">Loading...</div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Choose a Trip *</label>
              <select name="tripId" value={form.tripId} onChange={handleChange} required>
                <option value="">Select a trip</option>
                {trips.map(trip => (
                  <option key={trip.id} value={trip.id}>{trip.name} ({trip.location}) - ${trip.price}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>End Date *</label>
                <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Number of Travelers *</label>
              <input type="number" name="travelers" min={1} max={20} value={form.travelers} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Special requests, dietary needs, etc." />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {isEdit ? 'Update Booking' : 'Create Booking'}
            </button>
            {message && <div className="booking-message">{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking; 