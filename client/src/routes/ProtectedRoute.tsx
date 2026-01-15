import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error('ProtectedRoute must be used within AuthProvider');

  if (auth.loading) return null;

  return auth.isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
