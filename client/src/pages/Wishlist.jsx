import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Hotel, Package, Train, Bus, Car,
  MapPin, Calendar, Users, Star, Heart, 
  Clock, ChevronRight, X, AlertCircle, CheckCircle,
  ShoppingCart, Bell, BellOff, Share2, Filter,
  Search, SlidersHorizontal, ArrowUpDown, Tag,
  Award, TrendingUp, Eye, Trash2, RefreshCw,
  Wifi, Coffee, Battery, Briefcase, Luggage
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [priceAlerts, setPriceAlerts] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareList, setShareList] = useState(false);

  // Mock Wishlist Data
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      // In production, replace with actual API call
      // const response = await axios.get(`${API_URL}/wishlist`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // });
      // setWishlist(response.data.items);

      // Mock data for demonstration
      setTimeout(() => {
        const mockWishlist = generateMockWishlist();
        setWishlist(mockWishlist);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
      setLoading(false);
    }
  };

  const generateMockWishlist = () => {
    return [
      // Flights
      {
        id: 'wish_fl001',
        type: 'flight',
        addedDate: '2024-02-15',
        title: 'Mumbai to Delhi',
        from: 'Mumbai (BOM)',
        to: 'Delhi (DEL)',
        airline: 'IndiGo',
        flightNumber: '6E-123',
        departureTime: '10:30 AM',
        arrivalTime: '12:45 PM',
        duration: '2h 15m',
        price: 4599,
        originalPrice: 5299,
        discount: 13,
        rating: 4.5,
        reviews: 1245,
        availability: 'available',
        priceDrop: true,
        priceDropAmount: 700,
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
        tags: ['Popular Route', 'Best Price']
      },
      {
        id: 'wish_fl002',
        type: 'flight',
        addedDate: '2024-02-10',
        title: 'Delhi to Goa',
        from: 'Delhi (DEL)',
        to: 'Goa (GOI)',
        airline: 'SpiceJet',
        flightNumber: 'SG-456',
        departureTime: '06:15 AM',
        arrivalTime: '08:30 AM',
        duration: '2h 15m',
        price: 3899,
        originalPrice: 3899,
        discount: 0,
        rating: 4.2,
        reviews: 876,
        availability: 'limited',
        priceDrop: false,
        image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        tags: ['Early Bird']
      },

      // Hotels
      {
        id: 'wish_ht001',
        type: 'hotel',
        addedDate: '2024-02-18',
        title: 'Taj Mahal Palace',
        location: 'Mumbai',
        rating: 4.9,
        reviews: 2341,
        price: 18999,
        originalPrice: 22999,
        discount: 17,
        roomType: 'Deluxe Room',
        checkIn: 'Flexible',
        nights: 3,
        amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'],
        availability: 'available',
        priceDrop: true,
        priceDropAmount: 4000,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        tags: ['Luxury', '5 Star']
      },
      {
        id: 'wish_ht002',
        type: 'hotel',
        addedDate: '2024-02-12',
        title: 'The Leela Palace',
        location: 'Goa',
        rating: 4.7,
        reviews: 1876,
        price: 12999,
        originalPrice: 12999,
        discount: 0,
        roomType: 'Premium Room',
        checkIn: 'Flexible',
        nights: 2,
        amenities: ['Beach Access', 'Pool', 'Restaurant'],
        availability: 'available',
        priceDrop: false,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80',
        tags: ['Beachfront']
      },

      // Packages
      {
        id: 'wish_pk001',
        type: 'package',
        addedDate: '2024-02-20',
        title: 'Magical Goa Honeymoon Special',
        destination: 'Goa',
        duration: '5 Days / 4 Nights',
        rating: 4.8,
        reviews: 892,
        price: 45999,
        originalPrice: 54999,
        discount: 16,
        inclusions: ['Flights', 'Hotels', 'Meals', 'Sightseeing'],
        availability: 'available',
        priceDrop: true,
        priceDropAmount: 9000,
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80',
        tags: ['Honeymoon', 'All Inclusive']
      },
      {
        id: 'wish_pk002',
        type: 'package',
        addedDate: '2024-02-14',
        title: 'Kerala Backwaters Family Tour',
        destination: 'Kerala',
        duration: '6 Days / 5 Nights',
        rating: 4.6,
        reviews: 654,
        price: 35999,
        originalPrice: 35999,
        discount: 0,
        inclusions: ['Flights', 'Houseboat', 'Meals', 'Activities'],
        availability: 'limited',
        priceDrop: false,
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        tags: ['Family Special']
      },

      // Trains
      {
        id: 'wish_tr001',
        type: 'train',
        addedDate: '2024-02-16',
        title: 'Rajdhani Express',
        from: 'Mumbai CST',
        to: 'Delhi H Nizamuddin',
        trainNumber: '12951',
        class: 'AC 3 Tier',
        departureTime: '16:35',
        arrivalTime: '08:30',
        duration: '15h 55m',
        price: 1899,
        originalPrice: 1899,
        discount: 0,
        rating: 4.3,
        reviews: 3456,
        availability: 'available',
        priceDrop: false,
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1184&q=80',
        tags: ['Superfast']
      },

      // Buses
      {
        id: 'wish_bs001',
        type: 'bus',
        addedDate: '2024-02-13',
        title: 'VRL Travels',
        from: 'Bangalore',
        to: 'Mysore',
        busType: 'Volvo A/C Sleeper',
        departureTime: '22:30',
        arrivalTime: '04:30',
        duration: '6h',
        price: 899,
        originalPrice: 1099,
        discount: 18,
        rating: 4.1,
        reviews: 2345,
        availability: 'available',
        priceDrop: true,
        priceDropAmount: 200,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
        tags: ['AC Sleeper']
      },

      // Cabs
      {
        id: 'wish_cb001',
        type: 'cab',
        addedDate: '2024-02-19',
        title: 'Toyota Innova',
        pickupLocation: 'Mumbai Airport',
        dropLocation: 'Lonavala',
        cabType: 'SUV',
        distance: '85 km',
        duration: '3 hours',
        price: 2499,
        originalPrice: 2999,
        discount: 17,
        rating: 4.5,
        reviews: 567,
        availability: 'available',
        priceDrop: true,
        priceDropAmount: 500,
        image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        tags: ['SUV', 'Airport Transfer']
      }
    ];
  };

  const tabs = [
    { id: 'all', label: 'All Items', icon: Heart, count: wishlist.length },
    { id: 'flight', label: 'Flights', icon: Plane, count: wishlist.filter(item => item.type === 'flight').length },
    { id: 'hotel', label: 'Hotels', icon: Hotel, count: wishlist.filter(item => item.type === 'hotel').length },
    { id: 'package', label: 'Packages', icon: Package, count: wishlist.filter(item => item.type === 'package').length },
    { id: 'train', label: 'Trains', icon: Train, count: wishlist.filter(item => item.type === 'train').length },
    { id: 'bus', label: 'Buses', icon: Bus, count: wishlist.filter(item => item.type === 'bus').length },
    { id: 'cab', label: 'Cabs', icon: Car, count: wishlist.filter(item => item.type === 'cab').length }
  ];

  const getServiceIcon = (type) => {
    const icons = {
      flight: Plane,
      hotel: Hotel,
      package: Package,
      train: Train,
      bus: Bus,
      cab: Car
    };
    return icons[type] || Heart;
  };

  const getServiceColor = (type) => {
    const colors = {
      flight: 'blue',
      hotel: 'green',
      package: 'purple',
      train: 'orange',
      bus: 'red',
      cab: 'indigo'
    };
    return colors[type] || 'gray';
  };

  const getAvailabilityBadge = (availability) => {
    const variants = {
      available: { variant: 'success', label: 'Available', icon: CheckCircle },
      limited: { variant: 'warning', label: 'Limited Seats', icon: AlertCircle },
      soldOut: { variant: 'danger', label: 'Sold Out', icon: X }
    };
    return variants[availability] || variants.available;
  };

  const filteredItems = wishlist.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.location?.toLowerCase().includes(searchLower) ||
        item.destination?.toLowerCase().includes(searchLower) ||
        item.from?.toLowerCase().includes(searchLower) ||
        item.to?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.addedDate) - new Date(a.addedDate);
    } else if (sortBy === 'date-asc') {
      return new Date(a.addedDate) - new Date(b.addedDate);
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  const handleRemoveFromWishlist = async (item) => {
    setActionLoading(prev => ({ ...prev, [item.id]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setWishlist(prev => prev.filter(i => i.id !== item.id));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    } finally {
      setActionLoading(prev => ({ ...prev, [item.id]: false }));
      setItemToRemove(null);
      setShowRemoveModal(false);
    }
  };

  const handleTogglePriceAlert = (itemId) => {
    setPriceAlerts(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
    toast.success(priceAlerts[itemId] ? 'Price alert disabled' : 'Price alert enabled');
  };

  const handleBookNow = (item) => {
    const path = `/${item.type === 'package' ? 'packages' : item.type + 's'}`;
    navigate(path, { 
      state: { 
        prefill: item,
        fromWishlist: true 
      } 
    });
  };

  const handleViewDetails = (item) => {
    if (item.type === 'package') {
      navigate(`/package/${item.id.replace('wish_', '')}`);
    } else {
      navigate(`/${item.type}s/${item.id.replace('wish_', '')}`);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === sortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedItems.map(item => item.id));
    }
  };

  const handleBulkRemove = async () => {
    setActionLoading(prev => ({ ...prev, bulk: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setWishlist(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      toast.success(`${selectedItems.length} items removed from wishlist`);
    } catch (error) {
      toast.error('Failed to remove items');
    } finally {
      setActionLoading(prev => ({ ...prev, bulk: false }));
    }
  };

  const handleShareWishlist = () => {
    setShowShareModal(true);
  };

  const copyWishlistLink = () => {
    navigator.clipboard.writeText(window.location.href + '/shared');
    toast.success('Wishlist link copied to clipboard');
    setShowShareModal(false);
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Skeleton Header */}
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Skeleton Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Skeleton Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Skeleton Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="h-40 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => setShowRemoveModal(true)}
                disabled={actionLoading.bulk}
              >
                {actionLoading.bulk ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Remove {selectedItems.length}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareWishlist}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{wishlist.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(wishlist.reduce((sum, item) => sum + item.price, 0))}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">You Save</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatPrice(wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0))}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Price Drops</p>
                <p className="text-3xl font-bold text-orange-600">
                  {wishlist.filter(item => item.priceDrop).length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your wishlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="rating">Top Rated</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </Button>
            </div>
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
                <Card className="mt-4 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">Any</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4">4+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="">All</option>
                        <option value="available">Available</option>
                        <option value="limited">Limited Seats</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Drops
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Show only items with price drops</span>
                      </label>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge 
                      variant={isActive ? 'primary' : 'secondary'} 
                      size="sm"
                      className={isActive ? 'bg-white text-blue-600' : ''}
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedItems.length === sortedItems.length}
                onChange={handleSelectAll}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowRemoveModal(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Selected
              </Button>
            </div>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {sortedItems.map((item) => {
                const ServiceIcon = getServiceIcon(item.type);
                const serviceColor = getServiceColor(item.type);
                const availabilityBadge = getAvailabilityBadge(item.availability);
                const AvailabilityIcon = availabilityBadge.icon;
                const isSelected = selectedItems.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-3 left-3 z-10">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectItem(item.id)}
                            className="w-5 h-5 text-blue-600 rounded bg-white/90 border-gray-300 focus:ring-blue-500"
                          />
                        </div>

                        {/* Service Icon */}
                        <div className={`absolute top-3 right-3 p-2 bg-${serviceColor}-600 rounded-lg shadow-lg z-10`}>
                          <ServiceIcon className="w-4 h-4 text-white" />
                        </div>

                        {/* Price Drop Badge */}
                        {item.priceDrop && (
                          <div className="absolute top-3 left-12 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                            <Bell className="w-3 h-3" />
                            ₹{item.priceDropAmount} Drop
                          </div>
                        )}

                        {/* Discount Badge */}
                        {item.discount > 0 && (
                          <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg z-10">
                            {item.discount}% OFF
                          </div>
                        )}

                        {/* Availability Badge */}
                        <div className="absolute bottom-3 right-3 z-10">
                          <Badge 
                            variant={availabilityBadge.variant}
                            className="flex items-center gap-1 shadow-lg"
                          >
                            <AvailabilityIcon className="w-3 h-3" />
                            {availabilityBadge.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4">
                        {/* Title & Rating */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          {item.rating && (
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-bold">{item.rating}</span>
                              <span className="text-xs text-gray-500">({item.reviews})</span>
                            </div>
                          )}
                        </div>

                        {/* Location/Route */}
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {item.location || item.destination || `${item.from} → ${item.to}`}
                          </span>
                        </div>

                        {/* Service-specific details */}
                        <div className="space-y-1 mb-3">
                          {item.type === 'flight' && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.airline}</span>
                              <span>•</span>
                              <span>{item.departureTime} - {item.arrivalTime}</span>
                              <span>•</span>
                              <span>{item.duration}</span>
                            </div>
                          )}

                          {item.type === 'hotel' && (
                            <div className="flex flex-wrap gap-1">
                              {item.amenities?.slice(0, 3).map((amenity, i) => (
                                <Badge key={i} variant="secondary" size="sm" className="bg-gray-100">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {item.type === 'package' && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.duration}</span>
                              <span>•</span>
                              <span>{item.inclusions?.length} Inclusions</span>
                            </div>
                          )}

                          {item.type === 'train' && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.trainNumber}</span>
                              <span>•</span>
                              <span>{item.class}</span>
                              <span>•</span>
                              <span>{item.duration}</span>
                            </div>
                          )}

                          {item.type === 'bus' && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.busType}</span>
                              <span>•</span>
                              <span>{item.departureTime}</span>
                              <span>•</span>
                              <span>{item.duration}</span>
                            </div>
                          )}

                          {item.type === 'cab' && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{item.cabType}</span>
                              <span>•</span>
                              <span>{item.distance}</span>
                              <span>•</span>
                              <span>{item.duration}</span>
                            </div>
                          )}

                          {/* Tags */}
                          {item.tags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Price Section */}
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            {item.originalPrice !== item.price && (
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                                <span className="text-green-600 font-medium">
                                  Save {formatPrice(item.originalPrice - item.price)}
                                </span>
                              </div>
                            )}
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold text-gray-900">
                                {formatPrice(item.price)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {item.type === 'hotel' ? '/night' : 
                                 item.type === 'flight' || item.type === 'train' || item.type === 'bus' ? '/person' : ''}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Added {formatDate(item.addedDate)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleBookNow(item)}
                            disabled={item.availability === 'soldOut'}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="!px-2"
                            onClick={() => handleTogglePriceAlert(item.id)}
                          >
                            {priceAlerts[item.id] ? (
                              <Bell className="w-4 h-4 text-blue-600" />
                            ) : (
                              <BellOff className="w-4 h-4 text-gray-600" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="!px-2 text-red-600 hover:text-red-700"
                            onClick={() => {
                              setItemToRemove(item);
                              setShowRemoveModal(true);
                            }}
                            disabled={actionLoading[item.id]}
                          >
                            {actionLoading[item.id] ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start adding items you love to your wishlist. They'll appear here for easy booking later.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={() => navigate('/')}>
                Explore Travel Options
              </Button>
              <Button variant="outline" onClick={() => navigate('/packages')}>
                Browse Packages
              </Button>
            </div>

            {/* Suggestions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Popular Categories</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Beach Getaways', 'Mountain Retreats', 'City Breaks', 'Adventure Tours', 'Luxury Stays'].map((cat, i) => (
                  <button
                    key={i}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    onClick={() => navigate('/packages')}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      <AnimatePresence>
        {showRemoveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-red-600">Remove from Wishlist</h3>
                  <button
                    onClick={() => {
                      setShowRemoveModal(false);
                      setItemToRemove(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-red-600">
                    {selectedItems.length > 0 
                      ? `Are you sure you want to remove ${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} from your wishlist?`
                      : `Are you sure you want to remove "${itemToRemove?.title}" from your wishlist?`
                    }
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      setShowRemoveModal(false);
                      setItemToRemove(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={() => {
                      if (selectedItems.length > 0) {
                        handleBulkRemove();
                      } else if (itemToRemove) {
                        handleRemoveFromWishlist(itemToRemove);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Share Wishlist</h3>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={shareList}
                      onChange={(e) => setShareList(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Share entire wishlist</p>
                      <p className="text-sm text-gray-500">Share all your saved items</p>
                    </div>
                  </label>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Share via</p>
                    <div className="grid grid-cols-4 gap-2">
                      {['WhatsApp', 'Email', 'Facebook', 'Twitter'].map((platform, i) => (
                        <button
                          key={i}
                          className="p-3 bg-white rounded-lg text-center hover:shadow-md transition-shadow"
                        >
                          <div className="text-xs font-medium text-gray-700">{platform}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or copy link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={`${window.location.origin}/wishlist/shared`}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                      />
                      <Button variant="primary" onClick={copyWishlistLink}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;