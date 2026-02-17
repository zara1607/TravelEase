import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    // Check for stored intent
    const storedIntent = localStorage.getItem('lastIntent');
    if (storedIntent) {
      const intent = JSON.parse(storedIntent);
      localStorage.removeItem('lastIntent');
      return <Navigate to={intent.path + intent.search} replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;