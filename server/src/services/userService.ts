import { CreatedUserInput, User } from '../models/user';
import { pool } from '../db/db';
import { mapUser } from '../utils/functions';
import bcrypt from 'bcrypt';

type AppError = Error & { status?: number };

export class UserService {
  async getAllUsers(): Promise<User[]> {
    const res = await pool.query(`SELECT * FROM auth.users`);
    return res.rows.map(mapUser);
  }
  async getUser(email: string, password: string) {
    const res = await pool.query(`SELECT * FROM auth.users WHERE email = $1`, [
      email,
    ]);

    if (res.rowCount === 0) {
      const err: AppError = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const user = res.rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const err: AppError = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    if (!user.is_verified) {
      const err: AppError = new Error('Email not verified');
      err.status = 403;
      throw err;
    }

    await pool.query(`UPDATE auth.users SET last_login = NOW() WHERE id = $1`, [
      user.id,
    ]);

    return mapUser(user);
  }
  async getUserById(id: number): Promise<User> {
    const res = await pool.query(`SELECT * FROM auth.users WHERE id = $1`, [
      id,
    ]);

    if (res.rowCount === 0) {
      throw new Error('User not found');
    }

    return mapUser(res.rows[0]);
  }

  async createUsers(input: CreatedUserInput): Promise<User> {
    const { email, firstName, lastName, password } = input;

    const passwordHash = await bcrypt.hash(password, 10);
    const res = await pool.query(
      `
    INSERT INTO auth.users (email, first_name, last_name, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [email, firstName, lastName, passwordHash]
    );

    return mapUser(res.rows[0]);
  }

  async verifyUser(id: number): Promise<void> {
    const res = await pool.query(
      `
    UPDATE auth.users
    SET is_verified = TRUE,
        verified_at = NOW()
    WHERE id = $1
    `,
      [id]
    );

    if (res.rowCount === 0) {
      throw new Error('User not found');
    }
  }
}

export const userService = new UserService();
