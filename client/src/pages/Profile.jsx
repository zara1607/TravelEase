import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, Calendar, MapPin, Camera, 
  Edit2, Save, X, Check, AlertCircle, Lock,
  Globe, Home, Map, Award, Clock, Shield,
  Upload, Download, Eye, EyeOff, Trash2, Briefcase,
  Heart, Star, MessageCircle, CreditCard, Settings,
  ChevronRight, LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Profile state
  const [profile, setProfile] = useState({
    _id: user?._id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      country: user?.address?.country || '',
      zipCode: user?.address?.zipCode || ''
    },
    avatar: user?.avatar || null,
    bio: user?.bio || '',
    occupation: user?.occupation || '',
    company: user?.company || '',
    preferences: {
      language: user?.preferences?.language || 'English',
      currency: user?.preferences?.currency || 'INR',
      notifications: user?.preferences?.notifications || true,
      darkMode: user?.preferences?.darkMode || false
    },
    social: {
      twitter: user?.social?.twitter || '',
      instagram: user?.social?.instagram || '',
      linkedin: user?.social?.linkedin || ''
    }
  });

  // Edit modes
  const [editMode, setEditMode] = useState({
    personal: false,
    address: false,
    social: false,
    preferences: false
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Form submission state
  const [saving, setSaving] = useState({
    personal: false,
    address: false,
    social: false,
    preferences: false
  });
  
  // Avatar preview
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  // Password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState('personal');

  // Stats
  const stats = [
    { label: 'Total Bookings', value: user?.stats?.totalBookings || 0, icon: Briefcase, color: 'blue' },
    { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A', icon: Clock, color: 'green' },
    { label: 'Wishlist', value: user?.stats?.wishlistCount || 0, icon: Heart, color: 'red' },
    { label: 'Reviews', value: user?.stats?.reviewsCount || 0, icon: Star, color: 'yellow' }
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: 'Booked Goa Package', date: '2 days ago', status: 'confirmed' },
    { id: 2, action: 'Added to Wishlist - Kerala', date: '5 days ago', status: 'pending' },
    { id: 3, action: 'Reviewed Udaipur Palace', date: '1 week ago', status: 'completed' }
  ];

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    if (section === 'address') {
      setProfile(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (section === 'social') {
      setProfile(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [field]: value
        }
      }));
    } else if (section === 'preferences') {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [field]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate profile data
  const validateProfile = () => {
    const newErrors = {};

    // Name validation
    if (!profile.name?.trim()) {
      newErrors.name = 'Name is required';
    } else if (profile.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (profile.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Phone validation
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
    if (profile.phone && !phoneRegex.test(profile.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date of birth validation
    if (profile.dateOfBirth) {
      const dob = new Date(profile.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      } else if (age > 120) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    // Social media validation (optional)
    if (profile.social?.twitter && !profile.social.twitter.match(/^@?(\w){1,15}$/)) {
      newErrors.twitter = 'Invalid Twitter handle';
    }

    if (profile.social?.linkedin && !profile.social.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password
  const validatePassword = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save personal info
  const handleSavePersonal = async () => {
    if (!validateProfile()) {
      toast.error('Please fix the errors before saving');
      return;
    }

    setSaving(prev => ({ ...prev, personal: true }));
    try {
      await updateUser({
        name: profile.name,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        bio: profile.bio,
        occupation: profile.occupation,
        company: profile.company
      });
      
      setEditMode(prev => ({ ...prev, personal: false }));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(prev => ({ ...prev, personal: false }));
    }
  };

  // Handle save address
  const handleSaveAddress = async () => {
    setSaving(prev => ({ ...prev, address: true }));
    try {
      await updateUser({
        address: profile.address
      });
      
      setEditMode(prev => ({ ...prev, address: false }));
      toast.success('Address updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update address');
    } finally {
      setSaving(prev => ({ ...prev, address: false }));
    }
  };

  // Handle save social
  const handleSaveSocial = async () => {
    if (!validateProfile()) return;

    setSaving(prev => ({ ...prev, social: true }));
    try {
      await updateUser({
        social: profile.social
      });
      
      setEditMode(prev => ({ ...prev, social: false }));
      toast.success('Social links updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update social links');
    } finally {
      setSaving(prev => ({ ...prev, social: false }));
    }
  };

  // Handle save preferences
  const handleSavePreferences = async () => {
    setSaving(prev => ({ ...prev, preferences: true }));
    try {
      await updateUser({
        preferences: profile.preferences
      });
      
      setEditMode(prev => ({ ...prev, preferences: false }));
      toast.success('Preferences updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update preferences');
    } finally {
      setSaving(prev => ({ ...prev, preferences: false }));
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    setUploadingAvatar(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Here you would upload to server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile picture updated!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!validatePassword()) {
      return;
    }

    setChangingPassword(true);
    try {
      // Here you would make API call to change password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  // Handle cancel edit
  const handleCancel = (section) => {
    // Reset to original values
    setProfile({
      _id: user?._id || '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        country: user?.address?.country || '',
        zipCode: user?.address?.zipCode || ''
      },
      avatar: user?.avatar || null,
      bio: user?.bio || '',
      occupation: user?.occupation || '',
      company: user?.company || '',
      preferences: {
        language: user?.preferences?.language || 'English',
        currency: user?.preferences?.currency || 'INR',
        notifications: user?.preferences?.notifications || true,
        darkMode: user?.preferences?.darkMode || false
      },
      social: {
        twitter: user?.social?.twitter || '',
        instagram: user?.social?.instagram || '',
        linkedin: user?.social?.linkedin || ''
      }
    });
    setErrors({});
    setEditMode(prev => ({ ...prev, [section]: false }));
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'address', label: 'Address', icon: Home },
    { id: 'social', label: 'Social', icon: Globe },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              {/* Profile Summary */}
              <div className="p-6 text-center border-b border-gray-200">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 mx-auto">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {uploadingAvatar ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{profile.email}</p>
                {profile.occupation && (
                  <p className="text-sm text-gray-500 mt-2">
                    {profile.occupation} {profile.company && `at ${profile.company}`}
                  </p>
                )}
              </div>

              {/* Navigation Tabs - Mobile/Desktop */}
              <div className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                        {activeTab === tab.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
                >
                  <div className={`inline-flex p-2 bg-${stat.color}-100 rounded-lg mb-2`}>
                    <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    {!editMode.personal ? (
                      <button
                        onClick={() => setEditMode({ ...editMode, personal: true })}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancel('personal')}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSavePersonal}
                          disabled={saving.personal}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {saving.personal ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Read-only Email */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{profile.email}</span>
                        <Badge variant="secondary" size="sm" className="ml-2">Verified</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    {/* Editable Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        {editMode.personal ? (
                          <div>
                            <input
                              type="text"
                              value={profile.name}
                              onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="Enter your full name"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.name}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {editMode.personal ? (
                          <div>
                            <input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="+91 98765 43210"
                            />
                            {errors.phone && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.phone}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.phone || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        {editMode.personal ? (
                          <div>
                            <input
                              type="date"
                              value={profile.dateOfBirth}
                              onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                              max={new Date().toISOString().split('T')[0]}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.dateOfBirth && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.dateOfBirth}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">
                              {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender
                        </label>
                        {editMode.personal ? (
                          <select
                            value={profile.gender}
                            onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg capitalize">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">
                              {profile.gender ? profile.gender.replace(/-/g, ' ') : 'Not provided'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Occupation & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Occupation
                        </label>
                        {editMode.personal ? (
                          <input
                            type="text"
                            value={profile.occupation}
                            onChange={(e) => handleInputChange('personal', 'occupation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Software Engineer"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.occupation || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        {editMode.personal ? (
                          <input
                            type="text"
                            value={profile.company}
                            onChange={(e) => handleInputChange('personal', 'company', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g. Google"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.company || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      {editMode.personal ? (
                        <textarea
                          value={profile.bio}
                          onChange={(e) => handleInputChange('personal', 'bio', e.target.value)}
                          rows="4"
                          placeholder="Tell us a little about yourself..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{profile.bio || 'No bio provided'}</p>
                        </div>
                      )}
                    </div>

                    {/* Password Change Button */}
                    <div className="border-t border-gray-200 pt-4">
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Lock className="w-4 h-4" />
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Address Information</h3>
                    {!editMode.address ? (
                      <button
                        onClick={() => setEditMode({ ...editMode, address: true })}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Address
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancel('address')}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveAddress}
                          disabled={saving.address}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {saving.address ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Street Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      {editMode.address ? (
                        <input
                          type="text"
                          value={profile.address.street}
                          onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                          placeholder="123 Main Street"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <Home className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{profile.address.street || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {editMode.address ? (
                          <input
                            type="text"
                            value={profile.address.city}
                            onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                            placeholder="Mumbai"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.address.city || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        {editMode.address ? (
                          <input
                            type="text"
                            value={profile.address.state}
                            onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                            placeholder="Maharashtra"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Map className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.address.state || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Country & Zip Code */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        {editMode.address ? (
                          <input
                            type="text"
                            value={profile.address.country}
                            onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                            placeholder="India"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.address.country || 'Not provided'}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP / Postal Code
                        </label>
                        {editMode.address ? (
                          <input
                            type="text"
                            value={profile.address.zipCode}
                            onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                            placeholder="400001"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{profile.address.zipCode || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Social Links Tab */}
            {activeTab === 'social' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Social Links</h3>
                    {!editMode.social ? (
                      <button
                        onClick={() => setEditMode({ ...editMode, social: true })}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Social Links
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancel('social')}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveSocial}
                          disabled={saving.social}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {saving.social ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Twitter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter
                      </label>
                      {editMode.social ? (
                        <div>
                          <input
                            type="text"
                            value={profile.social.twitter}
                            onChange={(e) => handleInputChange('social', 'twitter', e.target.value)}
                            placeholder="@username"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.twitter ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.twitter && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.twitter}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.825-12.491c.89-.66 1.662-1.466 2.259-2.373z"/>
                          </svg>
                          <span className="text-gray-900">{profile.social.twitter || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Instagram
                      </label>
                      {editMode.social ? (
                        <input
                          type="text"
                          value={profile.social.instagram}
                          onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
                          placeholder="@username"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/>
                            <circle cx="18.406" cy="5.594" r="1.44"/>
                          </svg>
                          <span className="text-gray-900">{profile.social.instagram || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn
                      </label>
                      {editMode.social ? (
                        <div>
                          <input
                            type="url"
                            value={profile.social.linkedin}
                            onChange={(e) => handleInputChange('social', 'linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.linkedin ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.linkedin && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.linkedin}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="text-gray-900">{profile.social.linkedin || 'Not provided'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Preferences</h3>
                    {!editMode.preferences ? (
                      <button
                        onClick={() => setEditMode({ ...editMode, preferences: true })}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Preferences
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCancel('preferences')}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSavePreferences}
                          disabled={saving.preferences}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                          {saving.preferences ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Language
                      </label>
                      {editMode.preferences ? (
                        <select
                          value={profile.preferences.language}
                          onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Marathi">Marathi</option>
                          <option value="Gujarati">Gujarati</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Telugu">Telugu</option>
                          <option value="Kannada">Kannada</option>
                          <option value="Bengali">Bengali</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{profile.preferences.language}</span>
                        </div>
                      )}
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Currency
                      </label>
                      {editMode.preferences ? (
                        <select
                          value={profile.preferences.currency}
                          onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="AUD">AUD (A$)</option>
                          <option value="CAD">CAD (C$)</option>
                          <option value="SGD">SGD (S$)</option>
                          <option value="AED">AED (د.إ)</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{profile.preferences.currency}</span>
                        </div>
                      )}
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Receive updates about bookings and offers</p>
                      </div>
                      {editMode.preferences ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.notifications}
                            onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      ) : (
                        <Badge variant={profile.preferences.notifications ? 'success' : 'secondary'}>
                          {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
                        </Badge>
                      )}
                    </div>

                    {/* Dark Mode */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Dark Mode
                        </label>
                        <p className="text-xs text-gray-500 mt-1">Switch to dark theme</p>
                      </div>
                      {editMode.preferences ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.darkMode}
                            onChange={(e) => handleInputChange('preferences', 'darkMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      ) : (
                        <Badge variant={profile.preferences.darkMode ? 'success' : 'secondary'}>
                          {profile.preferences.darkMode ? 'On' : 'Off'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                      <Badge variant={activity.status === 'confirmed' ? 'success' : activity.status === 'pending' ? 'warning' : 'secondary'}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

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
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                          passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-300'
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
                    {passwordErrors.currentPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {passwordErrors.currentPassword}
                      </p>
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
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                          passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'
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
                    {passwordErrors.newPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {passwordErrors.newPassword}
                      </p>
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
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                          passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
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
                    {passwordErrors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {passwordErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                    <ul className="space-y-1">
                      {[
                        { check: passwordData.newPassword.length >= 8, text: 'At least 8 characters' },
                        { check: /[a-z]/.test(passwordData.newPassword), text: 'One lowercase letter' },
                        { check: /[A-Z]/.test(passwordData.newPassword), text: 'One uppercase letter' },
                        { check: /\d/.test(passwordData.newPassword), text: 'One number' },
                        { check: /[@$!%*?&]/.test(passwordData.newPassword), text: 'One special character (@$!%*?&)' }
                      ].map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs">
                          <span className={req.check ? 'text-green-600' : 'text-gray-400'}>
                            {req.check ? '✓' : '○'}
                          </span>
                          <span className={req.check ? 'text-green-600' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handlePasswordChange}
                    disabled={changingPassword}
                  >
                    {changingPassword ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Changing...
                      </span>
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
    </div>
  );
};

export default Profile;