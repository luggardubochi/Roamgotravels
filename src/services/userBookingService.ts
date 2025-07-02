import { AppDataSource } from '../config/database';
import { UserBooking, userBookingSchema, UserBookingStatus } from '../models/userBooking';
import { Booking } from '../models/booking';
import { User } from '../models/user';

const userBookingRepo = () => AppDataSource.getRepository(UserBooking);
const bookingRepo = () => AppDataSource.getRepository(Booking);
const userRepo = () => AppDataSource.getRepository(User);

export async function createUserBooking(data: any) {
  const { error, value } = userBookingSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
  const user = await userRepo().findOne({ where: { user_id: value.user } });
  const trip = await bookingRepo().findOne({ where: { id: value.trip } });
  if (!user || !trip) throw new Error('User or trip not found');
  const userBooking = userBookingRepo().create({ ...value, user, trip });
  return userBookingRepo().save(userBooking);
}

export async function getUserBookings(user: { user_id: string; role: string }) {
  if (user.role === 'admin') {
    return userBookingRepo().find({ relations: ['user', 'trip'] });
  } else {
    return userBookingRepo().find({ where: { user: { user_id: user.user_id } }, relations: ['user', 'trip'] });
  }
}

export async function getUserBookingById(id: string, user: { user_id: string; role: string }) {
  const booking = await userBookingRepo().findOne({ where: { id }, relations: ['user', 'trip'] });
  if (!booking) throw new Error('User booking not found');
  if (user.role !== 'admin' && booking.user.user_id !== user.user_id) {
    throw new Error('Forbidden');
  }
  return booking;
}

export async function updateUserBooking(id: string, data: any, user: { user_id: string; role: string }) {
  const booking = await userBookingRepo().findOne({ where: { id }, relations: ['user', 'trip'] });
  if (!booking) throw new Error('User booking not found');
  if (user.role !== 'admin' && booking.user.user_id !== user.user_id) {
    throw new Error('Forbidden');
  }
  const updatableFields = ['startDate', 'endDate', 'travelers', 'notes', 'status'];
  for (const key of updatableFields) {
    if (data[key] !== undefined) {
      (booking as any)[key] = data[key];
    }
  }
  return userBookingRepo().save(booking);
}

export async function cancelUserBooking(id: string, user: { user_id: string; role: string }) {
  const booking = await userBookingRepo().findOne({ where: { id }, relations: ['user', 'trip'] });
  if (!booking) throw new Error('User booking not found');
  if (user.role !== 'admin' && booking.user.user_id !== user.user_id) {
    throw new Error('Forbidden');
  }
  booking.status = UserBookingStatus.CANCELLED;
  return userBookingRepo().save(booking);
} 