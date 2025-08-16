import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const signup = async (req: Request, res: Response) => {
  const { email, username, password, first_name, last_name, phone_number } = req.body;
  const result = await authService.signup({ email, username, password, first_name, last_name, phone_number });
  res.status(result.status).json({ message: result.message });
};

export const login = async (req: Request, res: Response) => {
  console.log(`Attempting login with data: ${req.body}`);
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  if (result.token) {
    res.status(result.status).json({ message: result.message, token: result.token });
  } else {
    res.status(result.status).json({ message: result.message });
  }
};

export const checkingAdmin = async (req: AuthRequest, res: Response) => {
  if (req.user.role === "admin") {
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(200).json({ isAdmin: false });
  }
}

export default { signup, login, checkingAdmin };