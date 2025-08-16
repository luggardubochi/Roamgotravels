import { Router } from 'express';
import { authenticateJWT, AuthRequest, requireRole } from '../middlewares/authMiddleware';
import { signupSchema, loginSchema, updateProfileSchema, changePasswordSchema } from '../models/user';
import { upload, validate } from '../middlewares/validate';
import { MessageSchema } from '../models/message';
import { sensitiveLimiter } from '../middlewares/rateLimit';
import authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import * as bookingController from '../controllers/bookingController';
import * as userBooking from '../controllers/userBookingController';
import * as tripController from '../controllers/tripcontroller';
import * as messageController from '../controllers/messagecontroller';
import * as visaController from '../controllers/visaController';

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

// @ts-ignore
router.get('/profile', authenticateJWT, userController.getCurrentuser);
router.get('/isadmin', authenticateJWT, authController.checkingAdmin);
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

// @ts-ignore
router.get("/trip/all", authenticateJWT, requireRole('admin'), tripController.getTrips);
// @ts-ignore
router.get("/trip/user", authenticateJWT, tripController.getTripUser);
// @ts-ignore
router.post("/trip/add", authenticateJWT, tripController.addTrip);
// @ts-ignore
router.patch("/trip/update", authenticateJWT, requireRole('admin'), tripController.updateTripStatus);

// @ts-ignore
router.post("/contact/add", validate(MessageSchema), messageController.createMessage);
// @ts-ignore
router.get("/contact/all", authenticateJWT, requireRole("admin"), messageController.getallMessages);
// @ts-ignore
router.patch("/contact/update", authenticateJWT, requireRole("admin"), messageController.updateMessage);


// @ts-ignore
// Visa Application Section
router.post("/visa/create", authenticateJWT, upload.single("passport"), visaController.createVisa);
router.get("/visa/admin", authenticateJWT, requireRole("admin"), visaController.getAllVisasAdmin);
// @ts-ignore
router.patch("/visa/update/:visaId", authenticateJWT, visaController.updateVisa);
// @ts-ignore
router.patch("/visa/status/:visaId", authenticateJWT, requireRole('admin'), visaController.updateVisaStatus);
// @ts-ignore
router.delete("/visa/delete/:visaId", authenticateJWT, visaController.deleteVisa);
// @ts-ignore
router.get("/visa/user", authenticateJWT, visaController.getVisa);
// @ts-ignore
router.get("/visa/user/:visaId", authenticateJWT, visaController.getSingleVisa);




export default router; 