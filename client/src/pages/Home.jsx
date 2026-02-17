import React from 'react';
import DynamicSearchPanel from '../components/DynamicSearchPanel';  // ✅ REPLACED ModernTabSearchBar with DynamicSearchPanel
import { 
  Sparkles, TrendingUp, Shield, Award, MapPin, 
  Star, Users, CheckCircle, ArrowRight, Clock,
  Plane, Building2, Package, Heart
} from 'lucide-react';

const ProfessionalHome = () => {
  
  // Popular Destinations
  const popularDestinations = [
    {
      id: 1,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
      packages: '150+ Packages',
      price: 'From ₹35,999',
      rating: 4.8,
      badge: 'Trending'
    },
    {
      id: 2,
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop',
      packages: '80+ Packages',
      price: 'From ₹45,999',
      rating: 4.9,
      badge: 'Luxury'
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
      packages: '120+ Packages',
      price: 'From ₹28,999',
      rating: 4.7,
      badge: 'Popular'
    },
    {
      id: 4,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop',
      packages: '200+ Packages',
      price: 'From ₹55,999',
      rating: 4.9,
      badge: 'Romantic'
    }
  ];

  // Why Choose Us
  const features = [
    {
      icon: Shield,
      title: '100% Secure Booking',
      description: 'Your data is protected with bank-level encryption',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'Found a better price? We\'ll match it or refund the difference',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Users,
      title: '2M+ Happy Travelers',
      description: 'Join millions of satisfied customers worldwide',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Clock,
      title: '24/7 Customer Support',
      description: 'Our team is always here to help you anytime',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  // Deals & Offers
  const deals = [
    {
      title: 'Summer Special',
      discount: 'Up to 40% OFF',
      description: 'On international flights',
      color: 'from-orange-500 to-pink-500',
      icon: Plane
    },
    {
      title: 'Hotel Bonanza',
      discount: 'Flat 30% OFF',
      description: 'On luxury stays',
      color: 'from-blue-500 to-cyan-500',
      icon: Building2
    },
    {
      title: 'Package Deals',
      discount: 'Save ₹10,000',
      description: 'On holiday packages',
      color: 'from-purple-500 to-pink-500',
      icon: Package
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Absolutely amazing experience! Booked my Bali trip and everything was seamless. Highly recommend TravelEase!',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=3b82f6&color=fff'
    },
    {
      name: 'Rahul Kumar',
      location: 'Delhi, India',
      rating: 5,
      text: 'Best prices and excellent customer service. Saved a lot on my Dubai vacation. Will definitely use again!',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=10b981&color=fff'
    },
    {
      name: 'Sneha Patel',
      location: 'Bangalore, India',
      rating: 5,
      text: 'Professional service from start to finish. The team helped me plan my dream European tour perfectly!',
      avatar: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=f59e0b&color=fff'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-8">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Your Journey Starts Here
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                TravelEase
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-2">
              Book flights, hotels, and holiday packages at the best prices.
            </p>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Your journey begins here.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </div>

      {/* ✅ Search Bar Section - Using DynamicSearchPanel instead */}
      <div className="-mt-12 relative z-10">
        <DynamicSearchPanel />
      </div>

      {/* Trust Badges */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deals & Offers */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔥 Exclusive Deals & Offers
            </h2>
            <p className="text-lg text-gray-600">
              Limited time offers you don't want to miss!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, index) => {
              const Icon = deal.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${deal.color} rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  {/* Background Icon */}
                  <div className="absolute -right-4 -bottom-4 opacity-20">
                    <Icon className="w-32 h-32" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-xl mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                    <div className="text-3xl font-black mb-2">{deal.discount}</div>
                    <p className="text-white/90 mb-6">{deal.description}</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                      Explore Now
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                🌍 Popular Destinations
              </h2>
              <p className="text-lg text-gray-600">
                Discover amazing places around the world
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold rounded-full">
                      {destination.badge}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Destination Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-1">{destination.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">{destination.packages}</p>
                      <p className="text-lg font-bold text-gray-900">{destination.price}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💬 What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real experiences from real travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 2 million+ happy travelers and book your dream vacation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
              <Plane className="w-6 h-6" />
              Book Flights
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              <Package className="w-6 h-6" />
              View Packages
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TravelEase</h3>
              <p className="text-gray-400 mb-4">
                Your trusted travel partner for unforgettable journeys.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Verified & Secure</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Flights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deals</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@travelease.com</li>
                <li>📞 +91 1800-XXX-XXXX</li>
                <li>⏰ 24/7 Customer Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TravelEase. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalHome;