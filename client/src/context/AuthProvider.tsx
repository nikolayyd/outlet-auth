import { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { userService } from '../services/UserService';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const valid = await userService.checkAuth();
      setIsAuth(valid);
    } catch {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    console.log('[LOG] Checking Token');
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
