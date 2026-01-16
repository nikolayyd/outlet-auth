import { Router } from 'express';
import {
  createUser,
  getUser,
  me,
  signOutUser,
  verifyEmail,
} from '../controllers/userControllers';
import { authenticate } from '../middleware/authenticate';
export const userRoutes = Router();

userRoutes.get('/me', authenticate, me);
userRoutes.get('/verify-email', verifyEmail);
userRoutes.post('/sign-in', getUser);
userRoutes.get('/sign-out', signOutUser);
userRoutes.post('/sign-up', createUser);
