import React, { useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';
import '../styles/LoadSpinner.css';

export const LoadSpinner = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext?.loading) return null;

  return (
    <div className="spinner-overlay">
      <div className="loader"></div>
    </div>
  );
};
