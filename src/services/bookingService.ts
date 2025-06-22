import { AppDataSource } from '../config/database';
import { Booking, BookingBulletPoint, BookingType } from '../models/booking';

const bookingRepo = () => AppDataSource.getRepository(Booking);
const bulletRepo = () => AppDataSource.getRepository(BookingBulletPoint);

export async function getAllBookings(bookingType?: string): Promise<Booking[]> {
  if (bookingType) {
    return bookingRepo().find({ where: { bookingType: bookingType as BookingType }, relations: ['bulletPoints'] });
  }
  return bookingRepo().find({ relations: ['bulletPoints'] });
}


export async function createBooking(data: any) {
  const booking: Booking[] = bookingRepo().create(data);
  if (data.bulletPoints) {
    // @ts-ignore
    booking.bulletPoints = data.bulletPoints.map((bp: any) => bulletRepo().create({ name: bp.name }));
  }
  return bookingRepo().save(booking);
}

export async function updateBooking(id: string, data: any) {
  const booking = (await bookingRepo().findOne({ where: { id }, relations: ['bulletPoints'] })) as Booking | null;
  if (!booking) throw new Error('Booking not found');
  Object.assign(booking, data);
  if (data.bulletPoints) {
    await bulletRepo().delete({ booking: { id: booking.id } });
    booking.bulletPoints = data.bulletPoints.map((bp: any) => bulletRepo().create({ name: bp.name, booking }));
  }
  return bookingRepo().save(booking);
}

export async function deleteBooking(id: string) {
  const booking = (await bookingRepo().findOne({ where: { id } })) as Booking | null;
  if (!booking) throw new Error('Booking not found');
  return bookingRepo().remove(booking);
} 