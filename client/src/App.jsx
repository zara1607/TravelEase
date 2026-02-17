import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { queryClient } from './lib/queryClient';
import MakeMyTripNavbar from './components/MakeMyTripNavbar';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Import your dashboard components
import FlightsDashboard from './pages/FlightsDashboard';
import HotelsDashboard from './pages/HotelsDashboard';
import PackagesPageMMT from './pages/PackagesPageMMT';
import TrainsDashboard from './pages/TrainsDashboard';
import BusesDashboard from './pages/BusesDashboard';
import CabsDashboard from './pages/CabsDashboard';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';

// Import your newly created pages
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Import placeholder for any remaining missing pages
import PlaceholderPages from './pages/PlaceholderPages';

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
              <Route path="/trains" element={<TrainsDashboard />} />
              <Route path="/buses" element={<BusesDashboard />} />
              <Route path="/cabs" element={<CabsDashboard />} />
              
              {/* Other Routes */}
              <Route path="/search" element={<Search />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/booking/:id" element={<Booking />} />
              
              {/* NEW: Your newly created pages */}
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Additional services (using placeholders) */}
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