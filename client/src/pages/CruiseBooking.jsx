import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, Calendar, Users, Clock, CreditCard,
  ChevronLeft, ChevronRight, CheckCircle, X,
  Shield, Award, MapPin, Star, Heart,
  Wifi, Coffee, Utensils, Dumbbell, Waves,
  Umbrella, Gift, Download, Mail, Phone,
  AlertCircle, RefreshCw, Plus, Minus,
  Luggage, Briefcase, Home, Car, Camera
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

const CruiseBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [cruise, setCruise] = useState(location.state?.cruise || null);
  const [loading, setLoading] = useState(!location.state?.cruise);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  
  // Booking state
  const [cabinType, setCabinType] = useState('balcony');
  const [passengers, setPassengers] = useState(2);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [addons, setAddons] = useState({
    drinks: false,
    specialtyDining: false,
    shoreExcursions: false,
    spa: false,
    wifi: false,
    gratuities: true
  });
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [saveCard, setSaveCard] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Availability state
  const [availability, setAvailability] = useState({
    interior: 8,
    oceanview: 6,
    balcony: 4,
    suite: 2
  });

  useEffect(() => {
    if (!cruise) {
      fetchCruiseDetails();
    } else {
      initializePassengerDetails();
    }
  }, [cruise]);

  const fetchCruiseDetails = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock cruise data - in production, fetch from API
      const mockCruise = {
        id: 'CR001',
        name: 'Caribbean Paradise',
        ship: 'Symphony of the Seas',
        line: 'Royal Caribbean',
        destination: 'Caribbean',
        departurePort: 'Miami, Florida',
        route: ['Miami', 'Nassau', 'CocoCay', 'Miami'],
        duration: '7 nights',
        departureDate: '2024-04-15',
        returnDate: '2024-04-22',
        price: 1299,
        cabins: {
          interior: { price: 899, amenities: ['Twin Beds', 'TV', 'Private Bath'] },
          oceanview: { price: 1099, amenities: ['Ocean View', 'Twin Beds', 'TV', 'Private Bath'] },
          balcony: { price: 1299, amenities: ['Private Balcony', 'Queen Bed', 'TV', 'Private Bath'] },
          suite: { price: 2499, amenities: ['Large Balcony', 'King Bed', 'Living Area', 'Jacuzzi'] }
        },
        images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80']
      };
      setCruise(mockCruise);
      initializePassengerDetails();
    } catch (error) {
      console.error('Error fetching cruise:', error);
      toast.error('Failed to load cruise details');
      navigate('/cruises');
    } finally {
      setLoading(false);
    }
  };

  const initializePassengerDetails = () => {
    const details = [];
    for (let i = 0; i < passengers; i++) {
      details.push({
        id: i + 1,
        firstName: '',
        lastName: '',
        age: '',
        passport: '',
        specialRequests: ''
      });
    }
    setPassengerDetails(details);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleAddonToggle = (addon) => {
    setAddons(prev => ({ ...prev, [addon]: !prev[addon] }));
  };

  const calculateSubtotal = () => {
    const basePrice = cruise.cabins[cabinType].price * passengers;
    return basePrice;
  };

  const calculateAddonsTotal = () => {
    let total = 0;
    if (addons.drinks) total += 299 * passengers;
    if (addons.specialtyDining) total += 149 * passengers;
    if (addons.shoreExcursions) total += 399 * passengers;
    if (addons.spa) total += 199 * passengers;
    if (addons.wifi) total += 89 * passengers;
    return total;
  };

  const calculateTaxes = () => {
    const subtotal = calculateSubtotal() + calculateAddonsTotal();
    return Math.round(subtotal * 0.12); // 12% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateAddonsTotal() + calculateTaxes();
  };

  const validateStep1 = () => {
    if (!cabinType) {
      toast.error('Please select a cabin type');
      return false;
    }
    
    for (let i = 0; i < passengerDetails.length; i++) {
      const p = passengerDetails[i];
      if (!p.firstName || !p.lastName || !p.age) {
        toast.error(`Please fill details for passenger ${i + 1}`);
        return false;
      }
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      toast.error('Please fill all card details');
      return false;
    }
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleBooking = async () => {
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update availability
      setAvailability(prev => ({
        ...prev,
        [cabinType]: prev[cabinType] - 1
      }));

      // Generate booking
      const booking = {
        id: 'CRB' + Date.now(),
        cruiseId: cruise.id,
        cruiseName: cruise.name,
        ship: cruise.ship,
        cabinType,
        passengers,
        passengerDetails,
        addons,
        totalAmount: calculateTotal(),
        bookingDate: new Date().toISOString(),
        departureDate: cruise.departureDate,
        status: 'confirmed',
        paymentMethod
      };

      // Save to localStorage (in production, send to API)
      const existingBookings = JSON.parse(localStorage.getItem('cruiseBookings') || '[]');
      localStorage.setItem('cruiseBookings', JSON.stringify([...existingBookings, booking]));

      // Generate and download invoice
      generateInvoice(booking);

      // Send confirmation email (simulated)
      toast.success('Booking confirmation sent to your email');

      // Navigate to confirmation
      navigate('/booking-confirmation', {
        state: { booking, type: 'cruise' }
      });
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const generateInvoice = (booking) => {
    const invoice = {
      ...booking,
      invoiceNumber: 'INV-' + Date.now(),
      companyDetails: {
        name: 'TravelEase Cruises',
        address: '123 Cruise Terminal, Miami, FL 33101',
        phone: '+1 800 123 4567',
        email: 'cruises@travelease.com'
      }
    };

    const blob = new Blob([JSON.stringify(invoice, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${booking.id}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Cruises
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= s ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Payment' : 'Confirm'}
                </span>
                {s < 3 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                {/* Step 1: Cruise Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Select Your Cruise Details</h2>
                    
                    {/* Cabin Selection */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Choose Cabin Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(cruise.cabins).map(([type, details]) => {
                          const isAvailable = availability[type] > 0;
                          const isSelected = cabinType === type;
                          
                          return (
                            <button
                              key={type}
                              onClick={() => isAvailable && setCabinType(type)}
                              disabled={!isAvailable}
                              className={`p-4 border-2 rounded-lg text-left transition-all ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50'
                                  : isAvailable
                                    ? 'border-gray-200 hover:border-blue-300'
                                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold capitalize">{type} Cabin</span>
                                {isAvailable && (
                                  <Badge variant={availability[type] <= 2 ? 'warning' : 'success'} size="sm">
                                    {availability[type]} left
                                  </Badge>
                                )}
                              </div>
                              <p className="text-2xl font-bold text-blue-600">${details.price}</p>
                              <p className="text-xs text-gray-500">per person</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Passenger Details */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Passenger Details</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (passengers > 1) {
                                setPassengers(passengers - 1);
                                setPassengerDetails(prev => prev.slice(0, -1));
                              }
                            }}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium">{passengers}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (passengers < 6) {
                                setPassengers(passengers + 1);
                                setPassengerDetails([
                                  ...passengerDetails,
                                  { id: passengers + 1, firstName: '', lastName: '', age: '', passport: '' }
                                ]);
                              }
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {passengerDetails.map((passenger, index) => (
                        <div key={passenger.id} className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-3">Passenger {index + 1}</h4>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">First Name</label>
                              <input
                                type="text"
                                value={passenger.firstName}
                                onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                              <input
                                type="text"
                                value={passenger.lastName}
                                onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Age</label>
                              <input
                                type="number"
                                value={passenger.age}
                                onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Passport Number (Optional)</label>
                              <input
                                type="text"
                                value={passenger.passport}
                                onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add-ons */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Enhance Your Experience</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          addons.drinks ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="checkbox"
                            checked={addons.drinks}
                            onChange={() => handleAddonToggle('drinks')}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <Coffee className={`w-5 h-5 ${addons.drinks ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium">Premium Drinks</p>
                              <p className="text-sm text-gray-500">$299 per person</p>
                            </div>
                          </div>
                        </label>

                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          addons.specialtyDining ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="checkbox"
                            checked={addons.specialtyDining}
                            onChange={() => handleAddonToggle('specialtyDining')}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <Utensils className={`w-5 h-5 ${addons.specialtyDining ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium">Specialty Dining</p>
                              <p className="text-sm text-gray-500">$149 per person</p>
                            </div>
                          </div>
                        </label>

                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          addons.shoreExcursions ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="checkbox"
                            checked={addons.shoreExcursions}
                            onChange={() => handleAddonToggle('shoreExcursions')}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <Camera className={`w-5 h-5 ${addons.shoreExcursions ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium">Shore Excursions</p>
                              <p className="text-sm text-gray-500">$399 per person</p>
                            </div>
                          </div>
                        </label>

                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          addons.spa ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="checkbox"
                            checked={addons.spa}
                            onChange={() => handleAddonToggle('spa')}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <Waves className={`w-5 h-5 ${addons.spa ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium">Spa Package</p>
                              <p className="text-sm text-gray-500">$199 per person</p>
                            </div>
                          </div>
                        </label>

                        <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          addons.wifi ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <input
                            type="checkbox"
                            checked={addons.wifi}
                            onChange={() => handleAddonToggle('wifi')}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <Wifi className={`w-5 h-5 ${addons.wifi ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium">Premium Wi-Fi</p>
                              <p className="text-sm text-gray-500">$89 per person</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                    
                    {/* Payment Methods */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {['card', 'paypal', 'applepay'].map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`p-4 border-2 rounded-lg text-center transition-all ${
                            paymentMethod === method
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                            paymentMethod === method ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                          <span className="text-sm font-medium capitalize">
                            {method === 'applepay' ? 'Apple Pay' : method}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <input
                              type="password"
                              placeholder="123"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm text-gray-700">Save card for future bookings</span>
                        </label>
                      </div>
                    )}

                    {/* Terms */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="mt-1 w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                          {' '}and{' '}
                          <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
                          . I confirm that all passenger information is accurate.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Ready to Confirm!
                      </h2>
                      <p className="text-gray-600">
                        Please review your booking details before confirming
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cruise</span>
                          <span className="font-medium">{cruise.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ship</span>
                          <span className="font-medium">{cruise.ship}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cabin Type</span>
                          <span className="font-medium capitalize">{cabinType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Passengers</span>
                          <span className="font-medium">{passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departure</span>
                          <span className="font-medium">{new Date(cruise.departureDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">{cruise.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        By clicking "Confirm Booking", you agree to the cancellation policy and authorize the total amount to be charged.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button variant="outline" onClick={handleBack}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button variant="primary" onClick={handleNext} className="ml-auto">
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={handleBooking}
                      disabled={processing}
                      className="ml-auto"
                    >
                      {processing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Price Summary</h3>
                
                {/* Cruise Image */}
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                  <img
                    src={cruise.images[0]}
                    alt={cruise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-2 left-2 text-white font-semibold text-sm">
                    {cruise.name}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cruise Fare ({passengers} guests)</span>
                    <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                  </div>
                  
                  {calculateAddonsTotal() > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Add-ons</span>
                      <span className="font-medium">${calculateAddonsTotal().toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">${calculateTaxes().toLocaleString()}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>

                {/* Payment Security */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure Payment • 256-bit SSL</span>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Award className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Best Price</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Free Cancellation</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">24/7 Support</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CruiseBooking;