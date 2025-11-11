import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(404).send((err as Error).message);
  }
};

export const getUser = (req: Request, res: Response) => {
  const email = req.query.email as string;
  const password = req.query.password as string;

  if (!email || !password) {
    return res.status(400).send('Email and password are required!');
  }

  try {
    const newUser = userService.getUser(email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    userService.createUsers(userData);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};
