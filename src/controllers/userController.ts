import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUserRole(req.params.id, req.body.role);
    res.json({ message: 'User role updated', user });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user.user_id !== req.params.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    const user = await userService.updateUserProfile(req.params.id, req.body);
    res.json({ message: 'Profile updated', user });
  } catch (err: any) {
    if (err.message === 'User not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user.user_id !== req.params.id && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.params.id, currentPassword, newPassword, req.user.role === 'admin');
    res.json({ message: 'Password changed' });
  } catch (err: any) {
    if (err.message === 'User not found' || err.message === 'Incorrect password') {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
}; 