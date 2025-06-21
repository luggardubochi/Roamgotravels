import { AppDataSource } from '../config/database';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);
  return userRepo.find();
};

export const updateUserRole = async (user_id: string, role: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ user_id });
  if (!user) throw new Error('User not found');
  user.role = role;
  await userRepo.save(user);
  return user;
};

export const deleteUser = async (user_id: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ user_id });
  if (!user) throw new Error('User not found');
  await userRepo.remove(user);
};

export const updateUserProfile = async (
  user_id: string,
  fields: { email: string; username: string; first_name: string; last_name: string; phone_number: string }
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ user_id });
  if (!user) throw new Error('User not found');
  user.email = fields.email;
  user.username = fields.username;
  user.first_name = fields.first_name;
  user.last_name = fields.last_name;
  user.phone_number = fields.phone_number;
  await userRepo.save(user);
  return user;
};

export const changePassword = async (
  user_id: string,
  currentPassword: string,
  newPassword: string,
  isAdmin: boolean
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ user_id });
  if (!user) throw new Error('User not found');
  if (!isAdmin) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error('Incorrect password');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await userRepo.save(user);
}; 