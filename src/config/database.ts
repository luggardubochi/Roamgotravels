import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { UserBooking } from '../models/userBooking';
import { Booking, BookingBulletPoint } from '../models/booking';
import dotenv from 'dotenv';
import { EmergencyContact, LocationPref, TripApplicationdb, TripPersonalInfo, TripUser } from '../models/tripapplication';
import { ContactInformation, PersonalInfo, TravelInfo, VisaApplicationdb } from '../models/visaapplication';

dotenv.config();

const dbType = (process.env.DB_TYPE || 'mysql') as 'mysql' | 'sqlite';

let dataSourceOptions: any;

if (dbType === 'sqlite') {
  dataSourceOptions = {
    type: 'sqlite',
    database: process.env.SQLITE_DB_PATH || 'database.sqlite',
    entities: [User, UserBooking, Booking, BookingBulletPoint, TripApplicationdb, EmergencyContact, LocationPref, TripUser, TripPersonalInfo, VisaApplicationdb, PersonalInfo, ContactInformation, TravelInfo],
    synchronize: true, // Set to false in production
  };
} else {
  dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    entities: [User, UserBooking, Booking, BookingBulletPoint, TripApplicationdb, EmergencyContact, LocationPref, TripUser, TripPersonalInfo, VisaApplicationdb, PersonalInfo, ContactInformation, TravelInfo],
    synchronize: true, // Set to false in production
  };
}

export const AppDataSource = new DataSource(dataSourceOptions); 