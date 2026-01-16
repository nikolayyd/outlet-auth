import { type UserData } from '../interfaces/userData';

const getError = async (res: Response) => {
  const errorText = await res.text();
  throw new Error(errorText);
};

class UserService {
  async getUser(email: string, password: string): Promise<UserData> {
    const res = await fetch(`http://localhost:3000/users/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw res;
    }

    const data = await res.json();
    return data;
  }
  async createUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const res = await fetch(`http://localhost:3000/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, firstName, lastName, password }),
    });
    if (!res.ok) {
      getError(res);
    }

    const data: UserData = await res.json();
    return data;
  }
  async signOut() {
    const res = await fetch('http://localhost:3000/users/sign-out', {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Sign out failed');
    return await res.json();
  }
  async checkAuth(): Promise<boolean> {
    try {
      const res = await fetch('http://localhost:3000/users/me', {
        credentials: 'include',
        cache: 'no-store',
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
export const userService = new UserService();
