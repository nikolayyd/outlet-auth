import { Request, Response } from 'express';
import { userService } from '../services/userServoce';

export const getUsers = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json(users);
};
