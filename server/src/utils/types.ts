import { JwtPayload } from 'jsonwebtoken';

export interface UserJwtPayload extends JwtPayload {
  id: number;
  email: string;
  isVerified: boolean;
}
