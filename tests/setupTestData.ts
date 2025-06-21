import request from 'supertest';
import app from '../src/index';

export let adminToken: string;
export let userToken: string;
export let userId: string;
export let tripId: string;
export let userBookingId: string;

beforeAll(async () => {
  // Create admin user
  const adminEmail = `admin${Date.now()}@test.com`;
  const adminUsername = `admin${Date.now()}`;
  await request(app)
    .post('/signup')
    .send({
      email: adminEmail,
      username: adminUsername,
      password: 'AdminPass123!',
      first_name: 'Admin',
      last_name: 'User',
      phone_number: '1234567890',
    });
  // Login as admin
  const adminLogin = await request(app)
    .post('/login')
    .send({ email: adminEmail, password: 'AdminPass123!' });
  adminToken = adminLogin.body.token;

  // Create regular user
  const userEmail = `user${Date.now()}@test.com`;
  const userUsername = `user${Date.now()}`;
  const userSignup = await request(app)
    .post('/signup')
    .send({
      email: userEmail,
      username: userUsername,
      password: 'UserPass123!',
      first_name: 'Test',
      last_name: 'User',
      phone_number: '1234567890',
    });
  userId = userSignup.body.user_id || userSignup.body.id;
  const userLogin = await request(app)
    .post('/login')
    .send({ email: userEmail, password: 'UserPass123!' });
  userToken = userLogin.body.token;

  // Create a trip/booking as admin
  const tripRes = await request(app)
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
  tripId = tripRes.body.booking.id;

  // Create a user booking as the test user
  const userBookingRes = await request(app)
    .post('/user-bookings')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      trip: tripId,
      startDate: '2024-07-01',
      endDate: '2024-07-10',
      travelers: 2,
      notes: 'Test user booking',
    });
  userBookingId = userBookingRes.body.userBooking.id;
});

// Cleanup test data after all tests
afterAll(async () => {
  // Delete user booking first
  if (userBookingId) {
    await request(app)
      .delete(`/user-bookings/${userBookingId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  }
  // Then delete trip
  if (tripId) {
    await request(app)
      .delete(`/bookings/${tripId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  }
  // Then delete user
  if (userId) {
    await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  }
}); 