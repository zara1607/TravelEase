// src/pages/Booking.jsx
// Universal booking page for packages, hotels, flights, and tours

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import BookingForm from '../features/bookings/BookingForm';
import PriceSummary from '../features/bookings/PriceSummary';
import PackageSelector from '../features/bookings/PackageSelector';
import FlightDetails from '../features/flights/FlightDetails';
import HotelGallery from '../features/hotels/HotelGallery';
import { PACKAGE_TYPES } from '../lib/packages';
import { getPackageById } from '../data/samplePackages';

const Booking = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  
  // Get base price from the passed data
  const basePrice = bookingData?.basePrice || bookingData?.pricePerNight || bookingData?.price || 0;
  
  // Pricing state
  const [pricingDetails, setPricingDetails] = useState({
    basePrice: basePrice,
    packageType: PACKAGE_TYPES.SIMPLE,
    numberOfNights: 1,
    numberOfRooms: 1,
    numberOfGuests: 1,
    numberOfAdults: 1,
    numberOfChildren: 0,
    checkIn: '',
    checkOut: '',
    departureDate: '',
    serviceFee: 200,
    taxRate: 0.10,
    discountPercent: bookingData?.discount || 0,
  });

  useEffect(() => {
    if (!bookingData && id) {
      fetchBookingItem();
    }
  }, [id, type]);

  useEffect(() => {
    if (bookingData) {
      const price = basePrice;
      const discount = bookingData.discount || 0;
      setPricingDetails(prev => ({
        ...prev,
        basePrice: price,
        discountPercent: discount,
      }));
    }
  }, [bookingData, basePrice]);

  const fetchBookingItem = async () => {
    try {
      setLoading(true);
      
      // For packages, load from sample data
      if (type === 'package') {
        const packageData = getPackageById(id);
        if (packageData) {
          setBookingData({
            ...packageData,
            basePrice: packageData.price,
            pricePerNight: packageData.price,
          });
        }
      } else {
        // For hotels, flights, tours - fetch from API
        const response = await fetch(`/api/${type}s/${id}`);
        const data = await response.json();
        
        const itemWithPrice = {
          ...data,
          basePrice: data.pricePerNight || data.price,
          pricePerNight: data.pricePerNight || data.price,
        };
        
        setBookingData(itemWithPrice);
      }
    } catch (error) {
      console.error('Error fetching booking item:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const handlePackageSelect = useCallback((packageType) => {
    setPricingDetails(prev => ({
      ...prev,
      packageType,
    }));
  }, []);

  const handleRoomsChange = useCallback((rooms) => {
    setPricingDetails(prev => ({
      ...prev,
      numberOfRooms: rooms,
    }));
  }, []);

  const handlePricingUpdate = useCallback((updates) => {
    setPricingDetails(prev => {
      const newDetails = { ...prev, ...updates };
      
      if ((type === 'hotel' || type === 'package') && (updates.checkIn || updates.checkOut)) {
        newDetails.numberOfNights = calculateNights(
          updates.checkIn || prev.checkIn,
          updates.checkOut || prev.checkOut
        );
      }
      
      if (updates.numberOfAdults !== undefined || updates.numberOfChildren !== undefined) {
        newDetails.numberOfGuests = 
          (updates.numberOfAdults ?? prev.numberOfAdults) + 
          (updates.numberOfChildren ?? prev.numberOfChildren);
      }
      
      return newDetails;
    });
  }, [type]);

  const handleBookingSubmit = async (formData) => {
    try {
      const bookingPayload = {
        ...formData,
        itemType: type,
        itemId: id,
        packageType: pricingDetails.packageType,
        numberOfRooms: pricingDetails.numberOfRooms,
        pricingDetails: pricingDetails,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();
      
      if (response.ok) {
        navigate('/dashboard/bookings', { 
          state: { message: 'Booking successful!' } 
        });
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Item not found
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 mt-2">
            You're booking {type === 'package' ? 'a holiday package' : `a ${type}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Item Details Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Package Details */}
              {type === 'package' && bookingData && (
                <div className="p-6">
                  <img
                    src={bookingData.image}
                    alt={bookingData.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">{bookingData.name}</h2>
                      <p className="text-gray-600 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {bookingData.destination}
                      </p>
                    </div>
                    {bookingData.discount > 0 && (
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {bookingData.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{bookingData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium">{bookingData.rating} ({bookingData.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{bookingData.description}</p>

                  {bookingData.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {bookingData.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingData.included && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Package Includes:</h4>
                      <div className="space-y-1">
                        {bookingData.included.map((item, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-blue-800">
                            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Flight Details */}
              {type === 'flight' && bookingData && (
                <FlightDetails flight={bookingData} />
              )}
              
              {/* Hotel Details */}
              {type === 'hotel' && bookingData && (
                <div className="p-6">
                  {bookingData.images && bookingData.images.length > 0 ? (
                    <HotelGallery images={bookingData.images} name={bookingData.name} />
                  ) : bookingData.image ? (
                    <img src={bookingData.image} alt={bookingData.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  ) : null}
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">{bookingData.name}</h2>
                    <p className="text-gray-600 mt-2">{bookingData.location}</p>
                    {bookingData.rating && (
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(bookingData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600">{bookingData.rating} ({bookingData.reviews || 0} reviews)</span>
                      </div>
                    )}
                    {bookingData.description && <p className="text-gray-700 mt-4">{bookingData.description}</p>}
                  </div>
                </div>
              )}

              {/* Tour Details */}
              {type === 'tour' && bookingData && (
                <div className="p-6">
                  {bookingData.image && (
                    <img src={bookingData.image} alt={bookingData.name} className="w-full h-64 object-cover rounded-lg" />
                  )}
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">{bookingData.name}</h2>
                    <p className="text-gray-600 mt-2">{bookingData.location}</p>
                    <p className="text-gray-700 mt-4">{bookingData.description}</p>
                    <div className="mt-4 flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration: {bookingData.duration}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Package Selector (Hotels and Packages) */}
            {(type === 'hotel' || type === 'package') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <PackageSelector
                  selectedPackage={pricingDetails.packageType}
                  basePrice={pricingDetails.basePrice}
                  onPackageSelect={handlePackageSelect}
                />
              </div>
            )}

            {/* Rooms Selector (Hotels and Packages) */}
            {(type === 'hotel' || type === 'package') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Number of Rooms</h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleRoomsChange(Math.max(1, pricingDetails.numberOfRooms - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
                    disabled={pricingDetails.numberOfRooms <= 1}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-bold text-gray-900">{pricingDetails.numberOfRooms}</div>
                    <div className="text-sm text-gray-600">Room{pricingDetails.numberOfRooms > 1 ? 's' : ''}</div>
                  </div>
                  <button
                    onClick={() => handleRoomsChange(Math.min(10, pricingDetails.numberOfRooms + 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
                    disabled={pricingDetails.numberOfRooms >= 10}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Traveler Information</h3>
              <BookingForm
                type={type}
                onSubmit={handleBookingSubmit}
                itemData={bookingData}
                onPricingUpdate={handlePricingUpdate}
              />
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PriceSummary type={type} itemData={bookingData} pricingDetails={pricingDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;