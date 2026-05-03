import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Clock, MapPin, ArrowRight, Search, Filter, 
  Calendar, Users, Wifi, Droplets, Snowflake, AlertCircle,
  ChevronDown, Star, Luggage, Battery, Wind, Coffee,
  Shield, Fuel, Gauge, Thermometer, Umbrella, Music,
  Navigation, Phone, CreditCard, RefreshCw, CheckCircle,
  X, Award, User, Briefcase, Home, Building
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

// Expanded cab data with 20+ listings
const allCabs = [
  {
    id: 'CB001',
    type: 'Hatchback',
    model: 'Maruti Suzuki Swift',
    capacity: 4,
    price: 12,
    priceUnit: 'per km',
    baseFare: 50,
    rating: 4.4,
    reviews: 1234,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging'],
    features: ['Power Windows', 'Power Steering', 'ABS'],
    fuelType: 'Petrol',
    transmission: 'Manual',
    driver: {
      name: 'Rajesh Kumar',
      rating: 4.6,
      trips: 2345,
      languages: ['Hindi', 'English']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai Airport',
    estimatedTime: '5 mins away'
  },
  {
    id: 'CB002',
    type: 'Sedan',
    model: 'Honda City',
    capacity: 4,
    price: 16,
    priceUnit: 'per km',
    baseFare: 75,
    rating: 4.6,
    reviews: 2345,
    amenities: ['AC', 'Premium Music', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Sunroof', 'Leather Seats', 'Cruise Control'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Suresh Patil',
      rating: 4.7,
      trips: 3456,
      languages: ['Hindi', 'English', 'Marathi']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Andheri East',
    estimatedTime: '3 mins away'
  },
  {
    id: 'CB003',
    type: 'SUV',
    model: 'Toyota Innova Crysta',
    capacity: 7,
    price: 22,
    priceUnit: 'per km',
    baseFare: 100,
    rating: 4.8,
    reviews: 3456,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Rear AC'],
    features: ['Captain Seats', 'Push Button Start', 'Reverse Camera'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Mahesh Reddy',
      rating: 4.9,
      trips: 4567,
      languages: ['Hindi', 'English', 'Telugu']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Bandra',
    estimatedTime: '7 mins away'
  },
  {
    id: 'CB004',
    type: 'Premium Sedan',
    model: 'Mercedes-Benz C-Class',
    capacity: 4,
    price: 35,
    priceUnit: 'per km',
    baseFare: 150,
    rating: 4.9,
    reviews: 987,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting'],
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging'],
    fuelType: 'Petrol',
    transmission: 'Automatic',
    driver: {
      name: 'Vikram Singh',
      rating: 4.9,
      trips: 1234,
      languages: ['Hindi', 'English', 'Punjabi']
    },
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Juhu',
    estimatedTime: '10 mins away'
  },
  {
    id: 'CB005',
    type: 'SUV',
    model: 'Mahindra XUV700',
    capacity: 7,
    price: 19,
    priceUnit: 'per km',
    baseFare: 90,
    rating: 4.5,
    reviews: 1876,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Sunroof', 'Digital Cluster', 'ADAS'],
    fuelType: 'Diesel',
    transmission: 'Manual',
    driver: {
      name: 'Prakash Rao',
      rating: 4.5,
      trips: 2341,
      languages: ['Hindi', 'English', 'Kannada']
    },
    image: 'https://images.unsplash.com/photo-1539706934247-da0ef6e1dafc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Powai',
    estimatedTime: '4 mins away'
  },
  {
    id: 'CB006',
    type: 'Electric',
    model: 'Tata Nexon EV',
    capacity: 4,
    price: 14,
    priceUnit: 'per km',
    baseFare: 60,
    rating: 4.3,
    reviews: 654,
    amenities: ['AC', 'Music System', 'USB Charging', 'Fast Charging'],
    features: ['Electric', 'Touchscreen', 'Connected Car'],
    fuelType: 'Electric',
    transmission: 'Automatic',
    driver: {
      name: 'Amit Sharma',
      rating: 4.4,
      trips: 876,
      languages: ['Hindi', 'English']
    },
    image: 'https://images.unsplash.com/photo-1674047597454-1c104bf3ec1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Vile Parle',
    estimatedTime: '6 mins away'
  },
  {
    id: 'CB007',
    type: 'Luxury SUV',
    model: 'Range Rover Velar',
    capacity: 5,
    price: 45,
    priceUnit: 'per km',
    baseFare: 200,
    rating: 4.9,
    reviews: 543,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting', 'Massage Seats'],
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging', '360 Camera'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Rajiv Mehta',
      rating: 5.0,
      trips: 987,
      languages: ['Hindi', 'English', 'Punjabi']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Worli',
    estimatedTime: '8 mins away'
  },
  {
    id: 'CB008',
    type: 'Hatchback',
    model: 'Hyundai i20',
    capacity: 4,
    price: 13,
    priceUnit: 'per km',
    baseFare: 55,
    rating: 4.4,
    reviews: 1432,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging'],
    features: ['Power Windows', 'Power Steering', 'ABS'],
    fuelType: 'Petrol',
    transmission: 'Manual',
    driver: {
      name: 'Sanjay Gupta',
      rating: 4.5,
      trips: 1876,
      languages: ['Hindi', 'English']
    },
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Andheri West',
    estimatedTime: '4 mins away'
  },
  {
    id: 'CB009',
    type: 'Sedan',
    model: 'Hyundai Verna',
    capacity: 4,
    price: 17,
    priceUnit: 'per km',
    baseFare: 80,
    rating: 4.5,
    reviews: 1654,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Sunroof', 'Push Button Start', 'Cruise Control'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Karthik Nair',
      rating: 4.6,
      trips: 2341,
      languages: ['Hindi', 'English', 'Malayalam']
    },
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Chembur',
    estimatedTime: '5 mins away'
  },
  {
    id: 'CB010',
    type: 'SUV',
    model: 'MG Hector',
    capacity: 5,
    price: 21,
    priceUnit: 'per km',
    baseFare: 95,
    rating: 4.6,
    reviews: 987,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Panoramic Sunroof'],
    features: ['Digital Cluster', 'Connected Car', 'Ventilated Seats'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Vikram Rathore',
      rating: 4.7,
      trips: 1456,
      languages: ['Hindi', 'English']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Lower Parel',
    estimatedTime: '6 mins away'
  },
  {
    id: 'CB011',
    type: 'Electric',
    model: 'MG ZS EV',
    capacity: 4,
    price: 15,
    priceUnit: 'per km',
    baseFare: 65,
    rating: 4.4,
    reviews: 765,
    amenities: ['AC', 'Music System', 'USB Charging', 'Fast Charging', 'Panoramic Sunroof'],
    features: ['Electric', 'Connected Car', 'Digital Cluster'],
    fuelType: 'Electric',
    transmission: 'Automatic',
    driver: {
      name: 'Rahul Joshi',
      rating: 4.5,
      trips: 1234,
      languages: ['Hindi', 'English', 'Marathi']
    },
    image: 'https://images.unsplash.com/photo-1674047597454-1c104bf3ec1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'BKC',
    estimatedTime: '7 mins away'
  },
  {
    id: 'CB012',
    type: 'Luxury Sedan',
    model: 'BMW 3 Series',
    capacity: 4,
    price: 38,
    priceUnit: 'per km',
    baseFare: 180,
    rating: 4.8,
    reviews: 654,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting'],
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging', 'Head-up Display'],
    fuelType: 'Petrol',
    transmission: 'Automatic',
    driver: {
      name: 'Arjun Kapoor',
      rating: 4.9,
      trips: 876,
      languages: ['Hindi', 'English']
    },
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Nariman Point',
    estimatedTime: '9 mins away'
  },
  {
    id: 'CB013',
    type: 'Hatchback',
    model: 'Maruti Baleno',
    capacity: 4,
    price: 12,
    priceUnit: 'per km',
    baseFare: 50,
    rating: 4.3,
    reviews: 2134,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging'],
    features: ['Power Windows', 'Power Steering', 'ABS'],
    fuelType: 'Petrol',
    transmission: 'Manual',
    driver: {
      name: 'Dinesh Yadav',
      rating: 4.4,
      trips: 2987,
      languages: ['Hindi', 'English']
    },
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Dadar',
    estimatedTime: '3 mins away'
  },
  {
    id: 'CB014',
    type: 'Sedan',
    model: 'Skoda Octavia',
    capacity: 4,
    price: 20,
    priceUnit: 'per km',
    baseFare: 85,
    rating: 4.7,
    reviews: 876,
    amenities: ['AC', 'Premium Music', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Sunroof', 'Leather Seats', 'Cruise Control'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Siddharth Mehra',
      rating: 4.7,
      trips: 1654,
      languages: ['Hindi', 'English', 'Punjabi']
    },
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Thane',
    estimatedTime: '8 mins away'
  },
  {
    id: 'CB015',
    type: 'SUV',
    model: 'Ford Endeavour',
    capacity: 7,
    price: 28,
    priceUnit: 'per km',
    baseFare: 120,
    rating: 4.7,
    reviews: 1432,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Rear AC'],
    features: ['4x4', 'Terrain Management', 'Sunroof'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Harish Rao',
      rating: 4.8,
      trips: 1987,
      languages: ['Hindi', 'English', 'Telugu']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Goregaon',
    estimatedTime: '6 mins away'
  },
  {
    id: 'CB016',
    type: 'Luxury SUV',
    model: 'Audi Q7',
    capacity: 7,
    price: 48,
    priceUnit: 'per km',
    baseFare: 220,
    rating: 4.9,
    reviews: 432,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting', 'Massage Seats'],
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging', '360 Camera', 'Air Suspension'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Vikram Seth',
      rating: 5.0,
      trips: 765,
      languages: ['Hindi', 'English', 'Punjabi']
    },
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malabar Hill',
    estimatedTime: '10 mins away'
  },
  {
    id: 'CB017',
    type: 'Electric',
    model: 'Hyundai Kona Electric',
    capacity: 4,
    price: 16,
    priceUnit: 'per km',
    baseFare: 70,
    rating: 4.4,
    reviews: 543,
    amenities: ['AC', 'Music System', 'USB Charging', 'Fast Charging'],
    features: ['Electric', 'Connected Car', 'Sunroof'],
    fuelType: 'Electric',
    transmission: 'Automatic',
    driver: {
      name: 'Nitin Sharma',
      rating: 4.5,
      trips: 987,
      languages: ['Hindi', 'English']
    },
    image: 'https://images.unsplash.com/photo-1674047597454-1c104bf3ec1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Navi Mumbai',
    estimatedTime: '7 mins away'
  },
  {
    id: 'CB018',
    type: 'Sedan',
    model: 'Toyota Camry Hybrid',
    capacity: 4,
    price: 24,
    priceUnit: 'per km',
    baseFare: 110,
    rating: 4.6,
    reviews: 876,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Hybrid', 'Sunroof', 'Leather Seats', 'Ventilated Seats'],
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    driver: {
      name: 'Anand Krishnan',
      rating: 4.7,
      trips: 1345,
      languages: ['Hindi', 'English', 'Tamil']
    },
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Colaba',
    estimatedTime: '5 mins away'
  },
  {
    id: 'CB019',
    type: 'SUV',
    model: 'Jeep Compass',
    capacity: 5,
    price: 23,
    priceUnit: 'per km',
    baseFare: 105,
    rating: 4.5,
    reviews: 1234,
    amenities: ['AC', 'Music System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Sunroof'],
    features: ['4x4', 'Terrain Response', 'Digital Cluster'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Ravi Shankar',
      rating: 4.6,
      trips: 1789,
      languages: ['Hindi', 'English', 'Bengali']
    },
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Powai',
    estimatedTime: '4 mins away'
  },
  {
    id: 'CB020',
    type: 'Premium Hatchback',
    model: 'Mini Cooper',
    capacity: 4,
    price: 30,
    priceUnit: 'per km',
    baseFare: 140,
    rating: 4.7,
    reviews: 654,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth'],
    features: ['Sunroof', 'Leather Seats', 'Ambient Lighting'],
    fuelType: 'Petrol',
    transmission: 'Automatic',
    driver: {
      name: 'Zoya Khan',
      rating: 4.8,
      trips: 876,
      languages: ['Hindi', 'English', 'Urdu']
    },
    popular: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Bandra West',
    estimatedTime: '3 mins away'
  },
  {
    id: 'CB021',
    name: 'Airport Transfer',
    type: 'Luxury SUV',
    model: 'Mercedes-Benz GLS',
    capacity: 7,
    price: 55,
    priceUnit: 'per km',
    baseFare: 250,
    rating: 4.9,
    reviews: 321,
    amenities: ['AC', 'Premium Sound System', 'Bottle Water', 'USB Charging', 'Bluetooth', 'Ambient Lighting', 'Massage Seats'],
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Charging', '360 Camera'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    driver: {
      name: 'Gurdeep Singh',
      rating: 5.0,
      trips: 543,
      languages: ['Hindi', 'English', 'Punjabi']
    },
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai Airport',
    estimatedTime: '2 mins away',
    airportTransfer: true
  }
];

const CabsDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [selectedCabTypes, setSelectedCabTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 60 });
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const popularLocations = [
    { from: 'Airport', to: 'City Center', price: '₹450', time: '45 mins' },
    { from: 'Railway Station', to: 'Hotel', price: '₹250', time: '20 mins' },
    { from: 'City', to: 'Airport', price: '₹450', time: '45 mins' },
    { from: 'Local', to: 'Local', price: '₹12/km', time: 'Flexible' }
  ];

  const stats = [
    { label: 'Available Cabs', value: '250+', icon: Car, color: 'yellow' },
    { label: 'Cities', value: '45+', icon: MapPin, color: 'blue' },
    { label: 'Happy Riders', value: '50K+', icon: Users, color: 'purple' },
    { label: '24/7 Support', value: 'Always', icon: Clock, color: 'green' }
  ];

  const filters = [
    { id: 'all', label: 'All Cabs' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Top Rated' },
    { id: 'distance', label: 'Nearest First' }
  ];

  const cabTypes = ['Hatchback', 'Sedan', 'SUV', 'Premium Sedan', 'Luxury SUV', 'Electric'];
  const capacities = [4, 5, 6, 7];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

  const handleBookNow = (cab) => {
    navigate('/booking', { state: { item: cab, type: 'cab' } });
  };

  const handleViewDetails = (cab) => {
    navigate(`/cab/${cab.id}`, { state: { cab } });
  };

  const toggleCabType = (type) => {
    setSelectedCabTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const getFilteredCabs = () => {
    let filtered = [...allCabs];
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCabTypes.length > 0) {
      filtered = filtered.filter(cab => selectedCabTypes.includes(cab.type));
    }
    
    if (selectedFilter === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter === 'distance') {
      // Simulated distance sorting
      filtered.sort((a, b) => {
        const timeA = parseInt(a.estimatedTime.split(' ')[0]);
        const timeB = parseInt(b.estimatedTime.split(' ')[0]);
        return timeA - timeB;
      });
    }
    
    return filtered;
  };

  const filteredCabs = getFilteredCabs();
  const hasMore = visibleCount < filteredCabs.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, filteredCabs.length));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
              Book Cabs Instantly
            </h1>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              City rides, outstation trips, and airport transfers at your fingertips
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Drop location"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Date & Time"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    defaultValue="Now"
                  />
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="bg-yellow-600 hover:bg-yellow-700 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search Cabs
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularLocations.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{route.from} → {route.to}</span>
                  <Badge variant="primary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    {route.price}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{route.time}</p>
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
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              >
                {filters.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1"></div>

            <p className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">{filteredCabs.length}</span> cabs available
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
                    {/* Cab Type Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Cab Type</h3>
                      <div className="space-y-2">
                        {cabTypes.map(type => (
                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCabTypes.includes(type)}
                              onChange={() => toggleCabType(type)}
                              className="rounded text-yellow-600 focus:ring-yellow-500"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Capacity Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Capacity</h3>
                      <div className="space-y-2">
                        {capacities.map(cap => (
                          <label key={cap} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-yellow-600 focus:ring-yellow-500" />
                            <span className="text-sm text-gray-700">{cap} Seats</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Fuel Type */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fuel Type</h3>
                      <div className="space-y-2">
                        {fuelTypes.map(fuel => (
                          <label key={fuel} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-yellow-600 focus:ring-yellow-500" />
                            <span className="text-sm text-gray-700">{fuel}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Max Price/km</h3>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        step="1"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full accent-yellow-600"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">₹0</span>
                        <span className="text-sm text-gray-600">₹{priceRange.max}+</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedCabTypes([]);
                        setPriceRange({ min: 0, max: 60 });
                      }}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCabs.slice(0, visibleCount).map((cab, index) => (
            <motion.div
              key={cab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-yellow-200">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cab.image}
                    alt={cab.model}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {cab.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="primary" className="bg-yellow-400 text-yellow-900 border-yellow-400">
                        🔥 Popular
                      </Badge>
                    </div>
                  )}
                  {cab.airportTransfer && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary" className="bg-blue-500 text-white border-blue-500">
                        ✈️ Airport
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      {cab.fuelType}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      {cab.transmission}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title & Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{cab.model}</h3>
                      <p className="text-sm text-gray-600">{cab.type} • {cab.capacity} Seats</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{cab.rating}</span>
                      <span className="text-xs text-gray-500">({cab.reviews})</span>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{cab.driver.name}</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{cab.driver.rating}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{cab.location}</span>
                    <span className="text-green-600 font-medium ml-auto">{cab.estimatedTime}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {cab.features.slice(0, 3).map((feature, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-gray-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cab.amenities.slice(0, 4).map((amenity, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                        {amenity === 'AC' && <Snowflake className="w-3 h-3 mr-1" />}
                        {amenity === 'Music System' && <Music className="w-3 h-3 mr-1" />}
                        {amenity === 'Bottle Water' && <Droplets className="w-3 h-3 mr-1" />}
                        {amenity === 'USB Charging' && <Battery className="w-3 h-3 mr-1" />}
                        {amenity === 'Bluetooth' && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === 'Premium Sound System' && <Music className="w-3 h-3 mr-1" />}
                        <span className="text-xs">{amenity}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Price & Book */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Base fare ₹{cab.baseFare}</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        ₹{cab.price}
                      </p>
                      <p className="text-xs text-gray-500">{cab.priceUnit}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleViewDetails(cab)}
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                      <Button
                        onClick={() => handleBookNow(cab)}
                        variant="primary"
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700 group"
                      >
                        Book
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Safety Badge */}
                  <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-100">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-gray-600">Sanitized cab • Trained driver</span>
                    <Badge variant="success" size="sm" className="ml-auto bg-green-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md">
              <RefreshCw className="w-5 h-5 animate-spin text-yellow-600" />
              <span className="text-gray-600">Loading more cabs...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredCabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No cabs available</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
                setSelectedCabTypes([]);
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredCabs.length > 0 && hasMore && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-12"
              onClick={handleLoadMore}
              disabled={loading}
            >
              Load More Cabs ({visibleCount}/{filteredCabs.length})
            </Button>
          </div>
        )}

        {/* All Loaded Message */}
        {filteredCabs.length > 0 && !hasMore && visibleCount > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500">You've seen all {filteredCabs.length} cabs</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabsDashboard;