import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateProfileSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});



@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  phone_number!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Column({ default: true })
  is_active!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login!: Date | null;

  @Column({ default: 'user' })
  role!: string;
} 