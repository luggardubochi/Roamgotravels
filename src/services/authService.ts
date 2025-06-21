import { AppDataSource } from '../config/database';
import { User } from '../models/user';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepo = (): Repository<User> => AppDataSource.getRepository(User);

export const signup = async (data: {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}): Promise<{ status: number; message: string }> => {
  const repo = userRepo();
  const { email, username, password, first_name, last_name, phone_number } = data;
  if (!email || !username || !password || !first_name || !last_name || !phone_number) {
    return { status: 400, message: 'All fields are required.' };
  }
  const existing = await repo.findOne({ where: [{ email }, { username }] });
  if (existing) {
    return { status: 409, message: 'Email or username already exists.' };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = repo.create({
    user_id: uuidv4(),
    email,
    username,
    password: hashedPassword,
    first_name,
    last_name,
    phone_number,
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
    last_login: null,
    role: 'user',
  });
  await repo.save(user);
  return { status: 201, message: 'Signup successful!' };
};

export const login = async (data: { email: string; password: string }): Promise<{ status: number; message: string; token?: string }> => {
  const repo = userRepo();
  const { email, password } = data;
  const user = await repo.findOne({ where: { email } });
  if (!user) {
    return { status: 401, message: 'Invalid credentials.' };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 401, message: 'Invalid credentials.' };
  }
  user.last_login = new Date();
  await repo.save(user);
  const token = jwt.sign(
    { user_id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'changeme',
    { expiresIn: '1h' }
  );
  return { status: 200, message: 'Login successful!', token };
};

export default { signup, login }; 