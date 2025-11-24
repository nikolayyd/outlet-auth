import { createContext } from 'react';

export interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);





// Hook за лесен достъп (по избор)
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };
