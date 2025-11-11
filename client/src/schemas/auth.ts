import { z } from 'zod';

export const SignInSchema = z.object({
  mail: z.string().email(),
  password: z.string(),
});

export const SignUpSchema = z
  .object({
    firstName: z.string().min(4, 'The name must be at least 4 symbols'),
    lastName: z.string().min(4, 'The name must be at least 4 symbols'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 symbols')
      .regex(/[A-Z]/, 'Password must have at least 1 upper case')
      .regex(/[a-z]/, 'Password must have at least 1 lower case')
      .regex(/[0-9]/, 'Password must have at least 1 digit'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ['confirmPassword'],
  });
