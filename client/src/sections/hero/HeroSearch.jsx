// src/sections/hero/HeroSearch.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plane, Hotel, Package, Train, Bus, Car, Ship, Globe, Shield } from 'lucide-react';
import DynamicSearchPanel from '../../components/DynamicSearchPanel';

const HeroSearch = () => {
  const stats = [
    { value: '500K+', label: 'Happy Customers', icon: Sparkles },
    { value: '10K+', label: 'Destinations', icon: Globe },
    { value: '50+', label: 'Awards Won', icon: Shield },
    { value: '24/7', label: 'Support Available', icon: Plane },
  ];

  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&auto=format&fit=crop"
          alt="Travel background - airplane flying over mountains at sunset"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full mb-6 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Trusted by 500,000+ travelers</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Discover Your Next
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Adventure
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-6">
            Book flights, hotels, packages, trains, cruises, visa & more — best prices, 24/7 support
          </p>

          {/* Stats - Optional but kept for consistency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Dynamic Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <DynamicSearchPanel />
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-200"
        >
          <span className="flex items-center gap-1">✓ No booking fees</span>
          <span className="flex items-center gap-1">✓ Free cancellation</span>
          <span className="flex items-center gap-1">✓ 24/7 customer support</span>
          <span className="flex items-center gap-1">✓ Best price guarantee</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSearch;