// /src/sections/footer/pages/company/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Shield } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const About = () => {
  const stats = [
    { icon: Users, value: '500K+', label: 'Happy Customers' },
    { icon: Globe, value: '100+', label: 'Destinations' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Shield, value: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and strive to exceed expectations every step of the way.'
    },
    {
      title: 'Transparency',
      description: 'No hidden fees, no surprises. What you see is what you get.'
    },
    {
      title: 'Innovation',
      description: 'Constantly improving our platform to make travel booking seamless and enjoyable.'
    },
    {
      title: 'Sustainability',
      description: 'Committed to responsible tourism and reducing our environmental impact.'
    }
  ];

  return (
    <FooterPageLayout 
      title="About TravelEase" 
      subtitle="Your trusted partner for unforgettable travel experiences"
    >
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <Card className="p-6">
                <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            Founded in 2010, TravelEase began with a simple mission: to make travel booking simple, transparent, and enjoyable for everyone. What started as a small team of travel enthusiasts has grown into one of India's most trusted travel platforms.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Over the years, we've helped over 500,000 travelers discover amazing destinations, find the best deals, and create unforgettable memories. Our commitment to customer satisfaction and innovation has made us a preferred choice for travelers across the country.
          </p>
          <p className="text-lg text-gray-700">
            Today, we offer a comprehensive range of services including flight bookings, hotel reservations, holiday packages, and travel insurance – all designed to make your journey seamless from start to finish.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default About;