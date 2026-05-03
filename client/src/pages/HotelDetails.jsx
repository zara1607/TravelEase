// /src/pages/HotelDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Heart, Share2, Calendar, Users, Clock,
  Check, X, ChevronLeft, ChevronRight, Wifi, Coffee,
  Dumbbell, Waves, Utensils, Car, Briefcase, Wind,
  Bath, Award, Shield, Phone, Mail, Info, AlertCircle,
  Home, DollarSign, Sun, Umbrella, Sparkles, ParkingCircle
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { HOTELS_DATA } from '../data/hotelsData';

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative rounded-2xl overflow-hidden bg-gray-100">
        <div className="relative h-96 cursor-pointer" onClick={() => setShowFullscreen(true)}>
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-blue-600 scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setShowFullscreen(false)}
          >
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <img
              src={images[currentIndex]}
              alt={`${title} - Fullscreen`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Amenity Icon Mapper
const getAmenityIcon = (amenity) => {
  if (amenity.includes('WiFi')) return <Wifi className="w-5 h-5" />;
  if (amenity.includes('Pool')) return <Waves className="w-5 h-5" />;
  if (amenity.includes('Spa')) return <Sparkles className="w-5 h-5" />;
  if (amenity.includes('Fitness') || amenity.includes('Gym')) return <Dumbbell className="w-5 h-5" />;
  if (amenity.includes('Restaurant')) return <Utensils className="w-5 h-5" />;
  if (amenity.includes('Bar')) return <Coffee className="w-5 h-5" />;
  if (amenity.includes('Shuttle')) return <Car className="w-5 h-5" />;
  if (amenity.includes('Business')) return <Briefcase className="w-5 h-5" />;
  if (amenity.includes('Parking')) return <ParkingCircle className="w-5 h-5" />;
  if (amenity.includes('Breakfast')) return <Coffee className="w-5 h-5" />;
  if (amenity.includes('Room')) return <Home className="w-5 h-5" />;
  return <Check className="w-5 h-5" />;
};

// Booking Modal Component
const BookingModal = ({ hotel, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomType: hotel.roomTypes[0],
    specialRequests: ''
  });

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const nights = calculateNights();
  const totalPrice = hotel.pricePerNight * nights;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Process booking
      alert(`Booking confirmed at ${hotel.name}! Check your email for details.`);
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
            <h2 className="text-2xl font-bold text-gray-900">Book {hotel.name}</h2>
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
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Guest Information</h3>
                
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />

                <h3 className="font-semibold text-gray-900 pt-4">Booking Details</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Room Type</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {hotel.roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Special Requests</label>
                  <textarea
                    placeholder="Any special requests or requirements..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Review Your Booking</h3>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Hotel Details</h4>
                  <p className="text-sm font-semibold">{hotel.name}</p>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-sm text-gray-600">{formData.roomType}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Guest Information</h4>
                  <p className="text-sm">{formData.name}</p>
                  <p className="text-sm">{formData.email}</p>
                  <p className="text-sm">{formData.phone}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Stay Details</h4>
                  <p className="text-sm">Check-in: {formData.checkIn}</p>
                  <p className="text-sm">Check-out: {formData.checkOut}</p>
                  <p className="text-sm">{formData.guests} guests</p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>${hotel.pricePerNight} x {nights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-xl text-blue-600">${totalPrice}</span>
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

// Main Hotel Details Component
const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const foundHotel = HOTELS_DATA.find(h => h.id === id);
    if (foundHotel) {
      setHotel(foundHotel);
    }
    setLoading(false);
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/hotel/${id}`);
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
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">
            The hotel you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => navigate('/hotels')}>
            Browse Hotels
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
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/hotels')} className="hover:text-blue-600">Hotels</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{hotel.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={hotel.images} title={hotel.name} />

            {/* Hotel Info */}
            <Card>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                    <span className="text-sm text-gray-500">({hotel.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="primary" className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {hotel.starRating} Star Hotel
                  </Badge>
                  <Badge variant="success" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {hotel.availableRooms} Rooms Available
                  </Badge>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{hotel.longDescription || hotel.description}</p>
                </div>
              </div>
            </Card>

            {/* Amenities */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-blue-600">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Room Types */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Room Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.roomTypes.map((room, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900">{room}</h4>
                      <p className="text-sm text-gray-500 mt-1">Starting from ${hotel.pricePerNight}/night</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Policies */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Hotel Policies</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{hotel.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{hotel.checkOut}</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Free cancellation up to 24 hours before check-in. 
                    Please review the hotel's specific cancellation policy.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Price per night</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">${hotel.pricePerNight}</span>
                    <span className="text-sm text-gray-500">+ taxes</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Check-in: {hotel.checkIn}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Check-out: {hotel.checkOut}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>Up to {hotel.roomTypes.length} guests per room</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> 24/7 Support
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
          hotel={hotel} 
          onClose={() => setShowBookingModal(false)} 
        />
      )}
    </div>
  );
};

export default HotelDetails;