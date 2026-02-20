import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Star, Heart, ChevronRight, 
  Plane, Hotel, Package, Train, Bus, Car,
  Calendar, Users, Clock, Award, Shield,
  Sparkles, TrendingUp, Camera, Coffee,
  Sun, Umbrella, Mountain, Compass
} from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const Home = () => {
  const navigate = useNavigate();
  const { handleBooking } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  // Popular destinations
  const destinations = [
    {
      id: 'goa',
      name: 'Goa',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
      price: 12999,
      rating: 4.5,
      type: 'package',
      packageDetails: {
        title: 'Magical Goa Beach Escape',
        days: 4,
        nights: 3,
        highlights: ['Beach Resorts', 'Water Sports', 'Sunset Cruise']
      }
    },
    {
      id: 'kerala',
      name: 'Kerala',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      price: 18999,
      rating: 4.7,
      type: 'package',
      packageDetails: {
        title: 'Kerala Backwaters & Ayurveda',
        days: 5,
        nights: 4,
        highlights: ['Houseboat Stay', 'Ayurveda', 'Kathakali']
      }
    },
    {
      id: 'manali',
      name: 'Manali',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: 15999,
      rating: 4.6,
      type: 'package',
      packageDetails: {
        title: 'Manali Adventure Trek',
        days: 6,
        nights: 5,
        highlights: ['River Rafting', 'Paragliding', 'Camping']
      }
    },
    {
      id: 'udaipur',
      name: 'Udaipur',
      country: 'India',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: 13499,
      rating: 4.8,
      type: 'package',
      packageDetails: {
        title: 'Udaipur Royal Heritage',
        days: 4,
        nights: 3,
        highlights: ['Palace Visit', 'Lake Cruise', 'Folk Dance']
      }
    }
  ];

  // Featured packages
  const featuredPackages = [
    {
      id: 'p1',
      title: 'Magical Goa Beach Escape',
      location: 'Goa, India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
      price: 12999,
      originalPrice: 15000,
      rating: 4.5,
      reviews: 128,
      days: 4,
      nights: 3,
      type: 'package',
      highlights: ['Private Beach', 'Water Sports', 'Sunset Cruise']
    },
    {
      id: 'p2',
      title: 'Kerala Backwaters Retreat',
      location: 'Kerala, India',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      price: 18999,
      originalPrice: 22000,
      rating: 4.7,
      reviews: 95,
      days: 5,
      nights: 4,
      type: 'package',
      highlights: ['Houseboat', 'Ayurveda', 'Village Tour']
    },
    {
      id: 'p3',
      title: 'Manali Adventure Trek',
      location: 'Manali, India',
      image: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: 15999,
      originalPrice: 18000,
      rating: 4.6,
      reviews: 156,
      days: 6,
      nights: 5,
      type: 'package',
      highlights: ['Trekking', 'Camping', 'River Rafting']
    }
  ];

  // Flight deals
  const flightDeals = [
    {
      id: 'f1',
      from: 'Mumbai',
      to: 'Delhi',
      airline: 'IndiGo',
      price: 2999,
      departureDate: '2024-03-15',
      returnDate: '2024-03-20',
      type: 'flight'
    },
    {
      id: 'f2',
      from: 'Delhi',
      to: 'Goa',
      airline: 'SpiceJet',
      price: 3999,
      departureDate: '2024-03-18',
      returnDate: '2024-03-23',
      type: 'flight'
    },
    {
      id: 'f3',
      from: 'Bangalore',
      to: 'Kerala',
      airline: 'Air India',
      price: 3499,
      departureDate: '2024-03-20',
      returnDate: '2024-03-25',
      type: 'flight'
    }
  ];

  // Hotel deals
  const hotelDeals = [
    {
      id: 'h1',
      name: 'Taj Mahal Palace',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: 8999,
      rating: 4.9,
      type: 'hotel',
      amenities: ['Pool', 'Spa', 'Restaurant']
    },
    {
      id: 'h2',
      name: 'The Leela Palace',
      location: 'Goa',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80',
      price: 12999,
      rating: 4.8,
      type: 'hotel',
      amenities: ['Beach Access', 'Pool', 'Spa']
    },
    {
      id: 'h3',
      name: 'Oberoi Udaivilas',
      location: 'Udaipur',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: 15999,
      rating: 4.9,
      type: 'hotel',
      amenities: ['Lake View', 'Pool', 'Heritage']
    }
  ];

  // Services
  const services = [
    { id: 'flights', name: 'Flights', icon: Plane, color: 'blue', path: '/flights' },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: 'green', path: '/hotels' },
    { id: 'packages', name: 'Packages', icon: Package, color: 'purple', path: '/packages' },
    { id: 'trains', name: 'Trains', icon: Train, color: 'orange', path: '/trains' },
    { id: 'buses', name: 'Buses', icon: Bus, color: 'red', path: '/buses' },
    { id: 'cabs', name: 'Cabs', icon: Car, color: 'indigo', path: '/cabs' }
  ];

  // Handle package booking
  const handlePackageBooking = (pkg) => {
    handleBooking({
      _id: pkg.id,
      title: pkg.title || pkg.name,
      description: `Explore beautiful ${pkg.location || pkg.name}`,
      images: [{ url: pkg.image }],
      destination: {
        city: pkg.location?.split(',')[0] || pkg.name,
        country: pkg.location?.split(',')[1]?.trim() || 'India'
      },
      duration: {
        days: pkg.days || 4,
        nights: pkg.nights || 3
      },
      pricing: {
        discountedPrice: pkg.price,
        originalPrice: pkg.originalPrice || pkg.price,
        discount: pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0
      },
      rating: {
        average: pkg.rating || 4.5,
        count: pkg.reviews || 100
      },
      highlights: pkg.highlights || ['Guided Tours', 'Hotel Stay', 'Meals'],
      inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Transfer']
    }, 'package');
  };

  // Handle flight booking
  const handleFlightBooking = (flight) => {
    handleBooking({
      _id: flight.id,
      title: `${flight.from} to ${flight.to}`,
      flightDetails: flight,
      pricing: {
        discountedPrice: flight.price,
        originalPrice: flight.price
      },
      from: flight.from,
      to: flight.to,
      airline: flight.airline,
      departureDate: flight.departureDate,
      returnDate: flight.returnDate
    }, 'flight');
  };

  // Handle hotel booking
  const handleHotelBooking = (hotel) => {
    handleBooking({
      _id: hotel.id,
      name: hotel.name,
      title: hotel.name,
      description: `Luxury stay at ${hotel.name}`,
      images: [{ url: hotel.image }],
      location: hotel.location,
      pricing: {
        discountedPrice: hotel.price,
        originalPrice: hotel.price
      },
      rating: {
        average: hotel.rating,
        count: hotel.reviews || 200
      },
      amenities: hotel.amenities
    }, 'hotel');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Your Journey Begins Here
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing destinations, book flights, hotels, and curated packages
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Search className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center px-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Check-in - Check-out"
                    className="w-full py-4 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center px-4">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <select className="w-full py-4 text-gray-900 focus:outline-none bg-transparent">
                    <option>2 Travelers</option>
                    <option>3 Travelers</option>
                    <option>4 Travelers</option>
                    <option>5+ Travelers</option>
                  </select>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-b-xl flex justify-end">
                <Button variant="primary" className="px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(service.path)}
              >
                <div className={`inline-flex p-3 bg-${service.color}-100 rounded-xl mb-3`}>
                  <Icon className={`w-6 h-6 text-${service.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900">{service.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-gray-600 mt-2">Most loved places by our travelers</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/packages')}>
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <motion.div
                key={dest.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => handlePackageBooking(dest)}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-semibold">{dest.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{dest.name}</h3>
                      <span className="text-xs text-gray-500">{dest.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-3 h-3" />
                      <span>Popular Destination</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500">Starting from</span>
                        <p className="text-lg font-bold text-blue-600">₹{dest.price}</p>
                      </div>
                      <Badge variant="primary" size="sm">Book Now</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Packages */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Packages</h2>
            <p className="text-gray-600 mt-2">Handpicked just for you</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/packages')}>
            View All Packages
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => handlePackageBooking(pkg)}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                  {pkg.originalPrice && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary" className="bg-orange-500 text-white border-0">
                        {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{pkg.location}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">{pkg.days}D/{pkg.nights}N</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {pkg.highlights.slice(0, 2).map((h, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                        {h}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">₹{pkg.originalPrice}</span>
                      )}
                      <p className="text-xl font-bold text-blue-600">₹{pkg.price}</p>
                    </div>
                    <Button variant="primary" size="sm">Book Now</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Flight Deals */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Flight Deals</h2>
              <p className="text-gray-600 mt-2">Best prices on popular routes</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/flights')}>
              View All Flights
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flightDeals.map((flight) => (
              <motion.div
                key={flight.id}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleFlightBooking(flight)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Plane className="w-8 h-8 text-blue-600" />
                  <Badge variant="success">{flight.airline}</Badge>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-bold text-gray-900">{flight.from}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-bold text-gray-900">{flight.to}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{flight.departureDate}</span>
                  <span>{flight.returnDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">Starting from</span>
                    <p className="text-2xl font-bold text-blue-600">₹{flight.price}</p>
                  </div>
                  <Button variant="primary" size="sm">Book</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hotel Deals */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hotel Deals</h2>
            <p className="text-gray-600 mt-2">Luxury stays at great prices</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/hotels')}>
            View All Hotels
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotelDeals.map((hotel) => (
            <motion.div
              key={hotel.id}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => handleHotelBooking(hotel)}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{hotel.location}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.map((a, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                        {a}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">Per night</span>
                      <p className="text-xl font-bold text-blue-600">₹{hotel.price}</p>
                    </div>
                    <Button variant="primary" size="sm">Book Now</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TravelEase</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
              <p className="text-blue-100">We match and beat any price</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-blue-100">Your data is always protected</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-blue-100">We're here to help anytime</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Experiences</h3>
              <p className="text-blue-100">Handpicked just for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;