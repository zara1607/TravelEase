import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { queryClient } from './lib/queryClient';
import MakeMyTripNavbar from './components/MakeMyTripNavbar';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import FlightsDashboard from './pages/FlightsDashboard';
import HotelsDashboard from './pages/HotelsDashboard';
import PackagesPageMMT from './pages/PackagesPageMMT';
import TrainsDashboard from './pages/TrainsDashboard';
import BusesDashboard from './pages/BusesDashboard';
import CabsDashboard from './pages/CabsDashboard';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PlaceholderPages from './pages/PlaceholderPages';
import NotFound from './pages/NotFound';
import PackageDetails from './pages/PackageDetails';

// ✅ New import for booking confirmation
import BookingConfirmation from './pages/BookingConfirmation';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <MakeMyTripNavbar />

            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Register />} />

              {/* Service Dashboards */}
              <Route path="/flights" element={<FlightsDashboard />} />
              <Route path="/hotels" element={<HotelsDashboard />} />
              <Route path="/packages" element={<PackagesPageMMT />} />
              <Route path="/package/:id" element={<PackageDetails />} />
              <Route path="/trains" element={<TrainsDashboard />} />
              <Route path="/buses" element={<BusesDashboard />} />
              <Route path="/cabs" element={<CabsDashboard />} />

              {/* User Routes - Protected */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Booking routes */}
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking/:id"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />

              {/* ✅ Added Booking Confirmation route */}
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />

              {/* Search */}
              <Route path="/search" element={<Search />} />

              {/* Additional services */}
              <Route path="/homestays" element={<PlaceholderPages title="Homestays" />} />
              <Route path="/tours" element={<PlaceholderPages title="Tours" />} />
              <Route path="/visa" element={<PlaceholderPages title="Visa Services" />} />
              <Route path="/cruise" element={<PlaceholderPages title="Cruise" />} />
              <Route path="/forex" element={<PlaceholderPages title="Forex" />} />
              <Route path="/insurance" element={<PlaceholderPages title="Travel Insurance" />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;