import { User } from "../models/user";

export class UserService {
  private users: User[] = [
    { id: 1, name: 'Ivan' },
    { id: 2, name: 'Sofia' },
    { id: 2, name: 'Pepi' },
    { id: 2, name: 'Maria' },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

}


export const userService = new UserService();
