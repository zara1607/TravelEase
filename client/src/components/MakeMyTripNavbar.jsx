// src/components/MakeMyTripNavbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search,
  X,
  Menu,
  User,
  Bell,
  ChevronDown,
  Plane,
  Building2,
  Package,
  Train,
  Bus,
  Car,
  Ship,
  Globe,
  Shield,
  Heart,
  LogOut,
  Settings,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';

const MakeMyTripNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const userDropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  // All travel services - Flights now correctly points to dashboard
  const travelServices = [
    { id: 'flights', label: 'Flights', icon: Plane, path: '/flights' },      // ← This goes to FlightsDashboard
    { id: 'hotels', label: 'Hotels', icon: Building2, path: '/hotels' },
    { id: 'packages', label: 'Packages', icon: Package, path: '/packages' },
    { id: 'trains', label: 'Trains', icon: Train, path: '/trains' },
    { id: 'buses', label: 'Buses', icon: Bus, path: '/buses' },
    { id: 'cabs', label: 'Cabs', icon: Car, path: '/cabs' },
    { id: 'cruises', label: 'Cruises', icon: Ship, path: '/cruises' },
    { id: 'visa', label: 'Visa', icon: Globe, path: '/visa' },
    { id: 'insurance', label: 'Insurance', icon: Shield, path: '/insurance' },
  ];

  // User menu items
  const userMenuItems = [
    { id: 'profile', label: 'My Profile', icon: User, path: '/profile' },
    { id: 'bookings', label: 'My Bookings', icon: Clock, path: '/bookings' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu & dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // Mock notifications
  useEffect(() => {
    const mock = [
      { id: 1, title: 'Booking Confirmed', message: 'Your Dubai package is confirmed', time: '2h ago', read: false },
      { id: 2, title: 'Price Drop Alert', message: 'Mumbai flights dropped 20%', time: '5h ago', read: false },
    ];
    setNotifications(mock);
    setUnreadCount(mock.filter((n) => !n.read).length);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const handleNotificationClick = (notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white border-b border-gray-100'
        }`}
        style={{ height: '68px' }}
      >
        <div className="h-full w-full max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Logo - Compact */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <span className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                TravelEase
              </span>
            </Link>

            {/* Desktop Navigation - Center with even spacing */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center justify-between gap-8 max-w-3xl w-full">
                {travelServices.map((service) => {
                  const Icon = service.icon;
                  const active = isActive(service.path);

                  return (
                    <Link
                      key={service.id}
                      to={service.path}
                      className="flex flex-col items-center group"
                    >
                      <div className="relative">
                        <Icon 
                          className={`w-[22px] h-[22px] transition-all duration-200 ${
                            active 
                              ? 'text-blue-600' 
                              : 'text-gray-500 group-hover:text-blue-600'
                          }`} 
                        />
                        {active && (
                          <span className="absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <span 
                        className={`text-[13px] font-medium mt-1 transition-colors whitespace-nowrap ${
                          active 
                            ? 'text-blue-600' 
                            : 'text-gray-500 group-hover:text-blue-600'
                        }`}
                      >
                        {service.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Notifications */}
              <div className="relative hidden md:block" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Bell className="w-[22px] h-[22px] text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline">
                          Mark all read
                        </button>
                      )}
                    </div>

                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`w-full text-left p-3 hover:bg-gray-50 border-b last:border-none transition-colors ${
                            !n.read ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => (isAuthenticated ? navigate('/wishlist') : navigate('/login'))}
                className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className="w-[22px] h-[22px] text-gray-600" />
              </button>

              {/* User / Auth */}
              {isAuthenticated ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-600">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {userMenuItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      ))}

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/login')}
                    className="text-sm px-3 py-1.5"
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => navigate('/register')}
                    className="text-sm px-3 py-1.5"
                  >
                    Register
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-[22px] h-[22px] text-gray-600" />
                ) : (
                  <Menu className="w-[22px] h-[22px] text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
            <div
              className="absolute top-[68px] left-0 right-0 bg-white max-h-[calc(100vh-68px)] overflow-y-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4">
                {/* Mobile Travel Services Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {travelServices.map((service) => {
                    const Icon = service.icon;
                    const active = isActive(service.path);

                    return (
                      <Link
                        key={service.id}
                        to={service.path}
                        className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                          active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5 mb-1" />
                        <span className="text-xs font-medium text-center">{service.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="w-4 h-4 text-gray-600" />
                          <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 flex items-center justify-center gap-2 p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button variant="primary" size="sm" fullWidth onClick={() => navigate('/register')}>
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer - Exact height of navbar */}
      <div style={{ height: '68px' }}></div>
    </>
  );
};

export default MakeMyTripNavbar;