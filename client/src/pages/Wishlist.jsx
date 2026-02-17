import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Plane, Hotel, Package, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Wishlist = () => {
  // Sample wishlist items
  const wishlistItems = [
    {
      id: 1,
      type: 'flight',
      title: 'Mumbai to Delhi',
      subtitle: 'Air India • AI 860',
      price: '₹4,999',
      date: '20 Mar 2025'
    },
    {
      id: 2,
      type: 'hotel',
      title: 'Taj Mahal Palace',
      subtitle: 'Mumbai • 4.8 ★',
      price: '₹15,000',
      date: '20-25 Mar 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        {item.type === 'flight' && <Plane className="w-6 h-6 text-blue-600" />}
                        {item.type === 'hotel' && <Hotel className="w-6 h-6 text-blue-600" />}
                        {item.type === 'package' && <Package className="w-6 h-6 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">{item.price}</p>
                      <button className="text-red-500 hover:text-red-600 mt-2">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favorite flights, hotels, and packages here</p>
            <Button variant="primary">Explore Flights</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;