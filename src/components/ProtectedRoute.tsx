import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isDisguised } = useAppContext();

  if (isDisguised) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};