import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaClock, FaUtensils, FaHotel, FaBus, FaCamera, FaCheck, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import BookingForm from './BookingForm';

const PackageDetails = ({ package: pkg, onBookNow }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pkg.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pkg.gallery.length) % pkg.gallery.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <FaChevronLeft className="mr-2" />
        Back to Packages
      </button>

      {/* Image Gallery */}
      <div className="relative mb-8 rounded-2xl overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          <img
            src={pkg.gallery[currentImageIndex]}
            alt={`${pkg.name} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          >
            <FaChevronRight className="text-gray-800" />
          </button>
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {pkg.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
          
          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 right-4 hidden md:flex gap-2">
            {pkg.gallery.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-blue-600 scale-110'
                    : 'border-white/50 hover:border-white'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {pkg.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-1" />
              <span className="text-gray-600">{pkg.destination}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="text-green-600 mr-1" />
              <span className="text-gray-600">{pkg.duration}</span>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold">{pkg.rating}</span>
              <span className="text-gray-500 ml-1">({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 text-right">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">${pkg.price}</span>
            <span className="text-gray-500">/ person</span>
          </div>
          {pkg.originalPrice && (
            <div className="text-gray-400 line-through">${pkg.originalPrice}</div>
          )}
          {pkg.discount && (
            <Badge variant="success" className="mt-1">
              Save {pkg.discount}%
            </Badge>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          {['overview', 'itinerary', 'inclusions', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 capitalize font-medium transition-all ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-3">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <FaCamera className="text-blue-600 mr-3" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Day-by-Day Itinerary</h2>
              {pkg.itinerary.map((day, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl font-bold text-blue-600">D{day.day}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCheck className="text-green-600 mr-2" />
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheck className="text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaTimes className="text-red-600 mr-2" />
                  What's Not Included
                </h2>
                <ul className="space-y-3">
                  {pkg.excludes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <FaTimes className="text-red-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8 text-gray-500">
              Reviews section coming soon...
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          {!showBookingForm ? (
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Why Book This Package?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <FaCheck className="text-green-600 mr-2" />
                  Best price guarantee
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-600 mr-2" />
                  Free cancellation
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-600 mr-2" />
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-600 mr-2" />
                  Secure payments
                </li>
              </ul>
              
              <Button
                variant="primary"
                className="w-full py-3 text-lg mb-3"
                onClick={() => setShowBookingForm(true)}
              >
                Book Now
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Don't worry, you can cancel later
              </p>
            </div>
          ) : (
            <BookingForm
              package={pkg}
              onClose={() => setShowBookingForm(false)}
              onSubmit={onBookNow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;