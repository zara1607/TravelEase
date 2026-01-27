import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './providers'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Home from '../pages/Home'
import Search from '../pages/Search'
import Booking from '../pages/Booking'
import DashboardPage from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

// Auth Pages
import Login from '../features/auth/Login'
import Register from '../features/auth/Register'

// Dashboard Pages
import Dashboard from '../features/dashboard/Dashboard'
import BookingHistory from '../features/dashboard/BookingHistory'
import Profile from '../features/dashboard/Profile'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Public Only Route (redirect to home if logged in)
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/flights/:id" element={<Booking />} />
        <Route path="/hotels/:id" element={<Booking />} />
        <Route path="/packages/:id" element={<Booking />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<PublicOnlyRoute><AuthLayout /></PublicOnlyRoute>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/bookings" element={<BookingHistory />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}