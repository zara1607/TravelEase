// /src/sections/footer/pages/support/HelpCenter.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plane, Hotel, Package, CreditCard, User, Shield, Phone } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'How to book, modify, or cancel flight tickets',
      articles: 12
    },
    {
      icon: Hotel,
      title: 'Hotel Reservations',
      description: 'Guide to booking hotels and managing reservations',
      articles: 8
    },
    {
      icon: Package,
      title: 'Holiday Packages',
      description: 'Information about tour packages and itineraries',
      articles: 6
    },
    {
      icon: CreditCard,
      title: 'Payments & Refunds',
      description: 'Payment methods, refunds, and cancellations',
      articles: 10
    },
    {
      icon: User,
      title: 'Account Management',
      description: 'Managing your profile, preferences, and settings',
      articles: 5
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Coverage details and claim process',
      articles: 4
    }
  ];

  const popularArticles = [
    'How to change or cancel a flight booking',
    'Understanding our cancellation policy',
    'How to request a refund',
    'Adding baggage to your booking',
    'Special assistance requests',
    'Group booking process'
  ];

  return (
    <FooterPageLayout 
      title="Help Center" 
      subtitle="Find answers to your questions"
    >
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Help Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {helpTopics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                    <span className="text-xs text-blue-600">{topic.articles} articles</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Popular Articles */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Articles</h2>
          <ul className="space-y-3">
            {popularArticles.map((article, index) => (
              <li key={index}>
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  {article}
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6 opacity-90">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="space-y-3">
            <Button variant="primary" className="bg-white text-blue-600 hover:bg-gray-100 w-full">
              <Phone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">
              Browse All FAQs
            </Button>
          </div>
        </Card>
      </div>
    </FooterPageLayout>
  );
};

export default HelpCenter;