import { createContext } from 'react';

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
