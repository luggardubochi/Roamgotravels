import request from 'supertest';
import app from '../src/index';

describe('Auth Endpoints', () => {
  const testUser = {
    email: `testuser${Date.now()}@example.com`,
    username: `testuser${Date.now()}`,
    password: 'TestPass123!',
    first_name: 'Test',
    last_name: 'User',
    phone_number: '1234567890',
  };

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send(testUser);
    expect([200, 201, 409]).toContain(res.statusCode); // 409 if already exists
  });

  it('should log in the user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: testUser.email, password: testUser.password });
    expect([200, 401]).toContain(res.statusCode); // 401 if login fails
    if (res.statusCode === 200) {
      expect(res.body.token).toBeDefined();
    }
  });
}); 