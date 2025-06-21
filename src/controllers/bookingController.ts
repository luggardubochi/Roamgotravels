import { Request, Response, Router, NextFunction } from 'express';
import { Booking, bookingSchema, BookingBulletPoint } from '../models/booking';
import { createBooking, deleteBooking, updateBooking, getAllBookings } from '../services/bookingService';
import { User } from '../models/user';
// @ts-ignore
import { v2 as cloudinary } from 'cloudinary';
// @ts-ignore
import multer from 'multer';
// @ts-ignore
import streamifier from 'streamifier';
import path from 'path';


interface AuthRequest extends Request {
  user?: { role: string;[key: string]: any };
  file?: any;
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req: Request, file: any, cb: any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Public: Get all bookings, with optional bookingType filter
export const getBooking = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bookingType } = req.query;
    const bookings = await getAllBookings(typeof bookingType === 'string' ? bookingType : undefined);
    return res.json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// Middleware to check admin
function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Admins only' });
    return;
  }
  next();
}

// Helper to upload image buffer to Cloudinary
async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'roamgotravels/bookings' }, (err: any, result: any) => {
      if (err || !result) return reject(err);
      resolve(result.secure_url);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// Add Booking (Admin only)
export const addBooking = [
  requireAdmin,
  upload.single('image'),
  async (req: AuthRequest, res: Response) => {
    let imageUrl = req.body.image;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (err) {
        return res.status(500).json({ message: 'Image upload failed' });
      }
    }
    const bookingData = { ...req.body, image: imageUrl };
    const { error, value } = bookingSchema.validate(bookingData);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
      const booking = await createBooking(value);
      return res.status(201).json({ booking });
    } catch (err) {
      return res.status(500).json({ message: 'Failed to create booking' });
    }
  }
];

// Edit Booking (Admin only)
export const editBooking = [
  requireAdmin,
  upload.single('image'),
  async (req: AuthRequest, res: Response) => {
    let imageUrl = req.body.image;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (err) {
        return res.status(500).json({ message: 'Image upload failed' });
      }
    }
    const bookingData = { ...req.body, image: imageUrl };
    const { error, value } = bookingSchema.validate(bookingData);
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
      const booking = await updateBooking(req.params.id, value);
      return res.json({ booking });
    } catch (err) {
      if ((err as Error).message === 'Booking not found') {
        return res.status(404).json({ message: 'Booking not found' });
      }
      return res.status(500).json({ message: 'Failed to update booking' });
    }
  }
];

// Delete Booking (Admin only)
export const removeBooking = async (req: AuthRequest, res: Response) => {
  try {
    await deleteBooking(req.params.id);
    return res.json({ message: 'Booking deleted' });
  } catch (err) {
    if ((err as Error).message === 'Booking not found') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(500).json({ message: 'Failed to delete booking' });
  }
};

