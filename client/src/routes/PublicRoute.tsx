// PublicRoute.tsx
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PublicRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('AuthContext is not provided');
  }

  // Ако е логнат → нищо не се рендва
  return auth.isAuth ? null : <Outlet />;
};
