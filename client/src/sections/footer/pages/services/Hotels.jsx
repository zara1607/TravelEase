// /src/sections/footer/pages/services/Hotels.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hotel, Wifi, Coffee, Dumbbell, Waves, Sparkles } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';
import Badge from '../../../../ui/Badge';

const Hotels = () => {
  const navigate = useNavigate();

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Coffee, label: 'Breakfast Included' },
    { icon: Dumbbell, label: 'Fitness Center' },
    { icon: Waves, label: 'Swimming Pool' },
    { icon: Sparkles, label: 'Spa & Wellness' }
  ];

  const popularCities = [
    { name: 'Mumbai', properties: 234, price: '₹3,999' },
    { name: 'Delhi', properties: 189, price: '₹3,499' },
    { name: 'Bangalore', properties: 156, price: '₹4,299' },
    { name: 'Goa', properties: 278, price: '₹5,999' },
    { name: 'Jaipur', properties: 145, price: '₹3,799' },
    { name: 'Kerala', properties: 167, price: '₹4,499' }
  ];

  return (
    <FooterPageLayout 
      title="Hotel Booking Services" 
      subtitle="Find the perfect stay for your journey"
    >
      {/* Hero CTA */}
      <Card className="mb-12 p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Where will you stay?</h2>
          <p className="text-lg mb-6 opacity-90">Discover thousands of hotels worldwide</p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => navigate('/hotels')}
          >
            Search Hotels
          </Button>
        </div>
      </Card>

      {/* Popular Amenities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Amenities</h2>
        <div className="flex flex-wrap gap-3">
          {amenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Popular Destinations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Hotel Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-500">{city.properties} properties</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-lg font-bold text-purple-600">{city.price}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Hotels;