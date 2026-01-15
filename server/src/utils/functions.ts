import { User } from "../models/user";

export const mapUser = (row: any): User => ({
  id: row.id,
  email: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  isVerified: row.is_verified,
  lastLogin: row.last_login,
  createdAt: row.created_at,
  verifiedAt: row.verified_at,
});
