// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Heart, ChevronRight, 
  Plane, Hotel, Package, Train, Bus, Car,
  Calendar, Users, Clock, Award, Shield,
  Sparkles, TrendingUp, Camera, Coffee,
  Sun, Umbrella, Mountain, Compass, Ship,
  Headphones, Wallet, Gift, Quote, ArrowRight, 
  CheckCircle, Percent, Crown, Zap, Globe, ThumbsUp,
  Phone, Mail, Facebook, Twitter, Instagram,
  Linkedin, Youtube, Tag, Timer, Gift as GiftIcon,
  Wifi, Coffee as CoffeeIcon, Utensils, 
  AlertCircle, Loader, Snowflake, Sparkle,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Eye, Lock, Headphones as HeadphonesIcon, CreditCard
} from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import Button from '../ui/Button';
import Card, { CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Skeleton from '../ui/Skeleton';
import useInView from '../hooks/useInView';
import HeroSearch from '../sections/hero/HeroSearch';
import Footer from '../sections/footer/Footer';

// Premium Coupon Carousel Component
const CouponCarousel = () => {
  const navigate = useNavigate();
  const coupons = [
    {
      id: 'sample1',
      code: 'SUMMER25',
      discount: '25% OFF',
      description: 'On all summer packages',
      validity: 'Valid until May 31',
      minBooking: 'Min. ₹25,000',
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-gradient-to-br from-amber-500 to-orange-500'
    },
    {
      id: 'sample2',
      code: 'TRAVEL10',
      discount: '10% OFF',
      description: 'On international flights',
      validity: 'Valid until Apr 30',
      minBooking: 'Min. ₹10,000',
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      id: 'sample3',
      code: 'HOTEL20',
      discount: '20% OFF',
      description: 'On luxury hotel stays',
      validity: 'Valid until Jun 15',
      minBooking: 'Min. ₹15,000',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      id: 'sample4',
      code: 'WEEKEND15',
      discount: '15% OFF',
      description: 'On weekend getaways',
      validity: 'Fri-Sun bookings',
      minBooking: 'Min. ₹12,000',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      id: 'sample5',
      code: 'FAMILY30',
      discount: '30% OFF',
      description: 'On family packages',
      validity: 'For 4+ travelers',
      minBooking: 'Min. ₹50,000',
      gradient: 'from-red-500 to-rose-500',
      bg: 'bg-gradient-to-br from-red-500 to-rose-500'
    }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Arrows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => scroll('left')}
          className="bg-white shadow-xl rounded-full p-3 ml-4 hover:bg-gray-50 transition-all hover:scale-110"
          aria-label="Previous coupons"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => scroll('right')}
          className="bg-white shadow-xl rounded-full p-3 mr-4 hover:bg-gray-50 transition-all hover:scale-110"
          aria-label="Next coupons"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-none w-80 snap-start cursor-pointer"
            onClick={() => navigate(`/details/deal/${coupon.id}`)}
          >
            <div className={`${coupon.bg} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}>
              <div className="flex justify-between items-start mb-3">
                <Badge variant="primary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  {coupon.code}
                </Badge>
                <Percent className="w-5 h-5 text-white/80" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{coupon.discount}</h3>
              <p className="text-white/90 text-sm mb-3">{coupon.description}</p>
              <div className="space-y-1 mb-4">
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {coupon.validity}
                </p>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {coupon.minBooking}
                </p>
              </div>
              <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2.5 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {coupons.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: index * 320,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.abs((scrollRef.current?.scrollLeft || 0) - index * 320) < 100
                ? 'w-6 bg-blue-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to coupon ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Summer Sale Banner Component
const SummerSaleBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-2xl">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Badge variant="warning" className="bg-yellow-400 text-gray-900 mb-3 inline-flex items-center">
              <Sparkle className="w-4 h-4 mr-1" />
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Summer Sale is Live! 🔥
            </h2>
            <p className="text-white/90 text-lg max-w-2xl">
              Get up to 40% off on flights, hotels & holiday packages. Book now and save big on your dream vacation.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl"
            onClick={() => navigate('/packages')}
          >
            View All Packages
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Updated PremiumDealCard Component (with improved category handling)
const PremiumDealCard = ({ deal, index, inView, type = 'seasonal' }) => {
  const navigate = useNavigate();
  const Icon = deal.icon || Gift;

  const getCardStyles = () => {
    switch(type) {
      case 'seasonal':
        return 'h-80';
      case 'popular':
        return 'h-72';
      case 'daily':
        return 'h-64 border-2 border-orange-100';
      default:
        return 'h-72';
    }
  };

  const handleCardClick = () => {
    // Use the category from the deal to determine the route
    // If no category is specified, use the type prop as fallback
    let routeType = deal.category || type;
    
    // For seasonal deals, ensure we use 'seasonal' route
    if (type === 'seasonal' || deal.category === 'seasonal') {
      routeType = 'seasonal';
    }
    // For daily deals, ensure we use 'deal' route
    else if (type === 'daily' || deal.category === 'deal') {
      routeType = 'deal';
    }
    
    navigate(`/details/${routeType}/${deal.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group cursor-pointer"
    >
      <Card className={`overflow-hidden h-full hover:shadow-2xl transition-all duration-500 ${getCardStyles()}`}>
        <div className="relative h-full">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {deal.badge && (
              <Badge variant="primary" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
                <Icon className="w-3 h-3 mr-1" />
                {deal.badge}
              </Badge>
            )}
            {deal.discount && (
              <Badge variant="warning" className="bg-orange-500 text-white border-0 shadow-lg">
                <Percent className="w-3 h-3 mr-1" />
                {deal.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Popularity Badge for Popular Deals */}
          {type === 'popular' && deal.popularity && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <ThumbsUp className="w-3 h-3 text-green-600" />
              <span className="text-xs font-semibold text-gray-900">{deal.popularity}</span>
            </div>
          )}

          {/* Daily Deal Specific Elements */}
          {type === 'daily' && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg z-10">
              ⚡ Limited Time
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">{deal.title}</h3>
            {deal.location && (
              <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                <MapPin className="w-3 h-3" />
                <span>{deal.location}</span>
              </div>
            )}
            
            {deal.rating && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{deal.rating}</span>
                <span className="text-xs text-white/60">({deal.reviews} reviews)</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <div>
                {deal.originalPrice && (
                  <p className="text-white/60 text-xs line-through">₹{deal.originalPrice.toLocaleString()}</p>
                )}
                <p className="text-2xl font-bold">₹{deal.price.toLocaleString()}</p>
                {deal.duration && <p className="text-xs text-white/60">{deal.duration}</p>}
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Premium Destination Card Component
const PremiumDestinationCard = ({ dest, index, inView }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/details/destination/${dest.id}`)}
      className="group cursor-pointer"
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500">
        <div className="relative h-72">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{dest.rating}</span>
          </div>

          {/* Destination Badge */}
          {dest.badge && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" className="bg-white/90 text-gray-900 border-0 shadow-lg">
                {dest.badge}
              </Badge>
            </div>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm opacity-90">{dest.country}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">{dest.name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Starting from</p>
                <p className="text-2xl font-bold">₹{dest.price.toLocaleString()}</p>
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
                Explore
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const features = [
    { icon: Shield, title: 'No Hidden Fees', description: 'Pay only what you see, no surprises' },
    { icon: CheckCircle, title: 'Free Cancellation', description: 'Up to 48 hours before travel' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'We\'re here to help, anytime' },
    { icon: Award, title: 'Best Price Guarantee', description: 'Match or refund the difference' },
    { icon: Lock, title: 'Secure Payments', description: '256-bit encrypted transactions' },
    { icon: Gift, title: 'Rewards Program', description: 'Earn points on every booking' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
        Why Choose TravelEase
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-3">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Loading skeleton for cards
const CardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
  </Card>
);

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const { handleBooking } = useBooking();
  const [loading, setLoading] = useState({
    seasonal: true,
    popular: true,
    daily: true,
    destinations: true
  });
  
  // Intersection observers
  const [saleRef, saleInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [couponRef, couponInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [seasonalRef, seasonalInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [destinationsRef, destinationsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [dailyRef, dailyInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [trustRef, trustInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading({
        seasonal: false,
        popular: false,
        daily: false,
        destinations: false
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Updated seasonalDeals with unique IDs and 'seasonal' category
  const seasonalDeals = [
    {
      id: 'seasonal-1',
      category: 'seasonal',
      title: 'Summer Beach Escape',
      location: 'Goa, India',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop',
      discount: 35,
      price: 45000,
      originalPrice: 69000,
      badge: 'Summer Special',
      icon: Sun,
      rating: 4.8,
      reviews: 234,
      duration: '4 Days / 3 Nights'
    },
    {
      id: 'seasonal-2',
      category: 'seasonal',
      title: 'Swiss Alps Ski Trip',
      location: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop',
      discount: 30,
      price: 95000,
      originalPrice: 135000,
      badge: 'Winter Wonderland',
      icon: Snowflake,
      rating: 4.9,
      reviews: 189,
      duration: '7 Days / 6 Nights'
    },
    {
      id: 'seasonal-3',
      category: 'seasonal',
      title: 'European Christmas Markets',
      location: 'Multiple Cities',
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&auto=format&fit=crop',
      discount: 25,
      price: 85000,
      originalPrice: 113000,
      badge: 'Festive Special',
      icon: Gift,
      rating: 4.7,
      reviews: 156,
      duration: '8 Days / 7 Nights'
    },
    {
      id: 'seasonal-4',
      category: 'seasonal',
      title: 'Weekend in Udaipur',
      location: 'Udaipur, India',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&auto=format&fit=crop',
      discount: 20,
      price: 25000,
      originalPrice: 31000,
      badge: 'Long Weekend',
      icon: Calendar,
      rating: 4.6,
      reviews: 98,
      duration: '3 Days / 2 Nights'
    }
  ];

  const popularDeals = [
    {
      id: 'sample1',
      category: 'package',
      title: 'Maldives Paradise',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
      price: 95000,
      rating: 4.9,
      reviews: 1250,
      badge: 'Bestseller',
      popularity: '98%',
      duration: '5D/4N'
    },
    {
      id: 'sample2',
      category: 'package',
      title: 'Dubai Luxury Escape',
      location: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      price: 75000,
      rating: 4.8,
      reviews: 980,
      badge: 'Trending',
      popularity: '95%',
      duration: '4D/3N'
    },
    {
      id: 'sample3',
      category: 'package',
      title: 'Bali Retreat',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      price: 55000,
      rating: 4.7,
      reviews: 850,
      badge: 'Popular',
      popularity: '92%',
      duration: '5D/4N'
    },
    {
      id: 'sample4',
      category: 'package',
      title: 'Paris Romance',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      price: 85000,
      rating: 4.9,
      reviews: 1560,
      badge: 'Favorite',
      popularity: '97%',
      duration: '4D/3N'
    }
  ];

  const dailyDeals = [
    {
      id: 'sample1',
      category: 'deal',
      title: 'Dubai Luxury Escape',
      location: 'Dubai, UAE',
      description: '5-star luxury with Burj Khalifa view',
      discount: 40,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      validUntil: '2024-04-30',
      price: 45000,
      originalPrice: 75000,
      badge: 'Limited Time',
      rating: 4.9,
      duration: '5D/4N'
    },
    {
      id: 'sample2',
      category: 'deal',
      title: 'Maldives Paradise',
      location: 'Maldives',
      description: 'Overwater villa with all-inclusive',
      discount: 35,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
      validUntil: '2024-05-15',
      price: 95000,
      originalPrice: 146000,
      badge: 'Best Seller',
      rating: 5.0,
      duration: '7D/6N'
    },
    {
      id: 'sample3',
      category: 'deal',
      title: 'European Explorer',
      location: 'Multiple Countries',
      description: '8 days across 4 countries',
      discount: 30,
      image: 'https://images.unsplash.com/photo-1491557345352-5929e343d89d?w=800&auto=format&fit=crop',
      validUntil: '2024-04-20',
      price: 125000,
      originalPrice: 178000,
      badge: 'Trending',
      rating: 4.8,
      duration: '8D/7N'
    },
    {
      id: 'sample4',
      category: 'deal',
      title: 'Bali Retreat',
      location: 'Bali, Indonesia',
      description: 'Luxury resort with spa treatment',
      discount: 25,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      validUntil: '2024-05-10',
      price: 55000,
      originalPrice: 73000,
      badge: 'Popular',
      rating: 4.7,
      duration: '6D/5N'
    }
  ];

  const destinations = [
    {
      id: 'sample1',
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
      price: 45000,
      rating: 4.9,
      badge: 'Luxury'
    },
    {
      id: 'sample2',
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
      price: 75000,
      rating: 4.8,
      badge: 'Romantic'
    },
    {
      id: 'sample3',
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
      price: 35000,
      rating: 4.7,
      badge: 'Tropical'
    },
    {
      id: 'sample4',
      name: 'Maldives',
      country: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop',
      price: 95000,
      rating: 5.0,
      badge: 'Premium'
    },
    {
      id: 'sample5',
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop',
      price: 110000,
      rating: 4.9,
      badge: 'Adventure'
    },
    {
      id: 'sample6',
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
      price: 68000,
      rating: 4.8,
      badge: 'Iconic'
    }
  ];

  const handleViewAll = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSearch />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* 1. Summer Sale Banner */}
        <motion.section
          ref={saleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={saleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SummerSaleBanner />
        </motion.section>

        {/* 2. Coupon & Offers Carousel */}
        <motion.section
          ref={couponRef}
          initial={{ opacity: 0 }}
          animate={couponInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Exclusive Coupons</h2>
            <p className="text-gray-600">Unlock special discounts with these limited-time offers</p>
          </div>
          <CouponCarousel />
        </motion.section>

        {/* 3. Seasonal Deals */}
        <motion.section ref={seasonalRef}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Seasonal Deals</h2>
              <p className="text-gray-600">Special offers for every season</p>
            </div>
            <button 
              onClick={() => handleViewAll('packages')}
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading.seasonal ? (
              [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
            ) : (
              seasonalDeals.map((deal, index) => (
                <PremiumDealCard
                  key={deal.id}
                  deal={deal}
                  index={index}
                  inView={seasonalInView}
                  type="seasonal"
                />
              ))
            )}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Button variant="outline" onClick={() => handleViewAll('packages')} size="sm">
              View All Seasonal Deals
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.section>

        {/* 4. Popular Destinations */}
        <motion.section ref={destinationsRef}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-gray-600">Most loved places by our travelers</p>
            </div>
            <button 
              onClick={() => handleViewAll('packages')}
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading.destinations ? (
              [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
            ) : (
              destinations.map((dest, index) => (
                <PremiumDestinationCard
                  key={dest.id}
                  dest={dest}
                  index={index}
                  inView={destinationsInView}
                />
              ))
            )}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Button variant="outline" onClick={() => handleViewAll('packages')} size="sm">
              View All Destinations
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.section>

        {/* 5. Best Deals of the Day */}
        <motion.section ref={dailyRef}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Best Deals of the Day</h2>
              <p className="text-gray-600">Hurry! These deals won't last long</p>
            </div>
            <button 
              onClick={() => handleViewAll('packages')}
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading.daily ? (
              [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
            ) : (
              dailyDeals.map((deal, index) => (
                <PremiumDealCard
                  key={deal.id}
                  deal={deal}
                  index={index}
                  inView={dailyInView}
                  type="daily"
                />
              ))
            )}
          </div>

          <div className="text-center mt-6 md:hidden">
            <Button variant="outline" onClick={() => handleViewAll('packages')} size="sm">
              View All Deals
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.section>

        {/* 6. Why Choose Us / Trust Indicators */}
        <motion.section ref={trustRef}>
          <WhyChooseUs />
        </motion.section>

        {/* Section Divider */}
        <div className="border-t border-gray-200 my-8"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;