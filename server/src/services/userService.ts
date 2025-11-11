import { User } from '../models/user';

export class UserService {
  private users: User[] = [
    {
      id: 1,
      email: 'ivan@test.bg',
      firstName: 'Ivan',
      lastName: 'Petrov',
      password: '12345678',
    },
    {
      id: 2,
      email: 'ivan@test.bg',
      firstName: 'Sofia',
      lastName: 'Ionova',
      password: '12345678',
    },
    {
      id: 3,
      email: 'ivan@test.bg',
      firstName: 'Peter',
      lastName: 'Petrov',
      password: '12345678',
    },
    {
      id: 4,
      email: 'ivan@test.bg',
      firstName: 'Maria',
      lastName: 'Petrova',
      password: '12345678',
    },
  ];

  async getAllUsers(): Promise<User[]> {
    return await this.users;
  }

  getUser(email: string, password: string): User {
    const foundUser = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!foundUser) {
      throw new Error('Cannot find user!');
    }

    return foundUser;
  }

  createUsers(data: User): User {
    const newUser: User = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    this.users.push(newUser);
    return {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  }
}

// create userService logic for getting some user

export const userService = new UserService();
