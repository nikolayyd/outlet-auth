export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  createdAt?: Date;
  lastLogin?: Date;
  verifiedAt?: Date;
}

export interface CreatedUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}