import { Request, Response, Router, NextFunction } from 'express';
import { Booking, bookingSchema, BookingBulletPoint } from '../models/booking';
import { createBooking, deleteBooking, updateBooking, getAllBookings, getSingleBooking, createBulletPoint, editBulletPoint as editBulletPointService, deleteSingleBullet, getSingleBullet as getSingleBulletService } from '../services/bookingService';
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

interface BulletInterface extends Response {
  bullets: Array<BookingBulletPoint>
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
    let booking = (await getSingleBooking(req.body.id)) as Booking;
    if (booking.id) {
      // @ts-ignore
      delete booking.id;
    }
    const bookingData = { ...booking, ...req.body };
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

// Edit Booking Bullet Points

export const editBookingBullet = [requireAdmin, async (req: AuthRequest, res: Response) => {
  if (!(req.body.id && req.body.bulletid)) {
    return res.status(400).json({ message: "invalid request. Absence of bookingid or bulletid" });
  }
  let response = { "name": req }
}]

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


export const addBulletPoint = async (req: AuthRequest, res: Response) => {
  try {
    createBulletPoint(req.params.id, new Array(...req.body.bullets))
  } catch (err) {
    if ((err as Error).message === 'Booking not found') {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(500).json({ message: 'Failed to delete booking' });
  }
}

export const editBulletPoint = async (req: AuthRequest, res: Response) => {
  const { bulletId, name } = req.body;
  if (!bulletId || !name) {
    return res.status(400).json({ message: 'bulletId and name are required' });
  }
  try {
    await editBulletPointService(bulletId, name);
    return res.json({ message: 'Bullet point updated successfully' });
  } catch (err) {
    if ((err as Error).message === 'Bullet not found') {
      return res.status(404).json({ message: 'Bullet not found' });
    }
    return res.status(500).json({ message: 'Failed to update bullet point' });
  }
};

export const removeBulletPoint = async (req: AuthRequest, res: Response) => {
  const { bulletId } = req.body;
  if (!bulletId) {
    return res.status(400).json({ message: 'bulletId is required' });
  }
  try {
    await deleteSingleBullet(bulletId);
    return res.json({ message: 'Bullet point deleted successfully' });
  } catch (err) {
    if ((err as Error).message === 'Bullet not found') {
      return res.status(404).json({ message: 'Bullet not found' });
    }
    return res.status(500).json({ message: 'Failed to delete bullet point' });
  }
};

export const getSingleBullet = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Bullet point ID is required' });
  }
  try {
    const bullet = await getSingleBulletService(id);
    return res.json({ bullet });
  } catch (err) {
    if ((err as Error).message === 'Bullet not found') {
      return res.status(404).json({ message: 'Bullet not found' });
    }
    return res.status(500).json({ message: 'Failed to fetch bullet point' });
  }
};