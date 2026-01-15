import { createContext } from 'react';

interface LoadingContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);
