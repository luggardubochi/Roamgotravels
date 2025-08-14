import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import path from 'path';
// @ts-ignore
import { cloudinary } from '../config/cloudinary';
// @ts-ignore
import multer from 'multer';
// @ts-ignore
import streamifier from 'streamifier';

export const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: 'Validation error', details: error.details });
    return;
  }
  next();
};


export const upload = multer({
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

export async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'roamgotravels/visa', type: "private" }, (err: any, result: any) => {
      if (err || !result) return reject(err);
      resolve(result.secure_url);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
}
