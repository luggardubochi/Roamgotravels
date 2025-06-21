import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { Booking } from './booking';
import Joi from 'joi';

export enum UserBookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

export const userBookingSchema = Joi.object({
  user: Joi.string().uuid().required(), // user id
  trip: Joi.string().uuid().required(), // booking/trip id
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  travelers: Joi.number().integer().min(1).required(),
  notes: Joi.string().allow('').optional(),
  status: Joi.string().valid(...Object.values(UserBookingStatus)).optional(),
});

@Entity()
export class UserBooking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Booking, { eager: true, onDelete: 'CASCADE' })
  trip!: Booking;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate!: string;

  @Column('int')
  travelers!: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({
    type: 'enum',
    enum: UserBookingStatus,
    default: UserBookingStatus.PENDING,
  })
  status!: UserBookingStatus;
} 