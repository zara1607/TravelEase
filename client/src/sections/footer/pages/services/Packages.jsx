// /src/sections/footer/pages/services/Packages.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, MapPin, Calendar, Users, Star, Clock, Shield, CreditCard } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';
import Badge from '../../../../ui/Badge';

const Packages = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Package, title: 'Customized Packages', description: 'Tailor-made itineraries for your perfect trip' },
    { icon: Shield, title: 'Best Price Guarantee', description: 'We match any lower price' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer assistance' },
    { icon: CreditCard, title: 'Flexible Payment', description: 'Easy EMI options available' }
  ];

  const popularPackages = [
    {
      name: 'Magical Goa',
      location: 'Goa, India',
      duration: '4 Days / 3 Nights',
      price: '₹12,999',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop'
    },
    {
      name: 'Kerala Backwaters',
      location: 'Kerala, India',
      duration: '5 Days / 4 Nights',
      price: '₹18,999',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop'
    },
    {
      name: 'Udaipur Romance',
      location: 'Udaipur, India',
      duration: '3 Days / 2 Nights',
      price: '₹13,499',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&auto=format&fit=crop'
    },
    {
      name: 'Manali Adventure',
      location: 'Manali, India',
      duration: '5 Days / 4 Nights',
      price: '₹15,999',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1626624340240-a10d0a5ae4e0?w=800&auto=format&fit=crop'
    }
  ];

  const categories = [
    'Beach Holidays',
    'Hill Stations',
    'Cultural Tours',
    'Adventure Trips',
    'Honeymoon Packages',
    'Family Vacations',
    'Wildlife Safaris',
    'Spiritual Tours'
  ];

  return (
    <FooterPageLayout 
      title="Holiday Packages" 
      subtitle="Discover our curated travel packages"
    >
      {/* Hero CTA */}
      <Card className="mb-12 p-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-6 opacity-90">Explore our hand-picked holiday packages</p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100"
            onClick={() => navigate('/packages')}
          >
            Explore Packages
          </Button>
        </div>
      </Card>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full">
                <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Popular Packages */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{pkg.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-3 h-3" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{pkg.price}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    fullWidth
                    onClick={() => navigate('/packages')}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Packages;