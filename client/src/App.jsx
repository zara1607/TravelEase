// src/App.jsx
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
import BookingDetails from './pages/BookingDetails';
import BookingCancel from './pages/BookingCancel';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PlaceholderPages from './pages/PlaceholderPages';
import NotFound from './pages/NotFound';
import PackageDetails from './pages/PackageDetails';
import DestinationDetails from './pages/DestinationDetails';
import DealDetails from './pages/DealDetails';
import DetailsPage from './pages/DetailsPage';
import FlightDetails from './pages/FlightDetails';
import HotelDetails from './pages/HotelDetails';

// New Service Pages
import VisaServices from './pages/VisaServices';
import TravelInsurance from './pages/TravelInsurance';
import Cruises from './pages/Cruises';
import CruiseBooking from './pages/CruiseBooking';

// Import for booking confirmation
import BookingConfirmation from './pages/BookingConfirmation';

// ===== FOOTER PAGES IMPORTS =====
import {
  // Company Pages
  About,
  Careers,
  Press,
  Blog,
  // Support Pages
  HelpCenter,
  Contact,
  FAQ,
  Cancellation,
  // Service Pages
  Flights,
  Hotels,
  Packages,
  Insurance,
  // Legal Pages
  Privacy,
  Terms,
  Cookies,
  Sitemap
} from './sections/footer/pages';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <MakeMyTripNavbar />
            <main className="relative">
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

                {/* New Service Dashboards */}
                <Route path="/visa" element={<VisaServices />} />
                <Route path="/insurance" element={<TravelInsurance />} />
                <Route path="/cruises" element={<Cruises />} />
                <Route path="/cruise-booking/:id" element={<CruiseBooking />} />

                {/* Detail Pages - REMOVED DUPLICATES and organized properly */}
                <Route path="/flight/:id" element={<FlightDetails />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
                <Route path="/deal/:id" element={<DealDetails />} />
                
                {/* Package Details - Using the main PackageDetails component */}
                <Route path="/package/:id" element={<PackageDetails />} />
                
                {/* Universal Details Page - This catches all other detail types */}
                <Route path="/details/:type/:id" element={<DetailsPage />} />

                {/* ===== FOOTER PAGES ROUTES ===== */}

                {/* Company Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/blog" element={<Blog />} />

                {/* Support Pages */}
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/cancellation" element={<Cancellation />} />

                {/* Service Pages */}
                <Route path="/flights-info" element={<Flights />} />
                <Route path="/hotels-info" element={<Hotels />} />
                <Route path="/packages-info" element={<Packages />} />
                <Route path="/insurance-info" element={<Insurance />} />

                {/* Legal Pages */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/sitemap" element={<Sitemap />} />

                {/* ===== END FOOTER PAGES ROUTES ===== */}

                {/* User Routes - Protected */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Booking History Routes - Protected */}
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <BookingHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings/:id"
                  element={
                    <ProtectedRoute>
                      <BookingDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings/cancel/:id"
                  element={
                    <ProtectedRoute>
                      <BookingCancel />
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

                {/* Booking Confirmation route */}
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />

                {/* Search */}
                <Route path="/search" element={<Search />} />

                {/* Additional services - Placeholders */}
                <Route path="/homestays" element={<PlaceholderPages title="Homestays" />} />
                <Route path="/tours" element={<PlaceholderPages title="Tours" />} />
                <Route path="/forex" element={<PlaceholderPages title="Forex" />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;