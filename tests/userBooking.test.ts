import request from 'supertest';
import app from '../src/index';
import { adminToken, userToken, tripId } from './setupTestData';

let bookingId: string;

describe('User Booking Endpoints', () => {
  it('should create a user booking', async () => {
    const res = await request(app)
      .post('/user-bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        trip: tripId,
        startDate: '2024-07-01',
        endDate: '2024-07-10',
        travelers: 2,
        notes: 'Test booking',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.userBooking).toBeDefined();
    bookingId = res.body.userBooking.id;
  });

  it('should get own bookings', async () => {
    const res = await request(app)
      .get('/user-bookings')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });

  it('should get a single booking by id', async () => {
    const res = await request(app)
      .get(`/user-bookings/${bookingId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.booking).toBeDefined();
  });

  it('should update a booking', async () => {
    const res = await request(app)
      .put(`/user-bookings/${bookingId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ notes: 'Updated notes' });
    expect(res.statusCode).toBe(200);
    expect(res.body.booking.notes).toBe('Updated notes');
  });

  it('should cancel a booking', async () => {
    const res = await request(app)
      .post(`/user-bookings/${bookingId}/cancel`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.booking.status).toBe('cancelled');
  });
}); 