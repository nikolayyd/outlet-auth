import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserJwtPayload } from '../utils/types';
const JWT_SECRET = 'supersecret';

export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  console.log('Cookies received:', req.cookies?.token);
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserJwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};