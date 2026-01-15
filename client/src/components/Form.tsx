import { z } from 'zod';
import '../styles/Form.css';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '../schemas/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { userService } from '../services/UserService';
import { Modal } from './Modal';
import { LoadingContext } from '../context/LoadingContext';
import type { ApiError } from '../interfaces/apiError';

export interface FormData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

type FormDataType = z.infer<ReturnType<typeof SignUpSchema>>;

interface FormProps {
  signingUp: boolean;
}

export const Form = ({ signingUp }: FormProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const schema = SignUpSchema(signingUp);
  const [showVerificationReq, setShowVerificationReq] = useState(false);
  const [showVerificationSignUp, setShowVerificationSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  const { startLoading, stopLoading } = useContext(LoadingContext)!;
  const onSubmit = async (data: FormDataType) => {
    try {
      setErrorMessage('');
      startLoading();

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

      if (auth && !signingUp) {
        auth.setIsAuth(true);
        stopLoading();
        navigate('/dashboard');
        return;
      }
      stopLoading();
      setShowVerificationSignUp(true);
      return;
    } catch (err) {
      const error = err as ApiError;
      stopLoading();
      if (error.status === 403) {
        setShowVerificationReq(true);
        return;
      }

      if(signingUp) {
        setErrorMessage('An error occurred during sign up. Please try again!');
        return;
      }
      setErrorMessage('Invalid email or password. Please try again!');
    }
  };

  return (
    <div>
      <div className="form-page">
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-form">
            <h1 className="auth-title">{signingUp ? 'Sign Up' : 'Sign In'}</h1>
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

            {errorMessage && (<p className="error-message">{errorMessage}</p>)}

            {!signingUp && (
              <div className="sign-alert">
                If you don't have an account, please sign in{' '}
                <div
                  className="sign-in-link"
                  onClick={() => navigate('/sign-up')}
                >
                  here
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      {showVerificationReq && (
        <Modal
          isOpen={showVerificationReq}
          title="Verification Required"
          onClose={() => setShowVerificationReq(false)}
        >
          <p>Please verify your email before signing in.</p>
        </Modal>
      )}
      {showVerificationSignUp && (
        <Modal
          isOpen={showVerificationSignUp}
          title="Verify Your Email"
          onClose={() => {
            setShowVerificationSignUp(false);
            navigate('/');
          }}
        >
          <p>
            A verification email has been sent to your email address. Please
            verify your account before signing in.
          </p>
          <button onClick={() => navigate('/sign-in')}>Go to Sign In</button>
        </Modal>
      )}
    </div>
  );
};
