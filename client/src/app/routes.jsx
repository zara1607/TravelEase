import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from '../pages/Home';
import Search from '../pages/Search';
import Booking from '../pages/Booking';
import NotFound from '../pages/NotFound';
import PackagesPageMMT from '../pages/PackagesPageMMT';
import FlightsDashboard from '../pages/FlightsDashboard';
import HotelsDashboard from '../pages/HotelsDashboard';
import TrainsDashboard from '../pages/TrainsDashboard';
import BusesDashboard from '../pages/BusesDashboard';
import CabsDashboard from '../pages/CabsDashboard';

// Auth Pages
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';

// Dashboard Pages
import Dashboard from '../features/dashboard/Dashboard';
import BookingHistory from '../features/dashboard/BookingHistory';
import Profile from '../features/dashboard/Profile';

// User Pages (newly created)
import Wishlist from '../pages/Wishlist';
import UserProfile from '../pages/Profile';
import Settings from '../pages/Settings';

// Placeholder pages (for any remaining)
import {
  ToursPage,
  VisaPage,
  CruisePage,
  ForexPage,
  InsurancePage,
  HomestaysPage
} from '../pages/PlaceholderPages';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    // Store intent for after login
    localStorage.setItem('lastIntent', JSON.stringify({
      path: location.pathname,
      search: location.search,
      timestamp: Date.now()
    }));
    
    toast.error('Please sign in to access this page');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Only Route
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

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with MainLayout */}
      <Route element={<MainLayout />}>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        
        {/* Service Dashboards */}
        <Route path="/flights" element={<FlightsDashboard />} />
        <Route path="/hotels" element={<HotelsDashboard />} />
        <Route path="/packages" element={<PackagesPageMMT />} />
        <Route path="/trains" element={<TrainsDashboard />} />
        <Route path="/buses" element={<BusesDashboard />} />
        <Route path="/cabs" element={<CabsDashboard />} />
        
        {/* Additional Services */}
        <Route path="/homestays" element={<HomestaysPage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/visa" element={<VisaPage />} />
        <Route path="/cruise" element={<CruisePage />} />
        <Route path="/forex" element={<ForexPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        
        {/* Booking Routes */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/flights/:id/book" element={<Booking />} />
        <Route path="/hotels/:id/book" element={<Booking />} />
        <Route path="/packages/:id/book" element={<Booking />} />
        <Route path="/package/:id" element={<PackagesPageMMT />} />
        
        {/* User Pages (Public - but some may redirect if not logged in) */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/signup" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<BookingHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Protected User Routes (redundant with above but kept for backward compatibility) */}
      <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
      <Route path="/dashboard/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};