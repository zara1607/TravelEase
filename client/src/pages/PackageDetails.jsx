import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Heart, Share2, Calendar, Users, Clock,
  Check, X, ChevronLeft, ChevronRight, Plane, Hotel, Car,
  Coffee, Camera, Gift, Globe, Sun, Umbrella, Award,
  Shield, Phone, Mail, Download, Wifi, Wind, Sparkles,
  Mountain, Compass, Info, ThumbsUp, MessageCircle, Package
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { samplePackages, getPackageById } from '../data/samplePackages';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
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
      // Get package from centralized data
      const pkg = samplePackages.find(p => 
        p._id === id || 
        p.packageId === id || 
        p.id === parseInt(id) || 
        p.id === id
      ) || getPackageById(id);

      if (pkg) {
        setPackageData(pkg);
      }
      setLoading(false);
    };

    loadPackage();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/package/${id}`);
      navigate('/login');
      return;
    }

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
    return `₹${price?.toLocaleString('en-IN')}`;
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
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <Card className="overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={packageData.images[currentImage]?.url}
                  alt={packageData.images[currentImage]?.caption || packageData.title}
                  className="w-full h-full object-cover"
                />
                
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

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {packageData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImage ? 'w-4 bg-blue-600' : 'bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {['overview', 'itinerary', 'inclusions', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm capitalize whitespace-nowrap relative ${
                        activeTab === tab ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
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
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-bold mb-3">About the Package</h3>
                          <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-3">Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {packageData.highlights?.map((highlight, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-green-100 rounded-full p-1"><Check className="w-4 h-4 text-green-600" /></div>
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'itinerary' && (
                      <div className="space-y-6">
                        {packageData.itinerary?.map((day, index) => (
                          <div key={index} className="relative pl-8 pb-6 last:pb-0">
                            {index < packageData.itinerary.length - 1 && (
                              <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-blue-200"></div>
                            )}
                            <div className="absolute left-0 top-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {day.day}
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-bold text-gray-900 mb-2">{day.title}</h4>
                              <p className="text-gray-700 mb-3">{day.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {day.activities?.map((act, i) => (
                                  <Badge key={i} variant="secondary" size="sm">{act}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'inclusions' && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-bold mb-4 text-green-600">Inclusions</h3>
                          <div className="space-y-3">
                            {packageData.inclusions?.map((item, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-4 text-red-600">Exclusions</h3>
                          <div className="space-y-3">
                            {packageData.exclusions?.map((item, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <X className="w-5 h-5 text-red-500" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div className="space-y-6">
                         <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                            <div>
                              <div className="text-2xl font-bold">{packageData.rating?.average} / 5</div>
                              <div className="text-gray-600">Based on {packageData.rating?.count} reviews</div>
                            </div>
                         </div>
                         {packageData.reviews?.map((review) => (
                           <div key={review.id} className="border-b pb-4">
                             <div className="flex items-center gap-3 mb-2">
                               <img src={review.avatar} alt="" className="w-10 h-10 rounded-full" />
                               <div>
                                 <div className="font-bold">{review.user}</div>
                                 <div className="text-xs text-gray-500">{review.date}</div>
                               </div>
                             </div>
                             <p className="text-gray-700">{review.comment}</p>
                           </div>
                         ))}
                      </div>
                    )}

                    {activeTab === 'faq' && (
                      <div className="space-y-4">
                        {packageData.faqs?.map((faq, i) => (
                          <div key={i} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                              <Info className="w-4 h-4 text-blue-500" /> {faq.question}
                            </h4>
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Widget */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 line-through text-lg">
                    {formatPrice(packageData.pricing?.originalPrice)}
                  </span>
                  <Badge variant="success">Save {packageData.pricing?.discount}%</Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(packageData.pricing?.discountedPrice)}
                  </span>
                  <span className="text-gray-500 text-sm">/ person</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <div className="flex items-center border rounded-lg p-1">
                    <button 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 rotate-45" />
                    </button>
                    <span className="flex-1 text-center font-medium">{travelers}</span>
                    <button 
                      onClick={() => setTravelers(travelers + 1)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Check className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full py-4 text-lg mb-4" onClick={handleBookNow}>
                Book This Trip
              </Button>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Secure Payment Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Free Cancellation (up to 7 days before)</span>
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