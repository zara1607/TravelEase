import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('travelEaseUser');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        clearAuth();
      }
    }
    setLoading(false);
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('travelEaseToken');
    localStorage.removeItem('travelEaseUser');
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      // Mock API call - replace with actual API
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: null
      };
      
      // Store in localStorage
      localStorage.setItem('travelEaseUser', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      
      // Check for stored intent
      const storedIntent = localStorage.getItem('lastIntent');
      if (storedIntent) {
        const intent = JSON.parse(storedIntent);
        localStorage.removeItem('lastIntent');
        navigate(intent.path + intent.search);
      } else {
        navigate('/');
      }
      
      toast.success('Login successful!');
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Mock API call - replace with actual API
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        avatar: null
      };
      
      // Store in localStorage
      localStorage.setItem('travelEaseUser', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      
      navigate('/');
      toast.success('Registration successful! Welcome to TravelEase!');
      return { success: true, user: mockUser };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    clearAuth();
    toast.success('You have been logged out successfully!');
    
    // If on a protected route, redirect to home
    const isProtectedRoute = location.pathname.startsWith('/dashboard') || 
                           location.pathname === '/profile' || 
                           location.pathname === '/bookings' || 
                           location.pathname === '/wishlist';
    
    if (isProtectedRoute) {
      navigate('/');
    }
    
    return { success: true };
  };

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('travelEaseUser', JSON.stringify(newUser));
    toast.success('Profile updated successfully!');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
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