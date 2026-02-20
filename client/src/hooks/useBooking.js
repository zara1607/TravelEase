import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const useBooking = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBooking = (item, type = 'package', customData = {}) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store the booking intent for after login
      const bookingIntent = {
        item,
        type,
        ...customData,
        timestamp: Date.now()
      };
      sessionStorage.setItem('bookingIntent', JSON.stringify(bookingIntent));
      sessionStorage.setItem('redirectAfterLogin', '/booking');
      
      toast.error('Please login to continue with booking');
      navigate('/login');
      return;
    }

    // Prepare booking data
    const bookingData = {
      id: item._id || item.id || item.packageId,
      type: type,
      title: item.title || item.name,
      description: item.description || '',
      image: item.images?.[0]?.url || item.image,
      
      // Pricing
      price: item.pricing?.discountedPrice || item.price,
      originalPrice: item.pricing?.originalPrice || item.originalPrice,
      discount: item.pricing?.discount || item.discount,
      
      // Duration (for packages)
      duration: item.duration || {
        days: item.days || 1,
        nights: item.nights || (item.days ? item.days - 1 : 0)
      },
      
      // Destination/Location
      destination: item.destination || {
        city: item.city || item.location,
        country: item.country
      },
      
      // For flights
      flightDetails: item.flightDetails || {
        from: item.from,
        to: item.to,
        departureDate: item.departureDate,
        returnDate: item.returnDate,
        airline: item.airline,
        flightNumber: item.flightNumber
      },
      
      // For hotels
      hotelDetails: item.hotelDetails || {
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        rooms: item.rooms,
        amenities: item.amenities
      },
      
      // Default values
      travelers: customData.travelers || item.travelers || 2,
      selectedDate: customData.selectedDate || item.selectedDate || '',
      
      // Additional data
      inclusions: item.inclusions || [],
      highlights: item.highlights || [],
      rating: item.rating || 4.5,
      reviews: item.reviews || 0,
      
      // Pass any custom data
      ...customData
    };

    // Navigate to booking page with data
    navigate('/booking', { 
      state: { 
        item: bookingData,
        type: type 
      } 
    });
  };

  const restoreBookingIntent = () => {
    const intent = sessionStorage.getItem('bookingIntent');
    if (intent) {
      try {
        const parsedIntent = JSON.parse(intent);
        sessionStorage.removeItem('bookingIntent');
        return parsedIntent;
      } catch (e) {
        console.error('Failed to parse booking intent:', e);
      }
    }
    return null;
  };

  return { handleBooking, restoreBookingIntent };
};