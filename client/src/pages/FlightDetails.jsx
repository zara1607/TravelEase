// /src/pages/FlightDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plane, Calendar, Users, Clock, MapPin, Briefcase,
  Wifi, Coffee, Film, Battery, Award, Shield,
  ChevronLeft, Star, AlertCircle, X, Luggage,
  CreditCard, DollarSign, Phone, Mail, Info
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { FLIGHTS_DATA } from '../data/flightsData';

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    // Find flight by ID
    const foundFlight = FLIGHTS_DATA.find(f => f.id === id);
    if (foundFlight) {
      setFlight(foundFlight);
    }
    setLoading(false);
  }, [id]);

  const formatPrice = (price) => `$${price.toLocaleString()}`;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/flight/${id}`);
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flight details...</p>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Flight Not Found</h2>
          <p className="text-gray-600 mb-6">
            The flight you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/flights')}>
            Browse Flights
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <ChevronLeft className="w-4 h-4" />
          <button onClick={() => navigate('/flights')} className="hover:text-blue-600">Flights</button>
          <ChevronLeft className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{flight.flightNumber}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Flight Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Airline Header */}
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
                    {flight.logo}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{flight.airline}</h1>
                    <p className="text-gray-600">{flight.flightNumber} • {flight.aircraft}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant={flight.refundable ? 'success' : 'secondary'} className="flex items-center gap-1">
                      {flight.refundable ? 'Free Cancellation' : 'Non-refundable'}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Flight Route */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  {/* Departure */}
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{flight.from.time}</p>
                    <p className="text-xl font-semibold text-gray-700">{flight.from.code}</p>
                    <p className="text-gray-500">{flight.from.city}</p>
                    <p className="text-sm text-gray-400 mt-1">Terminal {flight.from.terminal}</p>
                  </div>
                  
                  {/* Flight Path */}
                  <div className="flex-1 px-8">
                    <div className="relative">
                      <div className="border-t-2 border-gray-300 border-dashed"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-md">
                        <Plane className="w-5 h-5 text-blue-600 transform rotate-90" />
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-semibold text-gray-700">{flight.duration}</p>
                      <Badge variant={flight.stops === 'Non-stop' ? 'success' : 'warning'} className="mt-1">
                        {flight.stops}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Arrival */}
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{flight.to.time}</p>
                    <p className="text-xl font-semibold text-gray-700">{flight.to.code}</p>
                    <p className="text-gray-500">{flight.to.city}</p>
                    <p className="text-sm text-gray-400 mt-1">Terminal {flight.to.terminal}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card>
              <div className="border-b border-gray-200">
                <div className="flex px-6">
                  {['details', 'amenities', 'fare', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-4 font-medium text-sm capitalize border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Flight Number</p>
                        <p className="font-medium">{flight.flightNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Aircraft</p>
                        <p className="font-medium">{flight.aircraft}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Class</p>
                        <p className="font-medium">{flight.class}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(flight.date).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Baggage Allowance</p>
                      <div className="flex gap-4">
                        <Badge variant="secondary">Cabin: {flight.baggage.cabin}</Badge>
                        <Badge variant="secondary">Check-in: {flight.baggage.checkIn}</Badge>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'amenities' && (
                  <div className="grid grid-cols-2 gap-4">
                    {flight.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {amenity.includes('Wi-Fi') && <Wifi className="w-5 h-5 text-blue-600" />}
                        {amenity.includes('Meal') && <Coffee className="w-5 h-5 text-blue-600" />}
                        {amenity.includes('Entertainment') && <Film className="w-5 h-5 text-blue-600" />}
                        {amenity.includes('USB') && <Battery className="w-5 h-5 text-blue-600" />}
                        {amenity.includes('Champagne') && <Award className="w-5 h-5 text-blue-600" />}
                        {!amenity.includes('Wi-Fi') && !amenity.includes('Meal') && 
                         !amenity.includes('Entertainment') && !amenity.includes('USB') && 
                         !amenity.includes('Champagne') && <Info className="w-5 h-5 text-blue-600" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'fare' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Base Fare</p>
                        <p className="text-lg font-semibold">{formatPrice(flight.price)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Taxes & Fees</p>
                        <p className="text-lg font-semibold">Included</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">You Save</p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatPrice(flight.originalPrice - flight.price)}
                        </p>
                      </div>
                      <Badge variant="success" className="text-sm">
                        {flight.discount}
                      </Badge>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-2">Rating: {flight.rating}/5</p>
                    <p className="text-gray-500">{flight.reviews} traveler reviews</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">{formatPrice(flight.price)}</span>
                    <span className="text-sm text-gray-500 line-through">{formatPrice(flight.originalPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">per adult • taxes included</p>
                  <Badge variant="danger" className="mt-2 bg-red-100 text-red-700">
                    {flight.discount}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(flight.date).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{flight.seatsLeft} seats left</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Luggage className="w-4 h-4 text-gray-400" />
                    <span>{flight.baggage.checkIn} checked baggage</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={handleBookNow}
                >
                  Book Flight
                </Button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> EMI Available
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal 
          flight={flight} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
    </div>
  );
};

// Booking Modal Component
const BookingModal = ({ flight, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    passengers: [{
      name: '',
      email: '',
      phone: '',
      age: '',
      seat: ''
    }],
    addons: {
      extraBaggage: false,
      mealPreference: false,
      travelInsurance: false
    }
  });

  const seats = ['12A', '12B', '12C', '14A', '14B', '14C', '15A', '15B', '15C', '16A', '16B', '16C'];

  const handleAddPassenger = () => {
    setFormData({
      ...formData,
      passengers: [...formData.passengers, {
        name: '',
        email: '',
        phone: '',
        age: '',
        seat: ''
      }]
    });
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index][field] = value;
    setFormData({ ...formData, passengers: newPassengers });
  };

  const calculateTotal = () => {
    let total = flight.price * formData.passengers.length;
    if (formData.addons.extraBaggage) total += 50 * formData.passengers.length;
    if (formData.addons.mealPreference) total += 30 * formData.passengers.length;
    if (formData.addons.travelInsurance) total += 25 * formData.passengers.length;
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Process booking
      alert('Booking confirmed! Check your email for details.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Booking</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full mb-8">
            <div
              className="absolute h-2 bg-blue-600 rounded-full transition-all"
              style={{ width: `${step * 50}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Passenger Details</h3>
                
                {formData.passengers.map((passenger, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Passenger {index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newPassengers = formData.passengers.filter((_, i) => i !== index);
                            setFormData({ ...formData, passengers: newPassengers });
                          }}
                          className="text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    
                    <input
                      type="email"
                      placeholder="Email"
                      value={passenger.email}
                      onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={passenger.phone}
                      onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    
                    <input
                      type="number"
                      placeholder="Age"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    
                    <select
                      value={passenger.seat}
                      onChange={(e) => handlePassengerChange(index, 'seat', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Seat</option>
                      {seats.map(seat => (
                        <option key={seat} value={seat}>{seat}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddPassenger}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  + Add Another Passenger
                </button>

                <h3 className="font-semibold text-gray-900 pt-4">Add-ons</h3>
                
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.addons.extraBaggage}
                      onChange={(e) => setFormData({
                        ...formData,
                        addons: { ...formData.addons, extraBaggage: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    <span>Extra Baggage (+$50 per person)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.addons.mealPreference}
                      onChange={(e) => setFormData({
                        ...formData,
                        addons: { ...formData.addons, mealPreference: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    <span>Meal Preference (+$30 per person)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={formData.addons.travelInsurance}
                      onChange={(e) => setFormData({
                        ...formData,
                        addons: { ...formData.addons, travelInsurance: e.target.checked }
                      })}
                      className="rounded text-blue-600"
                    />
                    <span>Travel Insurance (+$25 per person)</span>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Review Your Booking</h3>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Flight Details</h4>
                  <p className="text-sm">{flight.airline} • {flight.flightNumber}</p>
                  <p className="text-sm">{flight.from.city} → {flight.to.city}</p>
                  <p className="text-sm">{flight.from.time} - {flight.to.time}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Passengers</h4>
                  {formData.passengers.map((p, i) => (
                    <p key={i} className="text-sm">{p.name} • Seat {p.seat}</p>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Add-ons</h4>
                  {formData.addons.extraBaggage && <p className="text-sm">✓ Extra Baggage</p>}
                  {formData.addons.mealPreference && <p className="text-sm">✓ Meal Preference</p>}
                  {formData.addons.travelInsurance && <p className="text-sm">✓ Travel Insurance</p>}
                  {!formData.addons.extraBaggage && !formData.addons.mealPreference && !formData.addons.travelInsurance && (
                    <p className="text-sm text-gray-500">No add-ons selected</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Base Fare ({formData.passengers.length} passenger{formData.passengers.length > 1 ? 's' : ''})</span>
                    <span>${flight.price * formData.passengers.length}</span>
                  </div>
                  {formData.addons.extraBaggage && (
                    <div className="flex justify-between text-sm">
                      <span>Extra Baggage</span>
                      <span>+${50 * formData.passengers.length}</span>
                    </div>
                  )}
                  {formData.addons.mealPreference && (
                    <div className="flex justify-between text-sm">
                      <span>Meal Preference</span>
                      <span>+${30 * formData.passengers.length}</span>
                    </div>
                  )}
                  {formData.addons.travelInsurance && (
                    <div className="flex justify-between text-sm">
                      <span>Travel Insurance</span>
                      <span>+${25 * formData.passengers.length}</span>
                    </div>
                  )}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl text-blue-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
              >
                {step === 2 ? 'Confirm Booking' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightDetails;