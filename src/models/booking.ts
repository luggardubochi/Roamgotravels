import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user';
import Joi from 'joi';

export enum BookingType {
  SINGLE = 'single',
  FAMILY = 'family',
  COUPLE = 'couple',
  GROUP = 'group',
}

export const bookingSchema = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  bookingType: Joi.string().valid(...Object.values(BookingType)).required(),
  users: Joi.array().items(Joi.string().uuid()), // array of user IDs
  bulletPoints: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    id: Joi.string().uuid().optional(),
  })).optional(),
});

export const bookingBulletPointSchema = Joi.object({
  name: Joi.string().required(),
  booking: Joi.string().uuid().optional(), // booking ID
});

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  image!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: 'date' })//, default: ()=> "CURRENT_TIMESTAMP" })
  startDate!: string;

  @Column({ type: 'date' })//,default: ()=> "CURRENT_TIMESTAMP",})
  endDate!: string;

  @Column({
    type: 'enum',
    enum: BookingType,
    default: BookingType.GROUP,
  })
  bookingType!: BookingType;

  @ManyToMany(() => User)
  @JoinTable({ name: 'booking_users' })
  users!: User[];

  @OneToMany(() => BookingBulletPoint, bullet => bullet.booking, { cascade: true })
  bulletPoints!: BookingBulletPoint[];
}

@Entity()
export class BookingBulletPoint {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Booking, booking => booking.bulletPoints, { onDelete: 'CASCADE' })
  booking!: Booking;
} 