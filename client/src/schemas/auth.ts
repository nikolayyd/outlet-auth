import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const SignUpSchema = (isSignUp: boolean) =>
  z
    .object({
      firstName: z
        .string()
        .min(4, 'The name must be at least 4 symbols')
        .optional(),
      lastName: z
        .string()
        .min(4, 'The name must be at least 4 symbols')
        .optional(),
      email: z.string().email('Invalid email'),
      password: z.string().min(1, 'Password is required'),
      confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (isSignUp) {
        if (!data.firstName)
          ctx.addIssue({
            code: 'custom',
            path: ['firstName'],
            message: 'First name is required',
          });
        if (!data.lastName)
          ctx.addIssue({
            code: 'custom',
            path: ['lastName'],
            message: 'Last name is required',
          });
        if (!data.confirmPassword)
          ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: 'Confirm password is required',
          });
        if (data.password !== data.confirmPassword) {
          ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: "Passwords don't match",
          });
        }
      }
    });