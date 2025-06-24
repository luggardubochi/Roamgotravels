import { Router, Request, Response } from 'express';
import authController from '../controllers/authController';
import { authenticateJWT, AuthRequest, requireRole } from '../middlewares/authMiddleware';
import { AppDataSource } from '../config/database';
import { User } from '../models/user';
import * as userService from '../services/userService';
import { signupSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '../models/user';
import { validate } from '../middlewares/validate';
import * as userController from '../controllers/userController';
import { sensitiveLimiter } from '../middlewares/rateLimit';
import * as bookingController from '../controllers/bookingController';
import * as userBooking from '../controllers/userBookingController';

const router = Router();

const booking_router = Router();
// @ts-ignore
booking_router.get('/bookings', bookingController.getBooking);
booking_router.post('/bookings', authenticateJWT, requireRole("admin"), bookingController.addBooking);
booking_router.patch('/bookings/:id', authenticateJWT, requireRole("admin"), bookingController.editBooking);
// @ts-ignore
booking_router.delete('/bookings/:id', authenticateJWT, requireRole("admin"), bookingController.removeBooking);

router.use("", booking_router);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API!' });
});

router.post('/signup', sensitiveLimiter, validate(signupSchema), authController.signup);
router.post('/login', sensitiveLimiter, validate(loginSchema), authController.login);

router.get('/profile', authenticateJWT, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

router.get('/admin', authenticateJWT, requireRole('admin'), (req: AuthRequest, res) => {
  res.json({ message: 'Welcome, admin user!', user: req.user });
});

router.get('/users', authenticateJWT, requireRole('admin'), userController.getAllUsers);
router.patch('/users/:id/role', authenticateJWT, requireRole('admin'), userController.updateUserRole);
router.delete('/users/:id', authenticateJWT, requireRole('admin'), userController.deleteUser);
router.patch('/users/:id', authenticateJWT, validate(updateProfileSchema), userController.updateUserProfile);
router.patch('/users/:id/password', authenticateJWT, validate(changePasswordSchema), userController.changePassword);


// @ts-ignore
router.post('/user-bookings', authenticateJWT, userBooking.createUserBooking);
// @ts-ignore
router.get('/user-bookings', authenticateJWT, userBooking.getUserBooking);
// @ts-ignore
router.get('/user-bookings/:id', authenticateJWT, userBooking.getSingleUserBooking);
// @ts-ignore
router.put('/user-bookings/:id', authenticateJWT, userBooking.editUserBooking);
// @ts-ignore
router.post('/user-bookings/:id/cancel', authenticateJWT, userBooking.cancelUserBooking);

// Booking bullet point endpoints (admin only)
// @ts-ignore
router.patch('/bookings/bullet/edit', authenticateJWT, requireRole('admin'), bookingController.editBulletPoint);
// @ts-ignore
router.delete('/bookings/bullet/remove', authenticateJWT, requireRole('admin'), bookingController.removeBulletPoint);
// @ts-ignore
router.post('/bookings/bullet/add', authenticateJWT, requireRole('admin'), bookingController.addBulletPoint);
// @ts-ignore
router.get('/bookings/bullet/:id', authenticateJWT, requireRole('admin'), bookingController.getSingleBullet);

export default router; 