import { z } from 'zod';
import '../styles/Form.css';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '../schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
export interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

type SignUpData = z.infer<typeof SignUpSchema>;

interface FormProps {
  signingUp: boolean;
}

export const Form = ({ signingUp }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpData) => {
    console.log('[Log] Form submitted!');
    console.log(data);
  };

  return (
    <div>
      <div className="form-page">
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-form">
            <h1 className="auth-title">Form component</h1>
            <input
              className="input-form"
              placeholder="Enter first name.."
              {...register('firstName')}
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <input
              className="input-form"
              placeholder="Enter last name.."
              {...register('lastName')}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <input
              className="input-form"
              placeholder="Enter email.."
              {...register('email')}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
              type="password"
              className="input-form"
              placeholder="Enter password.."
              {...register('password')}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input
              type="password"
              className="input-form"
              placeholder="Confirm password.."
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <button className="submit-btn">
              {signingUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
