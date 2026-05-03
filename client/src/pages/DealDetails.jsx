// /src/pages/DealDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Calendar, Users, Clock, 
  ChevronLeft, ChevronRight, Heart, Share2,
  Percent, Timer, Award, Shield, Check, X,
  Phone, AlertCircle, Tag
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { DEALS } from '../sections/deals/DealsCarousel';

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' }
  ];

  return (
    <div className="flex items-center gap-2">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-orange-100 rounded-lg px-3 py-2 min-w-[60px]">
            <span className="text-2xl font-bold text-orange-600">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-gray-600 mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-96">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-4 bg-orange-600'
                  : 'bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="warning" className="bg-orange-500 text-white border-0 shadow-lg">
            <Percent className="w-3 h-3 mr-1" />
            Limited Time Offer
          </Badge>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'ring-2 ring-orange-600 scale-105' 
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
    </Card>
  );
};

const DealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Find the deal by ID
    const foundDeal = DEALS.find(d => d.id === id);
    if (foundDeal) {
      setDeal(foundDeal);
    }
    setLoading(false);
  }, [id]);

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleBookNow = () => {
    navigate(`/booking`, { 
      state: { 
        item: deal, 
        type: 'deal',
        travelers,
        date: selectedDate
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading deal details...</p>
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
          <p className="text-gray-600 mb-6">
            The deal you're looking for has expired or doesn't exist.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Browse Other Deals
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
          <button onClick={() => navigate('/')} className="hover:text-orange-600">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/deals')} className="hover:text-orange-600">Deals</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{deal.title}</span>
        </div>

        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Limited Time Offer!</h3>
                <p className="text-sm opacity-90">Hurry! This deal ends in</p>
              </div>
            </div>
            <CountdownTimer targetDate={deal.validUntil} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <ImageGallery images={deal.images} title={deal.title} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-orange-200">
              <div className="p-6">
                {/* Title & Rating */}
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{deal.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{deal.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{deal.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({deal.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Special Deal Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-orange-600">
                      {formatPrice(deal.price)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(deal.originalPrice)}
                    </span>
                  </div>
                  <div className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Save {formatPrice(deal.originalPrice - deal.price)} ({deal.discount}% OFF)
                  </div>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{deal.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Valid until {new Date(deal.validUntil).toLocaleDateString('en-US', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                </div>

                {/* Travelers Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* Total Price */}
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Base Price ({travelers} {travelers === 1 ? 'person' : 'persons'}):</span>
                    <span className="font-semibold">{formatPrice(deal.price * travelers)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Taxes & Fees:</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t border-orange-200 mt-2 pt-2 flex items-center justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">
                      {formatPrice(deal.price * travelers)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                  className="mb-3 bg-orange-600 hover:bg-orange-700"
                >
                  Book Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Secure Booking</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">24/7 Support</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Deal Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About the Deal</h2>
                  <p className="text-gray-700 leading-relaxed">{deal.longDescription}</p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {deal.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="bg-green-100 rounded-full p-1 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions & Exclusions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-green-600 mb-3">Inclusions</h3>
                    <div className="space-y-2">
                      {deal.inclusions.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-600 mb-3">Exclusions</h3>
                    <div className="space-y-2">
                      {deal.exclusions.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-6">
                  <h3 className="font-bold text-gray-900 mb-3">Terms & Conditions</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {deal.terms.map((term, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why Book With Us */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Why Book With Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Best Price Guarantee</p>
                      <p className="text-sm text-gray-600">We match any lower price</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Secure Payments</p>
                      <p className="text-sm text-gray-600">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">24/7 Support</p>
                      <p className="text-sm text-gray-600">We're here to help anytime</p>
                    </div>
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

export default DealDetails;