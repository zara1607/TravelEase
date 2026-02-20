import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Heart, Share2, Calendar, Users, Clock,
  Check, X, ChevronLeft, ChevronRight, Plane, Hotel, Car,
  Coffee, Camera, Gift, Globe, Sun, Umbrella, Award,
  Shield, Phone, Mail, Download, Wifi, Wind, Sparkles,
  Mountain, Compass, Info, ThumbsUp, MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Mock package data (same as in PackagesPageMMT)
const SAMPLE_PACKAGES = {
  sample1: {
    _id: 'sample1',
    packageId: 'sample1',
    title: 'Magical Goa Beach Escape',
    category: 'beach',
    description: 'Enjoy the sun, sand and sea at Goa\'s best beaches with luxury accommodation and water activities. This package includes stay at premium beach resorts, daily breakfast, water sports activities, and a sunset cruise.',
    destination: {
      city: 'Goa',
      country: 'India'
    },
    duration: {
      days: 4,
      nights: 3
    },
    pricing: {
      originalPrice: 15000,
      discountedPrice: 12999,
      discount: 13
    },
    rating: {
      average: 4.5,
      count: 128
    },
    highlights: [
      'Private Beach Access',
      'Water Sports',
      'Sunset Cruise',
      'Luxury Resort',
      'Breakfast Included'
    ],
    inclusions: [
      'Flight',
      'Hotel',
      'Meals',
      'Sightseeing',
      'Transfer',
      'Water Sports',
      'Guide'
    ],
    exclusions: [
      'Personal Expenses',
      'Travel Insurance',
      'Tips & Gratuities',
      'Additional Meals'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Arrive at Goa airport. Transfer to hotel. Evening at leisure to explore nearby beach.',
        activities: ['Airport Transfer', 'Check-in', 'Beach Walk'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'North Goa Tour',
        description: 'Visit famous North Goa beaches including Calangute, Baga, and Anjuna. Enjoy water sports.',
        activities: ['Calangute Beach', 'Baga Beach', 'Water Sports', 'Market Visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'South Goa Exploration',
        description: 'Explore South Goa\'s pristine beaches and Portuguese heritage sites.',
        activities: ['Palolem Beach', 'Colva Beach', 'Church Visit', 'Sunset Cruise'],
        meals: ['Breakfast', 'Dinner']
      },
      {
        day: 4,
        title: 'Departure',
        description: 'Breakfast at hotel. Transfer to airport for departure.',
        activities: ['Breakfast', 'Check-out', 'Airport Transfer'],
        meals: ['Breakfast']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80', caption: 'Beach Resort' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80', caption: 'Pool Area' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80', caption: 'Beach View' },
      { url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80', caption: 'Water Sports' }
    ],
    bestSeason: 'Oct-Mar',
    reviews: [
      {
        id: 1,
        user: 'Rahul Sharma',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing experience! The hotel was luxurious and the beach was beautiful. Water sports were thrilling.',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 2,
        user: 'Priya Patel',
        rating: 4,
        date: '2024-01-10',
        comment: 'Great package overall. The sunset cruise was memorable. Food could be better.',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 3,
        user: 'Amit Kumar',
        rating: 5,
        date: '2024-01-05',
        comment: 'Perfect honeymoon destination! Everything was well organized.',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit?',
        answer: 'October to March is the best time with pleasant weather.'
      },
      {
        question: 'Is flight included?',
        answer: 'Yes, round-trip flights from major cities are included.'
      },
      {
        question: 'Can I customize the itinerary?',
        answer: 'Yes, we can customize based on your preferences.'
      }
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service']
  },
  sample2: {
    _id: 'sample2',
    packageId: 'sample2',
    title: 'Kerala Backwaters & Ayurveda',
    category: 'luxury',
    description: 'Experience the serene backwaters of Kerala with houseboat stay and authentic Ayurvedic treatments.',
    destination: {
      city: 'Kerala',
      country: 'India'
    },
    duration: {
      days: 5,
      nights: 4
    },
    pricing: {
      originalPrice: 22000,
      discountedPrice: 18999,
      discount: 14
    },
    rating: {
      average: 4.7,
      count: 95
    },
    highlights: ['Houseboat Stay', 'Ayurvedic Massage', 'Kathakali Performance'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Ayurveda'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kochi',
        description: 'Arrive at Kochi airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Alleppey Houseboat',
        description: 'Drive to Alleppey. Board traditional houseboat for backwater cruise.',
        activities: ['Houseboat Check-in', 'Backwater Cruise', 'Village Visit'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: 'Ayurvedic Retreat',
        description: 'Transfer to Ayurvedic resort for wellness treatments.',
        activities: ['Ayurvedic Consultation', 'Massage', 'Yoga Session'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80', caption: 'Houseboat' },
      { url: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'Backwaters' }
    ],
    bestSeason: 'Sep-Mar',
    reviews: [
      {
        id: 1,
        user: 'Sunita Reddy',
        rating: 5,
        date: '2024-01-20',
        comment: 'Best Ayurvedic experience!',
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    ],
    faqs: [
      {
        question: 'What is the best time to visit?',
        answer: 'September to March is ideal.'
      }
    ],
    amenities: ['WiFi', 'Ayurveda Center', 'Yoga Hall', 'Restaurant']
  },
  sample3: {
    _id: 'sample3',
    packageId: 'sample3',
    title: 'Manali Adventure Trek',
    category: 'adventure',
    description: 'Trek through the beautiful Himalayas, river rafting, paragliding and camping under the stars.',
    destination: {
      city: 'Manali',
      country: 'India'
    },
    duration: {
      days: 6,
      nights: 5
    },
    pricing: {
      originalPrice: 18000,
      discountedPrice: 15999,
      discount: 11
    },
    rating: {
      average: 4.6,
      count: 156
    },
    highlights: ['River Rafting', 'Paragliding', 'Camping', 'Trekking'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Activities', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali',
        description: 'Arrive at Kullu airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Local Market'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Solang Valley',
        description: 'Visit Solang Valley for paragliding and zorbing.',
        activities: ['Paragliding', 'Zorbing', 'Cable Car Ride'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'Mountain View' }
    ],
    bestSeason: 'Apr-Jun',
    reviews: [
      {
        id: 1,
        user: 'Vikram Singh',
        rating: 5,
        date: '2024-01-18',
        comment: 'Adventure of a lifetime!',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    ],
    faqs: [
      {
        question: 'Is trekking experience required?',
        answer: 'No, beginners can also join.'
      }
    ],
    amenities: ['Camping Gear', 'Trekking Guide', 'Meals', 'Transport']
  },
  sample4: {
    _id: 'sample4',
    packageId: 'sample4',
    title: 'Udaipur Royal Heritage',
    category: 'cultural',
    description: 'Explore the city of lakes, majestic palaces, and experience royal Rajasthani culture.',
    destination: {
      city: 'Udaipur',
      country: 'India'
    },
    duration: {
      days: 4,
      nights: 3
    },
    pricing: {
      originalPrice: 16000,
      discountedPrice: 13499,
      discount: 16
    },
    rating: {
      average: 4.8,
      count: 203
    },
    highlights: ['Palace Visit', 'Lake Cruise', 'Folk Dance', 'Heritage Walk'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Sightseeing', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Udaipur',
        description: 'Arrive at Udaipur airport. Transfer to heritage hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Evening Aarti'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'City Palace & Lake Pichola',
        description: 'Visit City Palace, Jagdish Temple, and enjoy boat ride on Lake Pichola.',
        activities: ['City Palace Tour', 'Boat Ride', 'Cultural Show'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80', caption: 'City Palace' }
    ],
    bestSeason: 'Oct-Mar',
    reviews: [
      {
        id: 1,
        user: 'Anjali Mehta',
        rating: 5,
        date: '2024-01-12',
        comment: 'Royal experience!',
        avatar: 'https://i.pravatar.cc/150?img=6'
      }
    ],
    faqs: [
      {
        question: 'What is included in heritage walks?',
        answer: 'Guided tours of old city and markets.'
      }
    ],
    amenities: ['Heritage Hotel', 'Guide', 'Transport', 'Meals']
  },
  sample5: {
    _id: 'sample5',
    packageId: 'sample5',
    title: 'Andaman Island Honeymoon',
    category: 'honeymoon',
    description: 'Perfect honeymoon destination with pristine beaches, coral reefs and luxury resorts.',
    destination: {
      city: 'Andaman',
      country: 'India'
    },
    duration: {
      days: 7,
      nights: 6
    },
    pricing: {
      originalPrice: 35000,
      discountedPrice: 29999,
      discount: 14
    },
    rating: {
      average: 4.9,
      count: 167
    },
    highlights: ['Snorkeling', 'Scuba Diving', 'Sea Walking', 'Sunset View'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Activities', 'Transfer'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Port Blair',
        description: 'Arrive at Port Blair airport. Transfer to hotel.',
        activities: ['Airport Transfer', 'Check-in', 'Cellular Jail Visit'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Havelock Island',
        description: 'Ferry to Havelock. Visit Radhanagar Beach.',
        activities: ['Ferry Ride', 'Beach Time', 'Sunset View'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80', caption: 'Andaman Beach' }
    ],
    bestSeason: 'Nov-May',
    reviews: [
      {
        id: 1,
        user: 'Neha & Raj',
        rating: 5,
        date: '2024-01-08',
        comment: 'Perfect honeymoon!',
        avatar: 'https://i.pravatar.cc/150?img=7'
      }
    ],
    faqs: [
      {
        question: 'Is scuba diving safe for beginners?',
        answer: 'Yes, professional instructors guide you.'
      }
    ],
    amenities: ['Luxury Resort', 'Water Sports', 'Private Transfers', 'Candlelight Dinner']
  },
  sample6: {
    _id: 'sample6',
    packageId: 'sample6',
    title: 'Ranthambore Wildlife Safari',
    category: 'wildlife',
    description: 'Spot tigers and wildlife in their natural habitat with expert guides and luxury tents.',
    destination: {
      city: 'Ranthambore',
      country: 'India'
    },
    duration: {
      days: 3,
      nights: 2
    },
    pricing: {
      originalPrice: 12000,
      discountedPrice: 9999,
      discount: 17
    },
    rating: {
      average: 4.4,
      count: 89
    },
    highlights: ['Tiger Safari', 'Bird Watching', 'Nature Walk', 'Photography'],
    inclusions: ['Flight', 'Hotel', 'Meals', 'Safari', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Ranthambore',
        description: 'Arrive at Sawai Madhopur railway station. Transfer to resort.',
        activities: ['Check-in', 'Nature Walk', 'Welcome Dinner'],
        meals: ['Dinner']
      },
      {
        day: 2,
        title: 'Tiger Safari',
        description: 'Morning and evening safari in Ranthambore National Park.',
        activities: ['Morning Safari', 'Afternoon Rest', 'Evening Safari'],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      }
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80', caption: 'Tiger Safari' }
    ],
    bestSeason: 'Oct-Jun',
    reviews: [
      {
        id: 1,
        user: 'Arjun Nair',
        rating: 5,
        date: '2024-01-03',
        comment: 'Saw a tiger! Amazing experience.',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    ],
    faqs: [
      {
        question: 'What are the chances of seeing a tiger?',
        answer: 'High during morning safaris.'
      }
    ],
    amenities: ['Luxury Tent', 'Safari Vehicle', 'Naturalist Guide', 'Bonfire']
  }
};

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    // Load package data
    const loadPackage = () => {
      setLoading(true);
      // Get package from mock data
      const pkg = SAMPLE_PACKAGES[id];
      if (pkg) {
        setPackageData(pkg);
      }
      setLoading(false);
    };

    loadPackage();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      // Save intent and redirect to login
      sessionStorage.setItem('redirectAfterLogin', `/package/${id}`);
      navigate('/login');
      return;
    }

    // Navigate to booking page with package data
    navigate('/booking', {
      state: {
        item: {
          ...packageData,
          type: 'package',
          selectedDate,
          travelers
        }
      }
    });
  };

  const handlePreviousImage = () => {
    setCurrentImage(prev => 
      prev === 0 ? packageData.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImage(prev => 
      prev === packageData.images.length - 1 ? 0 : prev + 1
    );
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      beach: <Umbrella className="w-5 h-5" />,
      adventure: <Mountain className="w-5 h-5" />,
      honeymoon: <Heart className="w-5 h-5" />,
      family: <Users className="w-5 h-5" />,
      luxury: <Sparkles className="w-5 h-5" />,
      cultural: <Compass className="w-5 h-5" />,
      wildlife: <Sun className="w-5 h-5" />
    };
    return icons[category] || <Package className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h2>
          <p className="text-gray-600 mb-6">The package you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/packages')}>
            Browse Packages
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
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/packages')} className="hover:text-blue-600">Packages</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{packageData.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={packageData.images[currentImage]?.url}
                  alt={packageData.images[currentImage]?.caption || packageData.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {packageData.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {packageData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage
                          ? 'w-4 bg-blue-600'
                          : 'bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg relative"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {packageData.images.length > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2 overflow-x-auto">
                    {packageData.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImage ? 'border-blue-600' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {['overview', 'itinerary', 'inclusions', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm capitalize transition-colors relative ${
                        activeTab === tab
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold mb-3">About the Package</h3>
                          <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-3">Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {packageData.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-green-100 rounded-full p-1">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-3">Amenities</h3>
                          <div className="flex flex-wrap gap-2">
                            {packageData.amenities?.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Itinerary Tab */}
                    {activeTab === 'itinerary' && (
                      <div className="space-y-6">
                        {packageData.itinerary.map((day, index) => (
                          <div key={index} className="relative pl-8 pb-6 last:pb-0">
                            {/* Timeline Line */}
                            {index < packageData.itinerary.length - 1 && (
                              <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-blue-200"></div>
                            )}
                            
                            {/* Day Circle */}
                            <div className="absolute left-0 top-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {day.day}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-bold text-gray-900 mb-2">{day.title}</h4>
                              <p className="text-gray-700 mb-3">{day.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {day.activities.map((activity, i) => (
                                  <Badge key={i} variant="secondary" size="sm" className="bg-blue-50 text-blue-700">
                                    {activity}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Coffee className="w-4 h-4" />
                                <span>Meals: {day.meals.join(' • ')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inclusions Tab */}
                    {activeTab === 'inclusions' && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-bold mb-4 text-green-600">Inclusions</h3>
                          <div className="space-y-3">
                            {packageData.inclusions.map((item, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="bg-green-100 rounded-full p-1">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-4 text-red-600">Exclusions</h3>
                          <div className="space-y-3">
                            {packageData.exclusions?.map((item, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="bg-red-100 rounded-full p-1">
                                  <X className="w-4 h-4 text-red-600" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                      <div className="space-y-6">
                        {/* Rating Summary */}
                        <div className="flex items-center gap-8 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">{packageData.rating.average}</div>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= Math.round(packageData.rating.average)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{packageData.rating.count} reviews</div>
                          </div>
                          <div className="flex-1">
                            {/* Rating bars would go here */}
                          </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-4">
                          {packageData.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                              <div className="flex items-start gap-3 mb-2">
                                <img
                                  src={review.avatar}
                                  alt={review.user}
                                  className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-900">{review.user}</h4>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-3 h-3 ${
                                          star <= review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm ml-13">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                      <div className="space-y-4">
                        {packageData.faqs.map((faq, index) => (
                          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-blue-600" />
                              {faq.question}
                            </h4>
                            <p className="text-gray-700 text-sm ml-6">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(packageData.pricing.discountedPrice)}
                    </span>
                    <span className="text-gray-600">per person</span>
                  </div>
                  {packageData.pricing.originalPrice !== packageData.pricing.discountedPrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(packageData.pricing.originalPrice)}
                      </span>
                      <Badge variant="primary" size="sm" className="bg-green-100 text-green-700 border-green-200">
                        Save {packageData.pricing.discount}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Trip Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Select Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Travelers</label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{packageData.duration.days} Days / {packageData.duration.nights} Nights</div>
                      <div className="text-sm text-gray-500">Best time: {packageData.bestSeason}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{packageData.destination.city}</div>
                      <div className="text-sm text-gray-500">{packageData.destination.country}</div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Price Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price ({travelers} {travelers === 1 ? 'person' : 'persons'})</span>
                      <span className="text-gray-900">{formatPrice(packageData.pricing.discountedPrice * travelers)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="text-gray-900">Included</span>
                    </div>
                    {packageData.pricing.originalPrice !== packageData.pricing.discountedPrice && (
                      <div className="flex justify-between text-green-600">
                        <span>You Save</span>
                        <span>- {formatPrice((packageData.pricing.originalPrice - packageData.pricing.discountedPrice) * travelers)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-blue-600">{formatPrice(packageData.pricing.discountedPrice * travelers)}</span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                  className="mb-4"
                >
                  Book Now
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Secure Booking</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">24/7 Support</span>
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

export default PackageDetails;