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
userRoutes.post('/get', getUser);
userRoutes.get('/sign-out', signOutUser);
userRoutes.post('/create', createUser);
