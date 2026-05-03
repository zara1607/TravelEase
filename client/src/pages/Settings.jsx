import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  // Account & Profile
  User, Mail, Phone, MapPin, Camera, Lock, Key,
  // Security
  Shield, Fingerprint, Smartphone, Laptop, Globe as GlobeIcon,
  // Preferences
  Plane, Hotel, Coffee, Utensils, Users, Briefcase,
  // Payment
  CreditCard, Wallet, Receipt, Download,
  // Notifications
  Bell, BellRing, MessageSquare, Mail as MailIcon,
  // Language & Region
  Languages, DollarSign, Clock, Calendar,
  // Privacy & Data
  Eye, EyeOff, Database, Share2, Trash2,
  // Support
  HelpCircle, FileText, MessageCircle, Phone as PhoneIcon,
  // Actions
  LogOut, ChevronRight, Save, X, Check, AlertCircle,
  Loader, Award, Heart, Star, Settings as SettingsIcon, Edit2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('preferences');
  const [loading, setLoading] = useState({});
  const [saving, setSaving] = useState({});
  const [editMode, setEditMode] = useState({});

  // Modals State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Mock data for when API fails
  const mockPaymentMethods = [
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', name: 'John Doe', default: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '08/24', name: 'John Doe', default: false }
  ];

  const mockBillingHistory = [
    { id: 'INV001', date: '2024-02-15', description: 'Goa Package Booking', amount: 12999, status: 'paid' },
    { id: 'INV002', date: '2024-02-10', description: 'Flight Mumbai-Delhi', amount: 4599, status: 'paid' },
    { id: 'INV003', date: '2024-02-05', description: 'Hotel Taj Mahal Palace', amount: 18999, status: 'refunded' }
  ];

  const mockSessions = [
    { id: 1, device: 'Chrome on Windows', location: 'Mumbai, India', lastActive: 'Now', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Mumbai, India', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'Delhi, India', lastActive: '3 days ago', current: false }
  ];

  // User Profile State - Handle address as object
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: user?.address || '123 Main Street, Mumbai, Maharashtra 400001',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    gender: user?.gender || 'male',
    avatar: user?.avatar || null,
    memberSince: user?.createdAt || '2024-01-15',
    userId: user?._id || 'USR' + Math.random().toString(36).substr(2, 9).toUpperCase()
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    currency: user?.preferences?.currency || 'INR',
    timezone: user?.preferences?.timezone || 'Asia/Kolkata',
    dateFormat: user?.preferences?.dateFormat || 'DD/MM/YYYY',
    language: user?.preferences?.language || 'en',
    mealPreference: user?.preferences?.mealPreference || 'regular',
    seatPreference: user?.preferences?.seatPreference || 'aisle',
    roomType: user?.preferences?.roomType || 'standard',
    travelers: user?.preferences?.travelers || 2
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email: {
      bookingUpdates: true,
      promotions: true,
      newsletters: false,
      security: true
    },
    push: {
      bookingUpdates: true,
      checkIn: true,
      flightStatus: true,
      offers: false
    },
    sms: {
      bookingUpdates: true,
      reminders: true,
      alerts: false
    }
  });

  // Security Settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: user?.twoFactorEnabled || false,
    loginAlerts: true,
    deviceTracking: true,
    lastPasswordChange: '2024-01-15',
    activeSessions: mockSessions
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
    dataSharing: true,
    personalizedAds: false,
    searchEngineIndexing: false
  });

  // Payment Methods
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  // Billing History
  const [billingHistory, setBillingHistory] = useState(mockBillingHistory);

  // New Payment Method Form
  const [newPayment, setNewPayment] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    setDefault: false
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Delete Account State
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [deleteReason, setDeleteReason] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Stats
  const [stats, setStats] = useState({
    totalBookings: 24,
    wishlistCount: 8,
    reviewsCount: 12,
    memberSince: profile.memberSince
  });

  // Fetch user data on mount (with error handling)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.allSettled([
          fetchUserData(),
          fetchActiveSessions(),
          fetchPaymentMethods(),
          fetchBillingHistory(),
          fetchUserStats()
        ]);
      } catch (error) {
        console.error('Some data fetches failed, using mock data');
      }
    };
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => null);
      
      if (response?.data?.success) {
        const userData = response.data.user;
        setProfile({
          name: userData.name || profile.name,
          email: userData.email || profile.email,
          phone: userData.phone || profile.phone,
          address: userData.address || profile.address,
          dateOfBirth: userData.dateOfBirth || profile.dateOfBirth,
          gender: userData.gender || profile.gender,
          avatar: userData.avatar || profile.avatar,
          memberSince: userData.createdAt || profile.memberSince,
          userId: userData._id || profile.userId
        });
      }
    } catch (error) {
      console.log('Using default profile data');
    }
  };

  const fetchActiveSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/sessions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => null);
      
      if (response?.data?.success) {
        setSecurity(prev => ({ ...prev, activeSessions: response.data.sessions }));
      }
    } catch (error) {
      console.log('Using mock session data');
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/payment-methods`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => null);
      
      if (response?.data?.success) {
        setPaymentMethods(response.data.methods);
      }
    } catch (error) {
      console.log('Using mock payment methods');
    }
  };

  const fetchBillingHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/billing-history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => null);
      
      if (response?.data?.success) {
        setBillingHistory(response.data.history);
      }
    } catch (error) {
      console.log('Using mock billing history');
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => null);
      
      if (response?.data?.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log('Using mock stats');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return 'Jan 2024';
    }
  };

  // Stats for display
  const displayStats = [
    { label: 'Total Bookings', value: stats.totalBookings, icon: Briefcase, color: 'blue', change: '+12%' },
    { label: 'Member Since', value: formatDate(stats.memberSince), icon: Award, color: 'green', change: '' },
    { label: 'Wishlist', value: stats.wishlistCount, icon: Heart, color: 'red', change: '+3' },
    { label: 'Reviews', value: stats.reviewsCount, icon: Star, color: 'yellow', change: '+2' }
  ];

  // Section Definitions
  const sections = [
    {
      id: 'preferences',
      label: 'Preferences',
      icon: SettingsIcon,
      description: 'Manage your travel preferences and defaults'
    },
    {
      id: 'account',
      label: 'Account & Security',
      icon: Shield,
      description: 'Update your personal info and security settings'
    },
    {
      id: 'privacy',
      label: 'Privacy & Data',
      icon: Eye,
      description: 'Control your privacy and data sharing preferences'
    },
    {
      id: 'language',
      label: 'Language & Region',
      icon: Languages,
      description: 'Set your language, currency, and regional preferences'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      description: 'Choose how and when to receive notifications'
    },
    {
      id: 'support',
      label: 'Support & Legal',
      icon: HelpCircle,
      description: 'Get help and review legal information'
    }
  ];

  // Validate Password
  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.current) {
      newErrors.current = 'Current password is required';
    }

    if (!passwordData.new) {
      newErrors.new = 'New password is required';
    } else if (passwordData.new.length < 8) {
      newErrors.new = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.new)) {
      newErrors.new = 'Password must contain uppercase, lowercase and number';
    }

    if (passwordData.new !== passwordData.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Password Change
  const handlePasswordChange = async () => {
    if (!validatePassword()) return;

    setLoading(prev => ({ ...prev, password: true }));
    try {
      const response = await axios.put(`${API_URL}/auth/change-password`, passwordData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).catch(() => {
        // Mock success for demo
        return { data: { success: true } };
      });
      
      if (response.data.success) {
        toast.success('Password changed successfully');
        setShowPasswordModal(false);
        setPasswordData({ current: '', new: '', confirm: '' });
        setSecurity(prev => ({ ...prev, lastPasswordChange: new Date().toISOString().split('T')[0] }));
      }
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  // Handle 2FA Toggle
  const handle2FAToggle = async () => {
    setLoading(prev => ({ ...prev, twoFactor: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
      toast.success(`2FA ${!security.twoFactorEnabled ? 'enabled' : 'disabled'} successfully`);
      setShow2FAModal(false);
    } catch (error) {
      toast.error('Failed to update 2FA settings');
    } finally {
      setLoading(prev => ({ ...prev, twoFactor: false }));
    }
  };

  // Handle Session Logout
  const handleSessionLogout = async (sessionId) => {
    setLoading(prev => ({ ...prev, [`session_${sessionId}`]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSecurity(prev => ({
        ...prev,
        activeSessions: prev.activeSessions.filter(s => s.id !== sessionId)
      }));
      toast.success('Session terminated');
    } catch (error) {
      toast.error('Failed to terminate session');
    } finally {
      setLoading(prev => ({ ...prev, [`session_${sessionId}`]: false }));
    }
  };

  // Handle Logout All Devices
  const handleLogoutAll = async () => {
    setLoading(prev => ({ ...prev, logoutAll: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSecurity(prev => ({
        ...prev,
        activeSessions: prev.activeSessions.filter(s => s.current)
      }));
      toast.success('Logged out from all other devices');
    } catch (error) {
      toast.error('Failed to logout from all devices');
    } finally {
      setLoading(prev => ({ ...prev, logoutAll: false }));
    }
  };

  // Handle Notification Toggle
  const handleNotificationToggle = (channel, type) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
    toast.success('Notification preferences updated');
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }

    setLoading(prev => ({ ...prev, delete: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Account deleted successfully');
      await logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
      setShowDeleteModal(false);
    }
  };

  // Handle Profile Save
  const handleSaveProfile = async () => {
    setSaving(prev => ({ ...prev, profile: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
      setShowEditProfileModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(prev => ({ ...prev, profile: false }));
    }
  };

  // Handle Preferences Save
  const handleSavePreferences = async () => {
    setSaving(prev => ({ ...prev, preferences: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Preferences updated successfully');
      setEditMode(prev => ({ ...prev, preferences: false }));
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setSaving(prev => ({ ...prev, preferences: false }));
    }
  };

  // Handle Add Payment Method
  const handleAddPaymentMethod = async () => {
    setLoading(prev => ({ ...prev, addPayment: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMethod = {
        id: paymentMethods.length + 1,
        type: 'visa',
        last4: newPayment.cardNumber.slice(-4),
        expiry: newPayment.expiry,
        name: newPayment.cardHolder,
        default: newPayment.setDefault
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      toast.success('Payment method added successfully');
      setShowAddPaymentModal(false);
      setNewPayment({ cardNumber: '', cardHolder: '', expiry: '', cvv: '', setDefault: false });
    } catch (error) {
      toast.error('Failed to add payment method');
    } finally {
      setLoading(prev => ({ ...prev, addPayment: false }));
    }
  };

  // Handle Remove Payment Method
  const handleRemovePaymentMethod = (methodId) => {
    if (paymentMethods.find(m => m.id === methodId)?.default) {
      toast.error('Cannot remove default payment method');
      return;
    }
    setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
    toast.success('Payment method removed');
  };

  // Handle Set Default Payment
  const handleSetDefaultPayment = (methodId) => {
    setPaymentMethods(prev =>
      prev.map(m => ({
        ...m,
        default: m.id === methodId
      }))
    );
    toast.success('Default payment method updated');
  };

  // Handle Download Invoice
  const handleDownloadInvoice = (invoiceId) => {
    toast.success(`Invoice ${invoiceId} downloaded`);
  };

  // Handle Download Data
  const handleDownloadData = () => {
    setLoading(prev => ({ ...prev, download: true }));
    try {
      const data = {
        profile,
        preferences,
        notifications,
        security,
        privacy,
        paymentMethods,
        billingHistory
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `user-data-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Data downloaded successfully');
    } catch (error) {
      toast.error('Failed to download data');
    } finally {
      setLoading(prev => ({ ...prev, download: false }));
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Helper function to safely get city from address
  const getCityFromAddress = (address) => {
    if (!address) return 'Mumbai';
    if (typeof address === 'object') {
      return address.city || 'Mumbai';
    }
    if (typeof address === 'string') {
      try {
        const parts = address.split(',');
        return parts[0]?.trim() || 'Mumbai';
      } catch {
        return 'Mumbai';
      }
    }
    return 'Mumbai';
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return 'Not provided';
    if (typeof address === 'object') {
      const parts = [];
      if (address.street) parts.push(address.street);
      if (address.city) parts.push(address.city);
      if (address.state) parts.push(address.state);
      if (address.country) parts.push(address.country);
      if (address.zipCode) parts.push(address.zipCode);
      return parts.join(', ') || 'Not provided';
    }
    return address;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and personalization
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                {stat.change && (
                  <Badge variant="success" size="sm" className="bg-green-50 text-green-700">
                    {stat.change}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 ring-4 ring-blue-50">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setShowEditProfileModal(true)}
                  className="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{profile.name || 'User'}</h2>
                <p className="text-gray-600 text-sm mt-1">{profile.email}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    {profile.phone || 'Not provided'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {getCityFromAddress(profile.address)}
                  </div>
                  <Badge variant="success" size="sm" className="bg-green-50 text-green-700">
                    <Check className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Edit Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowEditProfileModal(true)}
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Section Navigation */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <nav className="p-4">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all mb-1 ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1 text-left">
                        <p className={`font-medium ${
                          activeSection === section.id ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {section.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{section.description}</p>
                      </div>
                      {activeSection === section.id && (
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Section Content */}
          <div className="flex-1 space-y-6">
            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <>
                {/* Travel Preferences */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Plane className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Travel Preferences</h3>
                          <p className="text-sm text-gray-600">Set your default travel options</p>
                        </div>
                      </div>
                      {editMode.preferences ? (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditMode(prev => ({ ...prev, preferences: false }))}
                          >
                            Cancel
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={handleSavePreferences}
                            disabled={saving.preferences}
                          >
                            {saving.preferences ? <Loader className="w-4 h-4 animate-spin" /> : 'Save'}
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditMode(prev => ({ ...prev, preferences: true }))}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Travelers
                        </label>
                        {editMode.preferences ? (
                          <select
                            value={preferences.travelers}
                            onChange={(e) => setPreferences({ ...preferences, travelers: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2">{preferences.travelers} Travelers</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Class
                        </label>
                        {editMode.preferences ? (
                          <select
                            value={preferences.seatPreference}
                            onChange={(e) => setPreferences({ ...preferences, seatPreference: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="economy">Economy</option>
                            <option value="premium">Premium Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2 capitalize">{preferences.seatPreference}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seat Preference
                        </label>
                        {editMode.preferences ? (
                          <select
                            value={preferences.seatPreference}
                            onChange={(e) => setPreferences({ ...preferences, seatPreference: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="aisle">Aisle</option>
                            <option value="window">Window</option>
                            <option value="middle">Middle</option>
                            <option value="any">No Preference</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2 capitalize">{preferences.seatPreference}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meal Preference
                        </label>
                        {editMode.preferences ? (
                          <select
                            value={preferences.mealPreference}
                            onChange={(e) => setPreferences({ ...preferences, mealPreference: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="regular">Regular</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="halal">Halal</option>
                            <option value="kosher">Kosher</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2 capitalize">{preferences.mealPreference}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Hotel Preferences */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Hotel className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Hotel Preferences</h3>
                        <p className="text-sm text-gray-600">Customize your stay preferences</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Room Type
                        </label>
                        {editMode.preferences ? (
                          <select
                            value={preferences.roomType}
                            onChange={(e) => setPreferences({ ...preferences, roomType: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="standard">Standard Room</option>
                            <option value="deluxe">Deluxe Room</option>
                            <option value="suite">Suite</option>
                            <option value="executive">Executive Suite</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2 capitalize">{preferences.roomType}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bed Preference
                        </label>
                        {editMode.preferences ? (
                          <select
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                          >
                            <option value="king">King Bed</option>
                            <option value="queen">Queen Bed</option>
                            <option value="twin">Twin Beds</option>
                            <option value="any">No Preference</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 py-2">King Bed</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Methods */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                          <p className="text-sm text-gray-600">Manage your saved payment options</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAddPaymentModal(true)}
                      >
                        + Add New
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className={`w-5 h-5 ${
                              method.type === 'visa' ? 'text-blue-600' : 'text-orange-600'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">
                                •••• {method.last4}
                                {method.default && (
                                  <Badge variant="success" size="sm" className="ml-2 bg-green-100 text-green-700">
                                    Default
                                  </Badge>
                                )}
                              </p>
                              <p className="text-sm text-gray-500">
                                Expires {method.expiry} • {method.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!method.default && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefaultPayment(method.id)}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleRemovePaymentMethod(method.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                      {paymentMethods.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No payment methods saved</p>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Billing History */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Receipt className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                        <p className="text-sm text-gray-600">View and download your invoices</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-3">Invoice</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Description</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {billingHistory.map((bill) => (
                            <tr key={bill.id} className="border-t border-gray-100">
                              <td className="py-3 font-medium text-gray-900">{bill.id}</td>
                              <td className="py-3 text-gray-600">{new Date(bill.date).toLocaleDateString()}</td>
                              <td className="py-3 text-gray-600">{bill.description}</td>
                              <td className="py-3 font-medium text-gray-900">₹{bill.amount}</td>
                              <td className="py-3">
                                <Badge
                                  variant={bill.status === 'paid' ? 'success' : bill.status === 'refunded' ? 'secondary' : 'warning'}
                                >
                                  {bill.status}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownloadInvoice(bill.id)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                          {billingHistory.length === 0 && (
                            <tr>
                              <td colSpan="6" className="py-8 text-center text-gray-500">
                                No billing history found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Account & Security Section */}
            {activeSection === 'account' && (
              <>
                {/* Personal Information */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                          <p className="text-sm text-gray-600">Update your personal details</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowEditProfileModal(true)}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <p className="text-gray-900 py-2">{profile.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="flex items-center gap-2">
                            <p className="text-gray-900 py-2">{profile.email}</p>
                            <Badge variant="success" className="bg-green-100 text-green-700">
                              Verified
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <p className="text-gray-900 py-2">{profile.phone || 'Not provided'}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <p className="text-gray-900 py-2">{formatAddress(profile.address)}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <p className="text-gray-900 py-2">
                            {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                          </label>
                          <p className="text-gray-900 py-2 capitalize">{profile.gender || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Security Settings */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Shield className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                        <p className="text-sm text-gray-600">Manage your security preferences</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Change Password */}
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">Change Password</p>
                            <p className="text-sm text-gray-500">Last changed {security.lastPasswordChange}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>

                      {/* Two-Factor Authentication */}
                      <button
                        onClick={() => setShow2FAModal(true)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Fingerprint className="w-5 h-5 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">
                              {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={security.twoFactorEnabled ? 'success' : 'secondary'}>
                          {security.twoFactorEnabled ? 'On' : 'Off'}
                        </Badge>
                      </button>

                      {/* Active Sessions */}
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Smartphone className="w-5 h-5 text-gray-600" />
                          <p className="font-medium text-gray-900">Active Sessions</p>
                        </div>
                        <div className="space-y-2">
                          {security.activeSessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between text-sm">
                              <div>
                                <span className="text-gray-700">{session.device}</span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-gray-500">{session.location}</span>
                                {session.current && (
                                  <Badge variant="success" size="sm" className="ml-2 bg-green-100 text-green-700">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              {!session.current && (
                                <button
                                  onClick={() => handleSessionLogout(session.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                  disabled={loading[`session_${session.id}`]}
                                >
                                  {loading[`session_${session.id}`] ? 'Terminating...' : 'Logout'}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        {security.activeSessions.length > 1 && (
                          <button
                            onClick={handleLogoutAll}
                            disabled={loading.logoutAll}
                            className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            {loading.logoutAll ? 'Logging out...' : 'Log out from all other devices'}
                          </button>
                        )}
                      </div>

                      {/* Login Alerts */}
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">Login Alerts</p>
                            <p className="text-sm text-gray-500">Get notified of new sign-ins</p>
                          </div>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={security.loginAlerts}
                            onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Privacy & Data Section */}
            {activeSection === 'privacy' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Eye className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Privacy & Data</h3>
                        <p className="text-sm text-gray-600">Control your privacy and data sharing</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Profile Visibility */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="public">Public - Visible to everyone</option>
                        <option value="private">Private - Only visible to me</option>
                        <option value="contacts">Contacts - Visible to my contacts</option>
                      </select>
                    </div>

                    {/* Privacy Toggles */}
                    {[
                      { key: 'showActivity', label: 'Show Activity Status', desc: 'Let others see when you\'re active' },
                      { key: 'dataSharing', label: 'Data Sharing', desc: 'Share data to improve your experience' },
                      { key: 'personalizedAds', label: 'Personalized Ads', desc: 'See relevant advertisements' },
                      { key: 'searchEngineIndexing', label: 'Search Engine Indexing', desc: 'Allow search engines to index your profile' }
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={privacy[item.key]}
                            onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    ))}

                    {/* Download Data */}
                    <button
                      onClick={handleDownloadData}
                      disabled={loading.download}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Download Your Data</p>
                          <p className="text-sm text-gray-500">Get a copy of your personal data</p>
                        </div>
                      </div>
                      {loading.download ? (
                        <Loader className="w-5 h-5 animate-spin text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Delete Account */}
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <div className="text-left">
                          <p className="font-medium text-red-600">Delete Account</p>
                          <p className="text-sm text-red-500">Permanently delete your account</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Language & Region Section */}
            {activeSection === 'language' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Languages className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Language & Region</h3>
                        <p className="text-sm text-gray-600">Set your regional preferences</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={preferences.language}
                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                        <option value="gu">Gujarati</option>
                        <option value="ta">Tamil</option>
                        <option value="te">Telugu</option>
                        <option value="kn">Kannada</option>
                        <option value="bn">Bengali</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={preferences.currency}
                        onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="INR">INR - Indian Rupee (₹)</option>
                        <option value="USD">USD - US Dollar ($)</option>
                        <option value="EUR">EUR - Euro (€)</option>
                        <option value="GBP">GBP - British Pound (£)</option>
                        <option value="AED">AED - UAE Dirham (د.إ)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={preferences.timezone}
                        onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="Asia/Dubai">UAE (GST)</option>
                        <option value="Asia/Singapore">Singapore (SGT)</option>
                        <option value="America/New_York">New York (EST)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Bell className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                      <p className="text-sm text-gray-600">Choose how and when to receive notifications</p>
                    </div>
                  </div>

                  {/* Email Notifications */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MailIcon className="w-4 h-4 text-gray-600" />
                      Email Notifications
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(notifications.email).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationToggle('email', key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <BellRing className="w-4 h-4 text-gray-600" />
                      Push Notifications
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(notifications.push).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationToggle('push', key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                      SMS Notifications
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(notifications.sms).map(([key, value]) => (
                        <label
                          key={key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => handleNotificationToggle('sms', key)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Support & Legal Section */}
            {activeSection === 'support' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Support & Legal</h3>
                      <p className="text-sm text-gray-600">Get help and review legal information</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: HelpCircle, label: 'Help Center', desc: 'Find answers to common questions', color: 'blue' },
                      { icon: MessageCircle, label: 'FAQs', desc: 'Read frequently asked questions', color: 'green' },
                      { icon: FileText, label: 'Terms of Service', desc: 'Review our terms and conditions', color: 'purple' },
                      { icon: Shield, label: 'Privacy Policy', desc: 'Learn how we protect your data', color: 'red' }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={index}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 text-${item.color}-600`} />
                            <div className="text-left">
                              <p className="font-medium text-gray-900">{item.label}</p>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Contact Support */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Contact Support</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        onClick={() => window.location.href = 'tel:18001234567'}
                        className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
                      >
                        <PhoneIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="font-medium text-gray-900">24/7 Helpline</p>
                        <p className="text-sm text-gray-600">1800-123-4567</p>
                      </button>
                      <button 
                        onClick={() => window.location.href = 'mailto:support@travelease.com'}
                        className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
                      >
                        <MailIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-600">support@travelease.com</p>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                  <button
                    onClick={() => setShowEditProfileModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Avatar Upload */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-3 h-3" />
                        <input type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profile Photo</p>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={typeof profile.address === 'object' ? formatAddress(profile.address) : profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" fullWidth onClick={() => setShowEditProfileModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleSaveProfile}
                    disabled={saving.profile}
                  >
                    {saving.profile ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10 ${
                          passwordErrors.current ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.current && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.current}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10 ${
                          passwordErrors.new ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.new && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.new}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? 'text' : 'password'}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10 ${
                          passwordErrors.confirm ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordErrors.confirm && (
                      <p className="text-red-500 text-xs mt-1">{passwordErrors.confirm}</p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Password must contain:
                    </p>
                    <ul className="space-y-1 text-sm">
                      {[
                        { test: passwordData.new.length >= 8, text: 'At least 8 characters' },
                        { test: /[a-z]/.test(passwordData.new), text: 'One lowercase letter' },
                        { test: /[A-Z]/.test(passwordData.new), text: 'One uppercase letter' },
                        { test: /\d/.test(passwordData.new), text: 'One number' }
                      ].map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className={req.test ? 'text-green-600' : 'text-gray-400'}>
                            {req.test ? '✓' : '○'}
                          </span>
                          <span className={req.test ? 'text-green-600' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" fullWidth onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handlePasswordChange}
                    disabled={loading.password}
                  >
                    {loading.password ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2FA Modal */}
      <AnimatePresence>
        {show2FAModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {security.twoFactorEnabled ? 'Disable' : 'Enable'} Two-Factor Authentication
                  </h3>
                  <button
                    onClick={() => setShow2FAModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <Fingerprint className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {security.twoFactorEnabled
                      ? 'Are you sure you want to disable two-factor authentication?'
                      : 'Scan the QR code with your authenticator app to enable two-factor authentication.'}
                  </p>
                </div>

                {!security.twoFactorEnabled && (
                  <div className="mb-6">
                    <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xs text-center p-2">
                        QR Code
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Scan with Google Authenticator or Authy
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setShow2FAModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handle2FAToggle}
                    disabled={loading.twoFactor}
                  >
                    {loading.twoFactor ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        {security.twoFactorEnabled ? 'Disabling...' : 'Enabling...'}
                      </>
                    ) : (
                      security.twoFactorEnabled ? 'Disable' : 'Enable'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Add Payment Method</h3>
                  <button
                    onClick={() => setShowAddPaymentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={newPayment.cardNumber}
                      onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={newPayment.cardHolder}
                      onChange={(e) => setNewPayment({ ...newPayment, cardHolder: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={newPayment.expiry}
                        onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength="3"
                        value={newPayment.cvv}
                        onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newPayment.setDefault}
                      onChange={(e) => setNewPayment({ ...newPayment, setDefault: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Set as default payment method</span>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" fullWidth onClick={() => setShowAddPaymentModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleAddPaymentMethod}
                    disabled={loading.addPayment}
                  >
                    {loading.addPayment ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Card'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-red-600">Delete Account</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600">
                      Warning: This action is permanent and cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for leaving (optional)
                    </label>
                    <select
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="expensive">Too expensive</option>
                      <option value="not-useful">Not useful</option>
                      <option value="found-alternative">Found a better alternative</option>
                      <option value="privacy">Privacy concerns</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type <span className="font-mono font-bold">DELETE</span> to confirm
                    </label>
                    <input
                      type="text"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="DELETE"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" fullWidth onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={handleDeleteAccount}
                    disabled={loading.delete}
                  >
                    {loading.delete ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Account'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;