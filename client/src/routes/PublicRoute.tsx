import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PublicRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error('AuthContext is not provided');

  if (auth.loading) return null;

  return auth.isAuth ? null : <Outlet />;
};