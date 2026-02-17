import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane,
  LayoutDashboard,
  Calendar,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import MakeMyTripNavbar from '../../components/MakeMyTripNavbar'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  // If user is not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Overview',
      exact: true
    },
    {
      path: '/dashboard/bookings',
      icon: Calendar,
      label: 'My Bookings'
    },
    {
      path: '/dashboard/profile',
      icon: User,
      label: 'Profile'
    }
  ]

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar from the first version */}
      <MakeMyTripNavbar />
      
      {/* Dashboard Content with Sidebar */}
      <div className="pt-16 flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto"
            >
              <div className="p-6">
                {/* Welcome Message */}
                <div className="mb-8">
                  <h2 className="text-sm font-medium text-gray-500 mb-1">Welcome back,</h2>
                  <p className="text-lg font-bold text-gray-900">{user?.name}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                        isActive(item.path, item.exact)
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 ml-auto transition-transform ${
                          isActive(item.path, item.exact)
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-50'
                        }`}
                      />
                    </Link>
                  ))}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-8 flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout