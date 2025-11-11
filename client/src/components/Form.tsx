import { z } from 'zod';
import '../styles/Form.css';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '../schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { userService } from '../services/UserService';
export interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

// type SignUpData = z.infer<typeof SignUpSchema>;
type FormDataType = z.infer<ReturnType<typeof SignUpSchema>>;

interface FormProps {
  signingUp: boolean;
}

export const Form = ({ signingUp }: FormProps) => {
  const schema = SignUpSchema(signingUp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormDataType) => {
    console.log('[Log] Form submitted!');
    console.log(data);
    if (signingUp) {
      await userService.createUser(
        data.email,
        data.firstName!,
        data.lastName!,
        data.password
      );
    } else {
      await userService.getUser(data.email, data.password);
    }
  };

  return (
    <div>
      <div className="form-page">
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-form">
            <h1 className="auth-title">Form component</h1>
            {signingUp && (
              <input
                className="input-form"
                placeholder="Enter first name.."
                {...register('firstName')}
              />
            )}
            {signingUp && errors.firstName && <p>{errors.firstName.message}</p>}
            {signingUp && (
              <input
                className="input-form"
                placeholder="Enter last name.."
                {...register('lastName')}
              />
            )}
            {signingUp && errors.lastName && <p>{errors.lastName.message}</p>}
            <input
              className="input-form"
              placeholder="Enter email.."
              {...register('email')}
            />
            {signingUp && errors.email && <p>{errors.email.message}</p>}
            <input
              type="password"
              className="input-form"
              placeholder="Enter password.."
              {...register('password')}
            />
            {signingUp && errors.password && <p>{errors.password.message}</p>}
            {signingUp && (
              <input
                type="password"
                className="input-form"
                placeholder="Confirm password.."
                {...register('confirmPassword')}
              />
            )}
            {signingUp && errors.confirmPassword && (
              <p>{errors.confirmPassword.message}</p>
            )}
            <button className="submit-btn">
              {signingUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
