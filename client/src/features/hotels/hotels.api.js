import api from '../../lib/api';

// Mock data for hotels
const mockHotels = [
  {
    id: 'HT001',
    name: 'Taj Mahal Palace',
    location: 'Mumbai',
    address: 'Apollo Bunder, Colaba, Mumbai',
    price: 15000,
    rating: 4.8,
    reviews: 3456,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Wi-Fi', 'Gym', 'Room Service'],
    description: 'Luxury heritage hotel overlooking the Gateway of India with iconic architecture and world-class service.',
    rooms: 45,
    checkIn: '14:00',
    checkOut: '11:00',
    propertyType: '5-Star Hotel'
  },
  {
    id: 'HT002',
    name: 'The Oberoi',
    location: 'Delhi',
    address: 'Dr. Zakir Hussain Marg, Delhi',
    price: 18000,
    rating: 4.9,
    reviews: 2876,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool', 'Spa', 'Fine Dining', 'Wi-Fi', 'Butler Service', 'Business Center'],
    description: 'Award-winning luxury hotel in the heart of Delhi with stunning views and impeccable service.',
    rooms: 32,
    checkIn: '14:00',
    checkOut: '12:00',
    propertyType: '5-Star Hotel'
  },
  {
    id: 'HT003',
    name: 'JW Marriott',
    location: 'Bangalore',
    address: 'Vittal Mallya Road, Bangalore',
    price: 12000,
    rating: 4.6,
    reviews: 4123,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool', 'Gym', 'Restaurant', 'Wi-Fi', 'Bar', 'Spa'],
    description: 'Modern luxury in the heart of Bangalore with excellent dining and premium amenities.',
    rooms: 56,
    checkIn: '15:00',
    checkOut: '12:00',
    propertyType: '5-Star Hotel'
  },
  {
    id: 'HT004',
    name: 'ITC Grand Chola',
    location: 'Chennai',
    address: 'Mount Road, Chennai',
    price: 13500,
    rating: 4.7,
    reviews: 2987,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool', 'Spa', 'Multiple Restaurants', 'Wi-Fi', 'Gym', 'Business Center'],
    description: 'Magnificent hotel inspired by Chola architecture with world-class facilities.',
    rooms: 48,
    checkIn: '14:00',
    checkOut: '11:00',
    propertyType: '5-Star Hotel'
  },
  {
    id: 'HT005',
    name: 'The Leela Palace',
    location: 'Jaipur',
    address: 'Delhi-Jaipur Highway, Jaipur',
    price: 16500,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1586618774227-78c1d9b6542c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool', 'Spa', 'Fine Dining', 'Wi-Fi', 'Gym', 'Heritage Tours'],
    description: 'Palace hotel offering royal Rajasthani hospitality with modern luxury.',
    rooms: 38,
    checkIn: '14:00',
    checkOut: '12:00',
    propertyType: 'Palace Hotel'
  },
  {
    id: 'HT006',
    name: 'The Park',
    location: 'Kolkata',
    address: 'Park Street, Kolkata',
    price: 8500,
    rating: 4.4,
    reviews: 2345,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Restaurant', 'Bar', 'Wi-Fi', 'Gym', 'Spa'],
    description: 'Trendy boutique hotel on famous Park Street with vibrant nightlife.',
    rooms: 62,
    checkIn: '14:00',
    checkOut: '11:00',
    propertyType: 'Boutique Hotel'
  }
];

// Get all hotels
export const getAllHotels = async (params = {}) => {
  try {
    // Try real API first
    const response = await api.get('/hotels', { params });
    return response.data;
  } catch (error) {
    console.log('Using mock hotel data');
    // Return mock data if API fails
    return { 
      data: mockHotels,
      success: true,
      message: 'Mock data retrieved'
    };
  }
};

// Get hotel by ID
export const getHotelById = async (id) => {
  try {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Using mock data for hotel ${id}`);
    const hotel = mockHotels.find(h => h.id === id);
    return { 
      data: hotel,
      success: true,
      message: 'Mock data retrieved'
    };
  }
};

// Search hotels
export const searchHotels = async (searchParams) => {
  try {
    const response = await api.get('/hotels/search', { params: searchParams });
    return response.data;
  } catch (error) {
    console.log('Using mock search data');
    // Filter mock data based on search
    let filtered = [...mockHotels];
    
    if (searchParams.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }
    
    if (searchParams.query) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchParams.query.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchParams.query.toLowerCase())
      );
    }
    
    if (searchParams.minPrice) {
      filtered = filtered.filter(hotel => hotel.price >= searchParams.minPrice);
    }
    
    if (searchParams.maxPrice) {
      filtered = filtered.filter(hotel => hotel.price <= searchParams.maxPrice);
    }
    
    return { 
      data: filtered,
      success: true,
      message: 'Mock search results'
    };
  }
};

// Create hotel (admin only)
export const createHotel = async (hotelData) => {
  try {
    const response = await api.post('/hotels', hotelData);
    return response.data;
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

// Update hotel (admin only)
export const updateHotel = async (id, hotelData) => {
  try {
    const response = await api.put(`/hotels/${id}`, hotelData);
    return response.data;
  } catch (error) {
    console.error(`Error updating hotel ${id}:`, error);
    throw error;
  }
};

// Delete hotel (admin only)
export const deleteHotel = async (id) => {
  try {
    const response = await api.delete(`/hotels/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting hotel ${id}:`, error);
    throw error;
  }
};

// Get hotel amenities
export const getHotelAmenities = async () => {
  return {
    data: [
      'Swimming Pool',
      'Spa',
      'Restaurant',
      'Wi-Fi',
      'Gym',
      'Room Service',
      'Bar',
      'Business Center',
      'Airport Shuttle',
      'Parking'
    ],
    success: true
  };
};