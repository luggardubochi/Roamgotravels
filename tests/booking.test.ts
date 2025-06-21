import request from 'supertest';
import app from '../src/index';
import { adminToken, tripId } from './setupTestData';

let bookingId: string;

describe('Admin Booking Endpoints', () => {
  it('should create a booking', async () => {
    const res = await request(app)
      .post('/bookings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Trip',
        image: 'https://example.com/image.jpg',
        description: 'Test trip description',
        price: 1000,
        startDate: '2024-07-01',
        endDate: '2024-07-10',
        bookingType: 'single',
        bulletPoints: [{ name: 'Test bullet' }],
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.booking).toBeDefined();
    bookingId = res.body.booking.id;
  });

  it('should get all bookings', async () => {
    const res = await request(app)
      .get('/booking');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });

  it('should update a booking', async () => {
    const res = await request(app)
      .patch(`/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 1200 });
    expect(res.statusCode).toBe(200);
    expect(res.body.booking.price).toBe(1200);
  });

  it('should delete a booking', async () => {
    const res = await request(app)
      .delete(`/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
}); 