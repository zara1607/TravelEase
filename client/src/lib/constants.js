// Search Types
export const SEARCH_TYPES = {
  FLIGHTS: 'flights',
  HOTELS: 'hotels',
  PACKAGES: 'packages'
}

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
}

// Flight Classes
export const FLIGHT_CLASSES = {
  ECONOMY: 'economy',
  PREMIUM_ECONOMY: 'premium_economy',
  BUSINESS: 'business',
  FIRST: 'first'
}

// Popular Destinations
export const POPULAR_DESTINATIONS = [
  {
    id: 1,
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    description: 'Luxury shopping and ultramodern architecture',
    startingPrice: 45000
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description: 'City of lights and romance',
    startingPrice: 75000
  },
  {
    id: 3,
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description: 'Tropical paradise with stunning beaches',
    startingPrice: 35000
  },
  {
    id: 4,
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    description: 'Crystal clear waters and overwater villas',
    startingPrice: 85000
  },
  {
    id: 5,
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    description: 'Modern cityscape meets garden paradise',
    startingPrice: 42000
  },
  {
    id: 6,
    name: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    description: 'Historic landmarks and royal heritage',
    startingPrice: 70000
  }
]

// Airlines
export const AIRLINES = [
  { code: 'AI', name: 'Air India' },
  { code: '6E', name: 'IndiGo' },
  { code: 'SG', name: 'SpiceJet' },
  { code: 'UK', name: 'Vistara' },
  { code: 'EK', name: 'Emirates' },
  { code: 'QR', name: 'Qatar Airways' },
  { code: 'SQ', name: 'Singapore Airlines' },
  { code: 'BA', name: 'British Airways' }
]

// Sort Options
export const SORT_OPTIONS = [
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'duration', label: 'Duration: Shortest First' }
]

// Price Ranges
export const PRICE_RANGES = [
  { min: 0, max: 10000, label: 'Under ₹10,000' },
  { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
  { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
  { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
  { min: 100000, max: Infinity, label: 'Above ₹1,00,000' }
]

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  
  // Flights
  SEARCH_FLIGHTS: '/flights/search',
  FLIGHT_DETAILS: '/flights',
  
  // Hotels
  SEARCH_HOTELS: '/hotels/search',
  HOTEL_DETAILS: '/hotels',
  
  // Packages
  SEARCH_PACKAGES: '/tours/search',
  PACKAGE_DETAILS: '/tours',
  
  // Bookings
  CREATE_BOOKING: '/bookings',
  USER_BOOKINGS: '/bookings/user',
  BOOKING_DETAILS: '/bookings',
  CANCEL_BOOKING: '/bookings',
  
  // User
  UPDATE_PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password'
}

// Currency
export const CURRENCY = {
  symbol: '₹',
  code: 'INR'
}

// Date Format
export const DATE_FORMAT = 'dd MMM yyyy'
export const DATE_TIME_FORMAT = 'dd MMM yyyy, HH:mm'