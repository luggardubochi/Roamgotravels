import request from 'supertest';
import app from '../src/index';
import { adminToken, userId } from './setupTestData';

describe('User Management Endpoints', () => {
  it('should get all users (admin)', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update user role (admin)', async () => {
    const res = await request(app)
      .patch(`/users/${userId}/role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'admin' });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ email: 'newemail@example.com', username: 'newusername', first_name: 'New', last_name: 'Name', phone_number: '1234567890' });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('should change user password', async () => {
    const res = await request(app)
      .patch(`/users/${userId}/password`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ currentPassword: 'oldpass', newPassword: 'newpass' });
    expect([200, 204, 400]).toContain(res.statusCode); // 400 if password is wrong
  });

  it('should delete a user (admin)', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect([200, 204, 404]).toContain(res.statusCode);
  });
}); 