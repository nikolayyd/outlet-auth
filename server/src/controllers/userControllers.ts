import { Request, Response } from 'express';
import { userService } from '../services/userService';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { sendMail } from '../utils/nodeMail';
import { renderVerifyPage } from '../utils/renderVerifyPage';
type AppError = Error & { status?: number };

const JWT_SECRET = 'supersecret';
const AGE_OF_TOKEN = 15 * 60 * 1000; // 15 minutes

export const getUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required!' });
  }

  try {
    const user = await userService.getUser(email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email, isVerified: user.isVerified },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: AGE_OF_TOKEN,
    });

    sendMail(
      user.email,
      'New Sign-In Detected',
      `Hello ${user.firstName},\n\nWe noticed a new sign-in to your account. If this was you, no further action is needed. If you did not sign in, please reset your password immediately.\n\nBest regards,\nOutlet Auth Team`
    ).catch((err) => {
      console.error('Send mail failed:', err);
    });

    return res.status(200).json({
      message: 'Logged in',
      user: { id: user.id, email: user.email, isVerified: user.isVerified },
    });
  } catch (err: unknown) {
    const e = err as AppError;

    const status = e.status ?? 401;

    const message =
      status === 401 ? 'Invalid credentials' : e.message ?? 'Error';

    return res.status(status).json({ message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  console.log(userData);
  try {
    const newUser = await userService.createUsers(userData);

    const verificationToken = jwt.sign(
      { id: newUser.id, email: newUser.email, type: 'email_verification' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const verificationUrl = `http://localhost:3000/users/verify-email?token=${verificationToken}`;
    sendMail(
      newUser.email,
      'Verify your email',
      `Click this link to verify your email: ${verificationUrl}`,
      `<a href="${verificationUrl}">Verify Email</a>`
    ).catch((err) => {
      console.error('Send mail failed:', err);
    });
    res.status(201).json({
      message: 'User created',
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  let token = req.query.token;

  if (!token) return res.status(400).send('Missing token');
  if (Array.isArray(token)) token = token[0];

  try {
    const payload = jwt.verify(token as string, JWT_SECRET!) as any;

    if (payload.type !== 'email_verification') {
      return res.status(400).send('Invalid token');
    }

    // update user in DB
    await userService.verifyUser(payload.id);

    res.status(200).send(renderVerifyPage(true, 'Your email has been verified successfully.'));
  } catch (err) {
    res.status(400).send(renderVerifyPage(false, 'Invalid or expired token'));
  }
};

export const me = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.user.isVerified) {
    return res
      .status(403)
      .json({ message: 'Please verify your email to access this resource.' });
  }

  console.log('User:', req.user);

  res.status(200).json({ user: req.user });
};

export const signOutUser = (req: AuthenticatedRequest, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
