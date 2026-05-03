// src/pages/DestinationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Star, Calendar, Users, Clock,
  ChevronLeft, ChevronRight, Heart, Share2,
  Sun, Umbrella, Mountain, Coffee, Camera,
  Wifi, Car, Utensils, Wind, Award, Shield,
  Phone, Check, X, ThumbsUp, MessageCircle
} from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';

// Simple Tab Navigation Component
const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call / data loading
    const loadDestination = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with real API call later
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock data - in real app, fetch by id
        const mockData = {
          id: id || 'dubai',
          name: 'Dubai',
          country: 'UAE',
          description: 'Experience the epitome of luxury in the desert metropolis.',
          longDescription: 'Dubai is a city of superlatives: home to the world\'s tallest building, the largest shopping mall, and the most luxurious hotels. Beyond the glitz, you\'ll find a rich cultural heritage in the historic Al Fahidi district, aromatic spice and gold souks, and vast desert landscapes waiting to be explored.',
          images: [
            'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1577147446927-e5c1c5d33b9e?w=1200&auto=format&fit=crop'
          ],
          price: 45000,
          rating: 4.9,
          reviewsCount: 1250,
          bestTime: 'November to March',
          currency: 'AED',
          language: 'Arabic, English',
          timezone: 'GST (UTC+4)',
          popularActivities: [
            'Burj Khalifa Observation Deck',
            'Desert Safari with Dinner',
            'Dubai Mall & Aquarium',
            'Abra Ride in Dubai Creek',
            'Palm Jumeirah Monorail',
            'Global Village'
          ],
          featuredPackages: [
            {
              id: 'pkg1',
              title: 'Dubai Luxury Escape',
              nights: 5,
              price: 75000,
              image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop'
            },
            {
              id: 'pkg2',
              title: 'Desert Adventure',
              nights: 3,
              price: 45000,
              image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=800&auto=format&fit=crop'
            }
          ],
          reviews: [
            {
              id: 1,
              user: 'Rajesh Kumar',
              rating: 5,
              date: '2024-02-15',
              comment: 'Amazing city! The blend of modern and traditional is incredible.',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            {
              id: 2,
              user: 'Priya Singh',
              rating: 5,
              date: '2024-02-10',
              comment: 'Desert safari was the highlight of our trip. Highly recommended!',
              avatar: 'https://i.pravatar.cc/150?img=2'
            }
          ],
          weather: {
            summer: '35-45°C',
            winter: '20-30°C',
            monsoon: '25-35°C'
          },
          highlights: [
            'Burj Khalifa - Tallest building in the world',
            'Dubai Mall - World\'s largest shopping mall',
            'Desert Safari - Dune bashing and camel rides',
            'Palm Jumeirah - Iconic man-made island',
            'Dubai Fountain - World\'s largest choreographed fountain'
          ]
        };

        // In real app: filter by id
        setDestination(mockData);
      } catch (err) {
        setError('Failed to load destination details');
      } finally {
        setLoading(false);
      }
    };

    loadDestination();
  }, [id]);

  const handlePreviousImage = () => {
    if (!destination?.images?.length) return;
    setCurrentImage(prev => (prev === 0 ? destination.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!destination?.images?.length) return;
    setCurrentImage(prev => (prev === destination.images.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activities', label: 'Activities' },
    { id: 'packages', label: 'Packages' },
    { id: 'reviews', label: 'Reviews' }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading destination details...</p>
        </div>
      </div>
    );
  }

  // Error / not found
  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-4">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Destination Not Found</h2>
          <p className="text-gray-600 mb-8">
            The destination you're looking for doesn't exist or could not be loaded.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
            Home
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button onClick={() => navigate('/destinations')} className="hover:text-blue-600 transition-colors">
            Destinations
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{destination.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left/Top */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <Card className="overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/2]">
                <img
                  src={destination.images[currentImage]}
                  alt={`${destination.name} - Image ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />

                {destination.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Indicators */}
                {destination.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {destination.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === currentImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Wishlist + Share */}
                <div className="absolute top-4 right-4 flex gap-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all backdrop-blur-sm">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Card className="overflow-hidden shadow-lg">
              <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="p-6 lg:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                          <p className="text-gray-700 leading-relaxed">{destination.longDescription}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {destination.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                            <p className="font-medium">Summer</p>
                            <p className="text-gray-600">{destination.weather.summer}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <Wind className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <p className="font-medium">Winter</p>
                            <p className="text-gray-600">{destination.weather.winter}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <Umbrella className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <p className="font-medium">Monsoon</p>
                            <p className="text-gray-600">{destination.weather.monsoon}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'activities' && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Activities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {destination.popularActivities.map((activity, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                              <Camera className="w-6 h-6 text-blue-600 flex-shrink-0" />
                              <span className="text-gray-800">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'packages' && (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Packages</h2>
                        <div className="space-y-4">
                          {destination.featuredPackages.map((pkg) => (
                            <motion.div
                              key={pkg.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => navigate(`/package/${pkg.id}`)}
                              className="flex items-center gap-5 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                              <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-24 h-24 rounded-lg object-cover shadow-sm"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{pkg.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{pkg.nights} Nights</p>
                                <p className="text-lg font-bold text-blue-600 mt-2">
                                  {formatPrice(pkg.price)}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div>
                        <div className="flex items-center gap-6 mb-8">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900">{destination.rating}</div>
                            <div className="flex justify-center gap-1 mt-2">
                              {Array(5).fill(0).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.round(destination.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 mt-1">{destination.reviewsCount} reviews</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {destination.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                              <div className="flex items-start gap-4">
                                <img
                                  src={review.avatar}
                                  alt={review.user}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-gray-900">{review.user}</h4>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                  </div>
                                  <div className="flex mt-1">
                                    {Array(5).fill(0).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="mt-3 text-gray-700">{review.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
          </div>

          {/* Sidebar - Booking & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Starting from</p>
                    <div className="text-4xl font-bold text-blue-600">
                      {formatPrice(destination.price)}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">per person • flexible duration</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>Best time: {destination.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{destination.country}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="mb-4"
                    onClick={() => navigate(`/packages?destination=${destination.id}`)}
                  >
                    View All Packages
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => navigate('/contact')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Talk to Expert
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Why Book With Us</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Secure Booking</p>
                    </div>
                    <div>
                      <Headphones className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">24/7 Support</p>
                    </div>
                    <div>
                      <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Best Price</p>
                    </div>
                    <div>
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Free Cancellation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;