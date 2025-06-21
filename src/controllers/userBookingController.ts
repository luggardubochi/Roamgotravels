import { Request, Response, NextFunction, Router } from 'express';
import { UserBookingStatus } from '../models/userBooking';
import * as userBookingService from '../services/userBookingService';


interface AuthRequest extends Request {
  user?: { user_id: string; role: string; [key: string]: any };
}

// POST /api/user-bookings - User books a trip
export const createUserBooking = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const userBooking = await userBookingService.createUserBooking({ ...req.body, user: req.user.user_id });
    return res.status(201).json({ userBooking });
  } catch (err: any) {
    return res.status(400).json({ message: err.message || 'Failed to create user booking' });
  }
};

// GET /api/user-bookings - List own bookings (admin: all)
export const getUserBooking = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const bookings = await userBookingService.getUserBookings(req.user);
    return res.json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch user bookings' });
  }
};

// GET /api/user-bookings/:id - View a user booking (only owner or admin)
export const getSingleUserBooking = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const booking = await userBookingService.getUserBookingById(req.params.id, req.user);
    return res.json({ booking });
  } catch (err: any) {
    if (err.message === 'Forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (err.message === 'User booking not found') return res.status(404).json({ message: err.message });
    return res.status(500).json({ message: 'Failed to fetch user booking' });
  }
};

// PUT /api/user-bookings/:id - Update a user booking (only owner or admin)
export const editUserBooking = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const updated = await userBookingService.updateUserBooking(req.params.id, req.body, req.user);
    return res.json({ booking: updated });
  } catch (err: any) {
    if (err.message === 'Forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (err.message === 'User booking not found') return res.status(404).json({ message: err.message });
    return res.status(400).json({ message: err.message || 'Failed to update user booking' });
  }
};

// POST /api/user-bookings/:id/cancel - Cancel a user booking (only owner or admin)
export const cancelUserBooking = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const cancelled = await userBookingService.cancelUserBooking(req.params.id, req.user);
    return res.json({ booking: cancelled });
  } catch (err: any) {
    if (err.message === 'Forbidden') return res.status(403).json({ message: 'Forbidden' });
    if (err.message === 'User booking not found') return res.status(404).json({ message: err.message });
    return res.status(400).json({ message: err.message || 'Failed to cancel user booking' });
  }
};
