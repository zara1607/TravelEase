import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginUser, registerUser } from '../features/auth/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser({ email, password });
      
      // Check if login was successful
      if (response?.success && response?.token) {
        // Store token and user
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);

        toast.success('Login successful!');

        // Redirect to stored intent or home
        const storedIntent = localStorage.getItem('lastIntent');
        if (storedIntent) {
          try {
            const intent = JSON.parse(storedIntent);
            localStorage.removeItem('lastIntent');
            navigate(intent.path + (intent.search || ''));
          } catch (e) {
            navigate('/');
          }
        } else {
          navigate('/');
        }

        return { success: true, user: response.user };
      } else {
        // Handle case where response doesn't have expected structure
        const errorMessage = response?.message || 'Login failed';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Extract error message from response if available
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      
      if (response?.success && response?.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);

        toast.success('Registration successful! Welcome to TravelEase!');
        navigate('/');
        return { success: true, user: response.user };
      } else {
        const errorMessage = response?.message || 'Registration failed';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    clearAuth();
    toast.success('You have been logged out successfully!');

    // If on a protected route, redirect to home
    const protectedPaths = ['/dashboard', '/profile', '/bookings', '/wishlist'];
    const isProtectedRoute = protectedPaths.some(path => 
      location.pathname.startsWith(path)
    );

    if (isProtectedRoute) {
      navigate('/');
    }

    return { success: true };
  };

  const updateUser = (updatedUser) => {
    if (!user) return;
    
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('Profile updated successfully!');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};