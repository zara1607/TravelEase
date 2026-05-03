// /src/sections/footer/pages/services/Flights.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Clock, Shield, CreditCard, Globe, Award } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';
import Badge from '../../../../ui/Badge';

const Flights = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Globe, title: 'Global Coverage', description: 'Flights to 500+ destinations worldwide' },
    { icon: Award, title: 'Best Prices', description: 'Price match guarantee on all bookings' },
    { icon: Shield, title: 'Secure Booking', description: '256-bit SSL encrypted transactions' },
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock customer assistance' },
    { icon: CreditCard, title: 'Flexible Payment', description: 'Multiple payment options available' }
  ];

  const popularRoutes = [
    { from: 'Delhi (DEL)', to: 'Mumbai (BOM)', price: '₹3,299' },
    { from: 'Mumbai (BOM)', to: 'Bangalore (BLR)', price: '₹2,999' },
    { from: 'Delhi (DEL)', to: 'Goa (GOI)', price: '₹4,599' },
    { from: 'Bangalore (BLR)', to: 'Delhi (DEL)', price: '₹3,899' }
  ];

  return (
    <FooterPageLayout 
      title="Flight Booking Services" 
      subtitle="Book flights at the best prices"
    >
      {/* Hero CTA */}
      <Card className="mb-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fly?</h2>
          <p className="text-lg mb-6 opacity-90">Find and book the best flight deals</p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate('/flights')}
          >
            Search Flights
          </Button>
        </div>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Popular Routes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{route.from} → {route.to}</p>
                    <p className="text-sm text-gray-500">Starting from</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">{route.price}</p>
                    <Button variant="link" size="sm" className="text-blue-600">
                      Book Now
                    </Button>
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

export default Flights;