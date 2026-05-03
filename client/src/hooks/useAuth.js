import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const AuthContext = createContext(null);

// Mock user database for validation (replace with real API later)
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Test User',
    avatar: null
  },
  {
    id: '2',
    email: 'john@example.com',
    password: 'john123',
    name: 'John Doe',
    avatar: null
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (savedUser && token) {
      try {
        // Verify token validity (mock verification)
        const parsedUser = JSON.parse(savedUser);
        // Optional: Validate with backend here
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    setLoading(false);
  }, []);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength (minimum 6 characters)
  const isValidPassword = (password) => {
    return password && password.length >= 6;
  };

  const login = async (email, password) => {
    // Clear previous errors
    setAuthError(null);
    
    // Validate inputs
    if (!email || !password) {
      setAuthError('Email and password are required');
      return { 
        success: false, 
        error: 'Email and password are required' 
      };
    }

    if (!isValidEmail(email)) {
      setAuthError('Please enter a valid email address');
      return { 
        success: false, 
        error: 'Please enter a valid email address' 
      };
    }

    if (!isValidPassword(password)) {
      setAuthError('Password must be at least 6 characters');
      return { 
        success: false, 
        error: 'Password must be at least 6 characters' 
      };
    }

    try {
      // Try actual API call first
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          
          // Store user data and token
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('authToken', data.token);
          
          // Update state
          setUser(data.user);
          setAuthError(null);

          // Handle redirect after login
          const storedIntent = localStorage.getItem('lastIntent');
          if (storedIntent) {
            const intent = JSON.parse(storedIntent);
            localStorage.removeItem('lastIntent');
            navigate(intent.path + intent.search);
          } else {
            navigate('/');
          }

          return { success: true, user: data.user };
        } else {
          const error = await response.json();
          // Check for specific error types
          if (response.status === 401) {
            setAuthError('Invalid email or password');
            return { success: false, error: 'Invalid email or password' };
          } else if (response.status === 404) {
            setAuthError('Account not found. Please register first.');
            return { success: false, error: 'Account not found' };
          } else {
            setAuthError(error.message || 'Login failed');
            return { success: false, error: error.message || 'Login failed' };
          }
        }
      } catch (apiError) {
        console.log('API not available, using mock validation', apiError);
        
        // Fallback to mock validation
        const mockUser = MOCK_USERS.find(u => u.email === email);
        
        if (!mockUser) {
          setAuthError('Account not found. Please check your email or register.');
          return { 
            success: false, 
            error: 'Account not found. Please check your email or register.' 
          };
        }

        if (mockUser.password !== password) {
          setAuthError('Incorrect password. Please try again.');
          return { 
            success: false, 
            error: 'Incorrect password. Please try again.' 
          };
        }

        // Mock successful login
        const { password: _, ...userWithoutPassword } = mockUser;
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('authToken', mockToken);
        
        // Update state
        setUser(userWithoutPassword);
        setAuthError(null);

        // Handle redirect after login
        const storedIntent = localStorage.getItem('lastIntent');
        if (storedIntent) {
          const intent = JSON.parse(storedIntent);
          localStorage.removeItem('lastIntent');
          navigate(intent.path + intent.search);
        } else {
          navigate('/');
        }

        return { success: true, user: userWithoutPassword };
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (userData) => {
    // Clear previous errors
    setAuthError(null);
    
    // Validate inputs
    if (!userData.name || !userData.email || !userData.password) {
      setAuthError('All fields are required');
      return { success: false, error: 'All fields are required' };
    }

    if (!isValidEmail(userData.email)) {
      setAuthError('Please enter a valid email address');
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!isValidPassword(userData.password)) {
      setAuthError('Password must be at least 6 characters');
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (userData.password !== userData.confirmPassword) {
      setAuthError('Passwords do not match');
      return { success: false, error: 'Passwords do not match' };
    }

    try {
      // Try actual API call first
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('authToken', data.token);
          setUser(data.user);
          setAuthError(null);
          
          navigate('/');
          return { success: true, user: data.user };
        } else {
          const error = await response.json();
          if (response.status === 409) {
            setAuthError('Email already registered. Please login.');
            return { success: false, error: 'Email already registered' };
          } else {
            setAuthError(error.message || 'Registration failed');
            return { success: false, error: error.message || 'Registration failed' };
          }
        }
      } catch (apiError) {
        console.log('API not available, using mock registration', apiError);
        
        // Check if email already exists in mock DB
        const existingUser = MOCK_USERS.find(u => u.email === userData.email);
        if (existingUser) {
          setAuthError('Email already registered. Please login.');
          return { success: false, error: 'Email already registered' };
        }

        // Mock successful registration
        const mockUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          avatar: null
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('authToken', mockToken);
        setUser(mockUser);
        setAuthError(null);
        
        navigate('/');
        return { success: true, user: mockUser };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('lastIntent');
    navigate('/');
    return { success: true };
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading,
    authError,
    clearAuthError
  };

  return React.createElement(AuthContext.Provider, { value: value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

export default useAuth;
