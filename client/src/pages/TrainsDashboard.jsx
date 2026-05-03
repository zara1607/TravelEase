import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, Clock, MapPin, ArrowRight, Search, Filter, 
  Calendar, Users, Wifi, Coffee, Battery, AlertCircle,
  ChevronDown, Star, Luggage, Bed, Utensils, Power,
  Award, Shield, RefreshCw, X, CheckCircle, Info
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

// Expanded train data with 20+ listings
const allTrains = [
  {
    id: 'TR001',
    name: 'Shatabdi Express',
    number: '12009',
    from: { city: 'Mumbai', time: '06:00', code: 'CSMT', platform: 6 },
    to: { city: 'Ahmedabad', time: '13:00', code: 'ADI', platform: 3 },
    duration: '7h 00m',
    distance: '493 km',
    classes: {
      'CC': { price: 1250, seats: 48, available: 12 },
      'EC': { price: 2450, seats: 24, available: 6 }
    },
    rating: 4.6,
    reviews: 3245,
    amenities: ['WiFi', 'Meals', 'Charging Point', 'Blanket', 'Newspaper'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR002',
    name: 'Rajdhani Express',
    number: '12951',
    from: { city: 'Mumbai', time: '16:35', code: 'MMCT', platform: 18 },
    to: { city: 'Delhi', time: '08:30', code: 'NDLS', platform: 16 },
    duration: '15h 55m',
    distance: '1384 km',
    classes: {
      '3A': { price: 2150, seats: 64, available: 23 },
      '2A': { price: 3150, seats: 46, available: 8 },
      '1A': { price: 5450, seats: 24, available: 4 }
    },
    rating: 4.8,
    reviews: 5678,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Newspaper', 'Pantry'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567137932784-ae18f1b36ee7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR003',
    name: 'Duronto Express',
    number: '12263',
    from: { city: 'Pune', time: '23:15', code: 'PUNE', platform: 5 },
    to: { city: 'Delhi', time: '15:45', code: 'NDLS', platform: 12 },
    duration: '16h 30m',
    distance: '1497 km',
    classes: {
      '3A': { price: 1850, seats: 64, available: 18 },
      '2A': { price: 2850, seats: 46, available: 12 },
      '1A': { price: 4850, seats: 24, available: 2 }
    },
    rating: 4.5,
    reviews: 2341,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Entertainment'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1623126907902-3b297b8e3d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR004',
    name: 'Tejas Express',
    number: '22119',
    from: { city: 'Mumbai', time: '15:30', code: 'CSMT', platform: 10 },
    to: { city: 'Karmali', time: '05:30', code: 'KRMI', platform: 2 },
    duration: '14h 00m',
    distance: '762 km',
    classes: {
      'CC': { price: 1450, seats: 72, available: 34 },
      'EC': { price: 2650, seats: 56, available: 16 }
    },
    rating: 4.4,
    reviews: 1876,
    amenities: ['WiFi', 'Meals', 'Entertainment', 'Charging Point', 'Snacks'],
    type: 'Superfast',
    operator: 'IRCTC',
    image: 'https://images.unsplash.com/photo-1518709766631-a6c7f7856bc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR005',
    name: 'Deccan Queen',
    number: '12123',
    from: { city: 'Pune', time: '07:15', code: 'PUNE', platform: 1 },
    to: { city: 'Mumbai', time: '10:50', code: 'CSMT', platform: 18 },
    duration: '3h 35m',
    distance: '192 km',
    classes: {
      'CC': { price: 450, seats: 72, available: 42 },
      '2S': { price: 150, seats: 88, available: 56 }
    },
    rating: 4.3,
    reviews: 4123,
    amenities: ['Charging Point', 'Snacks', 'News paper'],
    popular: true,
    type: 'Passenger',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR006',
    name: 'Garib Rath',
    number: '12909',
    from: { city: 'Mumbai', time: '15:40', code: 'BDTS', platform: 8 },
    to: { city: 'Delhi', time: '08:50', code: 'NDLS', platform: 10 },
    duration: '17h 10m',
    distance: '1384 km',
    classes: {
      '3A': { price: 1250, seats: 80, available: 45 }
    },
    rating: 4.1,
    reviews: 3456,
    amenities: ['Bedding', 'Charging Point', 'Snacks'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  // New Trains (7-20)
  {
    id: 'TR007',
    name: 'Karnataka Express',
    number: '12627',
    from: { city: 'Bangalore', time: '19:20', code: 'SBC', platform: 4 },
    to: { city: 'Delhi', time: '05:40', code: 'NDLS', platform: 5 },
    duration: '34h 20m',
    distance: '2400 km',
    classes: {
      '3A': { price: 2850, seats: 64, available: 23 },
      '2A': { price: 3850, seats: 46, available: 12 },
      '1A': { price: 6250, seats: 24, available: 3 }
    },
    rating: 4.5,
    reviews: 2987,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567345181217-5ac1e6f5f1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR008',
    name: 'Chennai Express',
    number: '12641',
    from: { city: 'Delhi', time: '15:45', code: 'NDLS', platform: 9 },
    to: { city: 'Chennai', time: '04:30', code: 'MAS', platform: 7 },
    duration: '36h 45m',
    distance: '2180 km',
    classes: {
      '3A': { price: 2650, seats: 64, available: 18 },
      '2A': { price: 3650, seats: 46, available: 8 },
      '1A': { price: 5950, seats: 24, available: 2 }
    },
    rating: 4.4,
    reviews: 2765,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1570304812491-99d6d1e0989f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR009',
    name: 'Howrah Express',
    number: '12321',
    from: { city: 'Mumbai', time: '14:30', code: 'CSMT', platform: 12 },
    to: { city: 'Kolkata', time: '20:45', code: 'HWH', platform: 9 },
    duration: '30h 15m',
    distance: '1968 km',
    classes: {
      '3A': { price: 2450, seats: 64, available: 27 },
      '2A': { price: 3450, seats: 46, available: 14 },
      '1A': { price: 5650, seats: 24, available: 5 }
    },
    rating: 4.3,
    reviews: 2345,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR010',
    name: 'Lokmanya Tilak Express',
    number: '11057',
    from: { city: 'Mumbai', time: '23:45', code: 'LTT', platform: 7 },
    to: { city: 'Patna', time: '04:30', code: 'PNBE', platform: 4 },
    duration: '28h 45m',
    distance: '1684 km',
    classes: {
      '3A': { price: 1950, seats: 72, available: 42 },
      '2A': { price: 2950, seats: 52, available: 21 },
      'SL': { price: 950, seats: 96, available: 54 }
    },
    rating: 4.0,
    reviews: 1876,
    amenities: ['Charging Point', 'Bedding'],
    type: 'Express',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567345181217-5ac1e6f5f1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR011',
    name: 'Goa Express',
    number: '12779',
    from: { city: 'Delhi', time: '06:45', code: 'NDLS', platform: 3 },
    to: { city: 'Goa', time: '15:30', code: 'VSG', platform: 2 },
    duration: '32h 45m',
    distance: '2135 km',
    classes: {
      '3A': { price: 2750, seats: 64, available: 18 },
      '2A': { price: 3750, seats: 46, available: 7 },
      '1A': { price: 6150, seats: 24, available: 1 }
    },
    rating: 4.5,
    reviews: 1987,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1570304812491-99d6d1e0989f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR012',
    name: 'Mysore Express',
    number: '16231',
    from: { city: 'Chennai', time: '21:30', code: 'MAS', platform: 5 },
    to: { city: 'Mysore', time: '07:15', code: 'MYS', platform: 2 },
    duration: '9h 45m',
    distance: '495 km',
    classes: {
      'CC': { price: 650, seats: 72, available: 38 },
      '2S': { price: 250, seats: 88, available: 52 }
    },
    rating: 4.2,
    reviews: 1654,
    amenities: ['Charging Point', 'Snacks'],
    type: 'Passenger',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR013',
    name: 'Udyan Express',
    number: '11301',
    from: { city: 'Mumbai', time: '08:45', code: 'CSMT', platform: 14 },
    to: { city: 'Bangalore', time: '06:15', code: 'SBC', platform: 3 },
    duration: '21h 30m',
    distance: '1100 km',
    classes: {
      '3A': { price: 1450, seats: 72, available: 34 },
      '2A': { price: 2250, seats: 52, available: 16 },
      'SL': { price: 750, seats: 96, available: 48 }
    },
    rating: 4.1,
    reviews: 1432,
    amenities: ['Charging Point', 'Bedding'],
    type: 'Express',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567345181217-5ac1e6f5f1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR014',
    name: 'Konkan Kanya',
    number: '10111',
    from: { city: 'Mumbai', time: '14:15', code: 'CSMT', platform: 8 },
    to: { city: 'Goa', time: '05:30', code: 'MAO', platform: 1 },
    duration: '15h 15m',
    distance: '586 km',
    classes: {
      '3A': { price: 1150, seats: 64, available: 28 },
      '2A': { price: 1850, seats: 46, available: 12 },
      'SL': { price: 550, seats: 96, available: 62 }
    },
    rating: 4.3,
    reviews: 2134,
    amenities: ['Charging Point', 'Bedding', 'Pantry'],
    type: 'Express',
    operator: 'Konkan Railway',
    image: 'https://images.unsplash.com/photo-1570304812491-99d6d1e0989f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR015',
    name: 'Nanda Devi Express',
    number: '12205',
    from: { city: 'Delhi', time: '23:50', code: 'NDLS', platform: 6 },
    to: { city: 'Kathgodam', time: '09:30', code: 'KGM', platform: 2 },
    duration: '9h 40m',
    distance: '406 km',
    classes: {
      '3A': { price: 950, seats: 64, available: 32 },
      '2A': { price: 1550, seats: 46, available: 18 },
      '1A': { price: 2850, seats: 24, available: 4 }
    },
    rating: 4.5,
    reviews: 1876,
    amenities: ['Meals', 'Bedding', 'Charging Point'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR016',
    name: 'Kerala Express',
    number: '12625',
    from: { city: 'Delhi', time: '11:45', code: 'NDLS', platform: 8 },
    to: { city: 'Thiruvananthapuram', time: '20:15', code: 'TVC', platform: 3 },
    duration: '56h 30m',
    distance: '3150 km',
    classes: {
      '3A': { price: 3850, seats: 64, available: 16 },
      '2A': { price: 4950, seats: 46, available: 6 },
      '1A': { price: 7850, seats: 24, available: 2 }
    },
    rating: 4.5,
    reviews: 2765,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567345181217-5ac1e6f5f1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR017',
    name: 'Himsagar Express',
    number: '16317',
    from: { city: 'Chennai', time: '09:20', code: 'MAS', platform: 7 },
    to: { city: 'Jammu', time: '05:45', code: 'JAT', platform: 2 },
    duration: '68h 25m',
    distance: '3765 km',
    classes: {
      '3A': { price: 4250, seats: 64, available: 12 },
      '2A': { price: 5450, seats: 46, available: 4 },
      'SL': { price: 1850, seats: 96, available: 34 }
    },
    rating: 4.2,
    reviews: 1987,
    amenities: ['Bedding', 'Charging Point', 'Pantry'],
    type: 'Express',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1570304812491-99d6d1e0989f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR018',
    name: 'Coromandel Express',
    number: '12841',
    from: { city: 'Howrah', time: '14:50', code: 'HWH', platform: 12 },
    to: { city: 'Chennai', time: '10:45', code: 'MAS', platform: 8 },
    duration: '19h 55m',
    distance: '1660 km',
    classes: {
      '3A': { price: 1950, seats: 64, available: 24 },
      '2A': { price: 2950, seats: 46, available: 10 },
      '1A': { price: 4950, seats: 24, available: 3 }
    },
    rating: 4.4,
    reviews: 2341,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    popular: true,
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR019',
    name: 'Gitanjali Express',
    number: '12859',
    from: { city: 'Mumbai', time: '06:00', code: 'CSMT', platform: 9 },
    to: { city: 'Howrah', time: '08:20', code: 'HWH', platform: 14 },
    duration: '26h 20m',
    distance: '1968 km',
    classes: {
      '3A': { price: 2350, seats: 64, available: 18 },
      '2A': { price: 3350, seats: 46, available: 8 },
      '1A': { price: 5550, seats: 24, available: 2 }
    },
    rating: 4.4,
    reviews: 2123,
    amenities: ['Meals', 'Bedding', 'Charging Point', 'Pantry'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1567345181217-5ac1e6f5f1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'TR020',
    name: 'Pushpak Express',
    number: '12533',
    from: { city: 'Lucknow', time: '20:15', code: 'LKO', platform: 5 },
    to: { city: 'Mumbai', time: '05:30', code: 'CSMT', platform: 16 },
    duration: '33h 15m',
    distance: '1713 km',
    classes: {
      '3A': { price: 2150, seats: 64, available: 26 },
      '2A': { price: 3150, seats: 46, available: 14 },
      'SL': { price: 950, seats: 96, available: 48 }
    },
    rating: 4.2,
    reviews: 1654,
    amenities: ['Bedding', 'Charging Point', 'Pantry'],
    type: 'Superfast',
    operator: 'Indian Railways',
    image: 'https://images.unsplash.com/photo-1570304812491-99d6d1e0989f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Class configurations
const classConfig = {
  'SL': { name: 'Sleeper', color: 'green', icon: Bed },
  '3A': { name: 'AC 3 Tier', color: 'blue', icon: Bed },
  '2A': { name: 'AC 2 Tier', color: 'purple', icon: Bed },
  '1A': { name: 'First Class', color: 'amber', icon: Award },
  'CC': { name: 'AC Chair Car', color: 'indigo', icon: Users },
  'EC': { name: 'Executive Chair', color: 'rose', icon: Award },
  '2S': { name: 'Second Sitting', color: 'gray', icon: Users }
};

const TrainsDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const popularRoutes = [
    { from: 'Mumbai', to: 'Delhi', price: '₹1,850', duration: '16h', trains: 24 },
    { from: 'Delhi', to: 'Mumbai', price: '₹2,150', duration: '17h', trains: 28 },
    { from: 'Bangalore', to: 'Chennai', price: '₹450', duration: '6h', trains: 18 },
    { from: 'Mumbai', to: 'Pune', price: '₹150', duration: '3h', trains: 32 }
  ];

  const stats = [
    { label: 'Daily Trains', value: '500+', icon: Train, color: 'blue' },
    { label: 'Routes', value: '400+', icon: MapPin, color: 'green' },
    { label: 'Cities', value: '150+', icon: Users, color: 'purple' },
    { label: 'On Time', value: '92%', icon: Clock, color: 'amber' }
  ];

  const filters = [
    { id: 'all', label: 'All Trains' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'duration', label: 'Fastest First' },
    { id: 'rating', label: 'Top Rated' }
  ];

  const classTypes = ['SL', '3A', '2A', '1A', 'CC', 'EC'];
  const departureTimes = ['Early Morning (12am-6am)', 'Morning (6am-12pm)', 'Afternoon (12pm-6pm)', 'Evening (6pm-12am)'];

  const handleBookNow = (train) => {
    navigate('/booking', { state: { item: train, type: 'train' } });
  };

  const handleViewDetails = (train) => {
    navigate(`/train/${train.id}`, { state: { train } });
  };

  const getFilteredTrains = () => {
    let filtered = [...allTrains];
    
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.number.includes(searchQuery) ||
        t.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.to.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedClass) {
      filtered = filtered.filter(t => Object.keys(t.classes).includes(selectedClass));
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => {
        const aMin = Math.min(...Object.values(a.classes).map(c => c.price));
        const bMin = Math.min(...Object.values(b.classes).map(c => c.price));
        return aMin - bMin;
      });
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => {
        const aMin = Math.max(...Object.values(a.classes).map(c => c.price));
        const bMin = Math.max(...Object.values(b.classes).map(c => c.price));
        return bMin - aMin;
      });
    } else if (selectedFilter === 'duration') {
      filtered.sort((a, b) => {
        const getMinutes = (d) => {
          const parts = d.split('h');
          return parseInt(parts[0]) * 60 + parseInt(parts[1]?.replace('m', '') || 0);
        };
        return getMinutes(a.duration) - getMinutes(b.duration);
      });
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
  };

  const filteredTrains = getFilteredTrains();
  const hasMore = visibleCount < filteredTrains.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, filteredTrains.length));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Book Train Tickets
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Travel comfortably with India's largest train network
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="From (Station)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="To (Station)"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Date"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    defaultValue="15 Mar 2025"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Train className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Train name or number"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Trains
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className={`inline-flex p-3 bg-${stat.color}-100 rounded-lg mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Routes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Train Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  <Badge variant="primary" className="bg-blue-100 text-blue-700 border-blue-200">
                    {route.price}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{route.trains} trains daily</span>
                  <span className="text-gray-600">{route.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 sticky top-20 z-40">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredTrains.length}</span> trains found
            </p>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Class Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Class Type</h3>
                      <div className="space-y-2">
                        {classTypes.map(type => {
                          const config = classConfig[type];
                          const Icon = config.icon;
                          return (
                            <label key={type} className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="class" 
                                value={type}
                                checked={selectedClass === type}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="rounded-full text-blue-600 focus:ring-blue-500" 
                              />
                              <Icon className={`w-4 h-4 text-${config.color}-600`} />
                              <span className="text-sm text-gray-700">{config.name}</span>
                            </label>
                          );
                        })}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="class" 
                            value=""
                            checked={selectedClass === ''}
                            onChange={(e) => setSelectedClass('')}
                            className="rounded-full text-blue-600 focus:ring-blue-500" 
                          />
                          <span className="text-sm text-gray-700">All Classes</span>
                        </label>
                      </div>
                    </div>

                    {/* Departure Time */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Departure Time</h3>
                      <div className="space-y-2">
                        {departureTimes.map(time => (
                          <label key={time} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                      <div className="space-y-2">
                        {['WiFi', 'Meals', 'Charging Point', 'Bedding', 'Pantry'].map(amenity => (
                          <label key={amenity} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Max Price</h3>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">₹0</span>
                        <span className="text-sm text-gray-600">₹{priceRange.max.toLocaleString()}+</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedClass('');
                        setPriceRange({ min: 0, max: 10000 });
                      }}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Train Cards Grid */}
        <div className="space-y-4">
          {filteredTrains.slice(0, visibleCount).map((train, index) => {
            const minPrice = Math.min(...Object.values(train.classes).map(c => c.price));
            const maxPrice = Math.max(...Object.values(train.classes).map(c => c.price));
            
            return (
              <motion.div
                key={train.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                  <div className="p-6">
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Train className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">{train.name}</h3>
                            <Badge variant="secondary" className="bg-gray-100">
                              {train.number}
                            </Badge>
                            {train.popular && (
                              <Badge variant="primary" className="bg-orange-100 text-orange-700 border-orange-200">
                                🔥 Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-600">{train.type} • {train.operator}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{train.rating}</span>
                          <span className="text-xs text-gray-500">({train.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Journey Details */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          {/* Departure */}
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{train.from.time}</p>
                            <p className="text-lg font-semibold text-gray-700">{train.from.code}</p>
                            <p className="text-sm text-gray-500">{train.from.city}</p>
                            <p className="text-xs text-gray-400 mt-1">Platform {train.from.platform}</p>
                          </div>
                          
                          {/* Journey Path */}
                          <div className="flex-1 px-4">
                            <div className="relative">
                              <div className="border-t-2 border-gray-300 border-dashed"></div>
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-md">
                                <Train className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="text-center mt-2">
                              <p className="text-sm font-semibold text-gray-700">{train.duration}</p>
                              <p className="text-xs text-gray-500">{train.distance}</p>
                            </div>
                          </div>
                          
                          {/* Arrival */}
                          <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{train.to.time}</p>
                            <p className="text-lg font-semibold text-gray-700">{train.to.code}</p>
                            <p className="text-sm text-gray-500">{train.to.city}</p>
                            <p className="text-xs text-gray-400 mt-1">Platform {train.to.platform}</p>
                          </div>
                        </div>

                        {/* Classes */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {Object.entries(train.classes).map(([code, details]) => {
                            const config = classConfig[code] || { name: code, color: 'gray', icon: Bed };
                            const Icon = config.icon;
                            return (
                              <div key={code} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
                                <Icon className={`w-4 h-4 text-${config.color}-600`} />
                                <span className="text-sm font-medium text-gray-700">{config.name}</span>
                                <span className="text-sm text-gray-900">₹{details.price}</span>
                                <Badge 
                                  variant={details.available > 10 ? 'success' : details.available > 0 ? 'warning' : 'danger'} 
                                  size="sm"
                                >
                                  {details.available} seats
                                </Badge>
                              </div>
                            );
                          })}
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {train.amenities.map((amenity, i) => (
                            <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700 border-blue-100">
                              {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                              {amenity === 'Meals' && <Utensils className="w-3 h-3 mr-1" />}
                              {amenity === 'Charging Point' && <Power className="w-3 h-3 mr-1" />}
                              {amenity === 'Bedding' && <Bed className="w-3 h-3 mr-1" />}
                              {amenity === 'Newspaper' && <Info className="w-3 h-3 mr-1" />}
                              {amenity === 'Pantry' && <Coffee className="w-3 h-3 mr-1" />}
                              {amenity === 'Entertainment' && <Battery className="w-3 h-3 mr-1" />}
                              <span>{amenity}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="lg:w-64 text-center lg:text-right border-t lg:border-t-0 pt-4 lg:pt-0">
                        <p className="text-sm text-gray-500 mb-1">Starting from</p>
                        <p className="text-4xl font-bold text-blue-600 mb-1">
                          ₹{minPrice.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          {minPrice !== maxPrice && `up to ₹${maxPrice.toLocaleString('en-IN')}`}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleViewDetails(train)}
                            variant="outline"
                            className="flex-1"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => handleBookNow(train)}
                            variant="primary"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 group"
                          >
                            Book Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-t border-blue-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 flex items-center gap-1">
                          <Shield className="w-4 h-4 text-blue-600" />
                          IRCTC Authorized
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          Free cancellation up to 24h before
                        </span>
                      </div>
                      <Badge variant="success" size="sm" className="bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Govt. Approved
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading more trains...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredTrains.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No trains found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setSelectedClass('');
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredTrains.length > 0 && hasMore && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12"
              onClick={handleLoadMore}
              disabled={loading}
            >
              Load More Trains ({visibleCount}/{filteredTrains.length})
            </Button>
          </div>
        )}

        {/* All Loaded Message */}
        {filteredTrains.length > 0 && !hasMore && visibleCount > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500">You've seen all {filteredTrains.length} trains</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainsDashboard;