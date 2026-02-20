import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, MapPin, Star, Clock, CreditCard,
  Check, ChevronRight, Plane, Hotel, Package, Car,
  Shield, Phone, Mail, AlertCircle, ArrowLeft,
  Wallet, Landmark, Smartphone, Coffee, Wifi,
  Briefcase, Heart, Download
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { useBooking } from '../hooks/useBooking';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { restoreBookingIntent } = useBooking();
  
  const [bookingData, setBookingData] = useState({
    type: 'package',
    item: null
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: '',
    emergencyContact: ''
  });

  const [travelers, setTravelers] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Load user data and booking intent
  useEffect(() => {
    // Check for stored booking intent (for after login)
    const intent = restoreBookingIntent();
    
    // Get data from navigation state or intent
    const stateData = location.state?.item || intent?.item;
    const stateType = location.state?.type || intent?.type || 'package';

    if (stateData) {
      setBookingData({
        type: stateType,
        item: stateData
      });
    } else {
      // If no data, redirect to home
      toast.error('No booking data found');
      navigate('/');
    }
  }, [location.state, navigate, restoreBookingIntent]);

  // Set form data from user profile
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(' ') || [];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        specialRequests: '',
        emergencyContact: user.phone || ''
      });
    }
  }, [user]);

  // Initialize travelers
  useEffect(() => {
    const count = bookingData.item?.travelers || 2;
    setTravelers(Array(count).fill().map((_, i) => ({
      id: i + 1,
      name: '',
      age: '',
      passport: ''
    })));
  }, [bookingData.item?.travelers]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index][field] = value;
    setTravelers(updatedTravelers);
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone || !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    for (let i = 0; i < travelers.length; i++) {
      if (!travelers[i].name || !travelers[i].age) {
        toast.error(`Please fill details for traveler ${i + 1}`);
        return false;
      }
    }
    if (!agreeToTerms) {
      toast.error('Please agree to terms and conditions');
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateStep1()) {
      setBookingStep(2);
    }
  };

  const handleConfirmBooking = async () => {
    setProcessingPayment(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make API call to create booking
      const bookingId = 'BK' + Date.now();
      
      toast.success('Booking confirmed successfully!');
      navigate('/booking-confirmation', {
        state: {
          bookingId,
          ...bookingData,
          travelers,
          totalAmount: calculateTotal()
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = bookingData.item?.price || bookingData.item?.pricing?.discountedPrice || 0;
    const travelerCount = bookingData.item?.travelers || travelers.length;
    return basePrice * travelerCount;
  };

  const formatPrice = (price) => {
    return `₹${price?.toLocaleString('en-IN') || '0'}`;
  };

  const getItemIcon = () => {
    switch(bookingData.type) {
      case 'flight': return Plane;
      case 'hotel': return Hotel;
      case 'package': return Package;
      default: return Package;
    }
  };

  const getTypeColor = () => {
    switch(bookingData.type) {
      case 'flight': return 'blue';
      case 'hotel': return 'green';
      case 'package': return 'purple';
      default: return 'blue';
    }
  };

  if (!bookingData.item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const ItemIcon = getItemIcon();
  const typeColor = getTypeColor();
  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { step: 1, label: 'Details', icon: Users },
              { step: 2, label: 'Payment', icon: CreditCard }
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    bookingStep >= s.step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {bookingStep > s.step ? <Check className="w-5 h-5" /> : s.step}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    bookingStep >= s.step ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                  {s.step < 2 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {bookingStep === 1 ? (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Traveler Details</h2>
                  
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          placeholder="Alternative phone number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Traveler Details */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Traveler Details</h3>
                      {travelers.map((traveler, index) => (
                        <div key={traveler.id} className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-700 mb-3">Traveler {index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Full Name *</label>
                              <input
                                type="text"
                                value={traveler.name}
                                onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="As on passport"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Age *</label>
                              <input
                                type="number"
                                value={traveler.age}
                                onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                                max="120"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Passport Number</label>
                              <input
                                type="text"
                                value={traveler.passport}
                                onChange={(e) => handleTravelerChange(index, 'passport', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Special Requests */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Special Requests</h3>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Any special requirements (dietary restrictions, accessibility needs, etc.)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Terms */}
                    <div className="border-t border-gray-200 pt-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={(e) => setAgreeToTerms(e.target.checked)}
                          className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                          , and confirm that the information provided is accurate.
                        </span>
                      </label>
                    </div>

                    {/* Proceed Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleProceedToPayment}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                  
                  <div className="space-y-6">
                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'card', name: 'Card', icon: CreditCard },
                        { id: 'upi', name: 'UPI', icon: Smartphone },
                        { id: 'netbanking', name: 'NetBanking', icon: Landmark }
                      ].map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                              paymentMethod === method.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${
                              paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                            <span className={`text-sm font-medium ${
                              paymentMethod === method.id ? 'text-blue-600' : 'text-gray-700'
                            }`}>
                              {method.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="As on card"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* UPI */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            placeholder="username@okhdfcbank"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Or scan QR code</p>
                          <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center">
                            <Smartphone className="w-8 h-8 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* NetBanking */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra</option>
                        </select>
                      </div>
                    )}

                    {/* Confirm Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleConfirmBooking}
                      disabled={processingPayment}
                    >
                      {processingPayment ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Pay ${formatPrice(totalAmount)}`
                      )}
                    </Button>

                    {/* Back Button */}
                    <button
                      onClick={() => setBookingStep(1)}
                      className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      ← Back to details
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                
                {/* Item Details */}
                <div className="flex gap-3 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={bookingData.item.image || bookingData.item.images?.[0]?.url}
                      alt={bookingData.item.title || bookingData.item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">
                      {bookingData.item.title || bookingData.item.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {bookingData.item.destination?.city || 
                         bookingData.item.location || 
                         bookingData.item.to || 
                         'Destination'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant={typeColor} size="sm" className="capitalize">
                        <ItemIcon className="w-3 h-3 mr-1" />
                        {bookingData.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-2 text-sm border-t border-gray-200 pt-4 mb-4">
                  {bookingData.type === 'package' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="text-gray-900 font-medium">
                          {bookingData.item.duration?.days || bookingData.item.days}D / 
                          {bookingData.item.duration?.nights || bookingData.item.nights}N
                        </span>
                      </div>
                    </>
                  )}
                  
                  {bookingData.type === 'flight' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flight</span>
                        <span className="text-gray-900 font-medium">
                          {bookingData.item.airline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route</span>
                        <span className="text-gray-900 font-medium">
                          {bookingData.item.from} → {bookingData.item.to}
                        </span>
                      </div>
                    </>
                  )}

                  {bookingData.type === 'hotel' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="text-gray-900 font-medium">
                        {bookingData.item.checkIn || '14:00'}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers</span>
                    <span className="text-gray-900 font-medium">
                      {travelers.length} {travelers.length === 1 ? 'Traveler' : 'Travelers'}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Base Price ({formatPrice(bookingData.item.price || bookingData.item.pricing?.discountedPrice)} × {travelers.length})
                      </span>
                      <span className="text-gray-900">{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="text-green-600">Included</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {bookingData.item.highlights && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Highlights</h4>
                    <div className="flex flex-wrap gap-1">
                      {bookingData.item.highlights.slice(0, 3).map((h, i) => (
                        <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions */}
                {bookingData.item.inclusions && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Inclusions</h4>
                    <div className="flex flex-wrap gap-1">
                      {bookingData.item.inclusions.slice(0, 4).map((inc, i) => (
                        <Badge key={i} variant="secondary" size="sm" className="bg-green-50 text-green-700">
                          <Check className="w-3 h-3 mr-1" />
                          {inc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded-lg text-center">
                    <Shield className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Secure Payment</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg text-center">
                    <Phone className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">24/7 Support</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>Free cancellation up to 24 hours before travel</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;