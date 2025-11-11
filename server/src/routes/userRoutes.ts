import { Router } from 'express';
import { createUser, getUser, getUsers } from '../controllers/userControllers';
export const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/get', getUser);

userRoutes.post('/create', createUser);
