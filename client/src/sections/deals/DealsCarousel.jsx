// /src/sections/deals/DealsCarousel.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Percent, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'

// Export the deals data so it can be used in the details page
export const DEALS = [
  {
    id: 'deal1',
    title: 'Dubai Luxury Escape',
    description: 'Experience luxury at unbeatable prices',
    longDescription: 'Experience the ultimate luxury vacation in Dubai. Stay at the iconic Burj Khalifa, enjoy private desert safaris, and indulge in world-class dining and shopping.',
    discount: 40,
    price: 45000,
    originalPrice: 75000,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      'https://images.unsplash.com/photo-1548681528-6a5c45b66b9a?w=1200&q=80',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1200&q=80',
      'https://images.unsplash.com/photo-1577147446927-e5c1c5d33b9e?w=1200&q=80'
    ],
    validUntil: '2026-01-31',
    badge: 'Limited Time',
    tag: 'Limited Time',
    location: 'Dubai, UAE',
    rating: 4.9,
    reviews: 1250,
    duration: '5 Days / 4 Nights',
    highlights: [
      'Stay at Armani Hotel Dubai',
      'Private desert safari experience',
      'Dinner at At.mosphere',
      'Dubai Fountain show',
      'Dubai Mall shopping voucher'
    ],
    inclusions: [
      'Round-trip flights',
      '5-star hotel accommodation',
      'Daily breakfast',
      'Desert safari with dinner',
      'Burj Khalifa observation deck',
      'Airport transfers'
    ],
    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips & gratuities',
      'Visa fees'
    ],
    terms: [
      'Valid for travel until Jan 31, 2026',
      'Subject to availability',
      'Non-refundable after booking',
      'Blackout dates apply'
    ]
  },
  {
    id: 'deal2',
    title: 'Maldives Paradise',
    description: 'All-inclusive resort packages',
    longDescription: 'Escape to paradise in the Maldives. Stay in a luxurious overwater villa, snorkel in crystal clear waters, and enjoy all-inclusive dining and activities.',
    discount: 35,
    price: 95000,
    originalPrice: 146000,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&q=80',
      'https://images.unsplash.com/photo-1580541832629-2d71e66c1a6b?w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981279-d1992c29c3b3?w=1200&q=80'
    ],
    validUntil: '2026-02-15',
    badge: 'Best Seller',
    tag: 'Hot Deal',
    location: 'Maldives',
    rating: 5.0,
    reviews: 890,
    duration: '7 Days / 6 Nights',
    highlights: [
      'Overwater villa with glass floor',
      'Private pool',
      'House reef snorkeling',
      'Sunset dolphin cruise',
      'Candlelight dinner on beach'
    ],
    inclusions: [
      'Round-trip flights',
      'Overwater villa',
      'All meals & drinks',
      'Snorkeling equipment',
      'Sunset cruise',
      'Airport transfers by speedboat'
    ],
    exclusions: [
      'Spa treatments',
      'Scuba diving',
      'Personal expenses',
      'Tips'
    ],
    terms: [
      'Valid for travel until Feb 15, 2026',
      'Subject to availability',
      '50% deposit required',
      'Free cancellation up to 30 days'
    ]
  },
  {
    id: 'deal3',
    title: 'European Explorer',
    description: 'Multi-city tour packages',
    longDescription: 'Discover the best of Europe on this whirlwind tour. Visit iconic landmarks in London, Paris, Rome, and Barcelona with expert guides and comfortable accommodations.',
    discount: 30,
    price: 125000,
    originalPrice: 178000,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1491557345352-5929e343d89d?w=1200&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80'
    ],
    validUntil: '2026-02-28',
    badge: 'Best Seller',
    tag: 'Best Seller',
    location: 'Multiple Countries',
    rating: 4.8,
    reviews: 560,
    duration: '8 Days / 7 Nights',
    highlights: [
      'London Eye & Big Ben',
      'Eiffel Tower & Louvre',
      'Colosseum & Vatican',
      'Sagrada Familia',
      'Local food experiences'
    ],
    inclusions: [
      'International flights',
      '4-star hotels',
      'Daily breakfast',
      'Guided tours',
      'Train between cities',
      'Airport transfers'
    ],
    exclusions: [
      'Lunch & dinner',
      'Personal expenses',
      'Travel insurance',
      'Visa fees'
    ],
    terms: [
      'Valid for travel until Feb 28, 2026',
      'Subject to availability',
      'Non-refundable after booking',
      'Minimum 2 passengers'
    ]
  },
  {
    id: 'deal4',
    title: 'Bali Retreat',
    description: 'Luxury resort with spa treatment',
    longDescription: 'Rejuvenate your mind, body, and soul in Bali. Stay at a luxury wellness resort, enjoy daily yoga and spa treatments, and explore the island\'s natural beauty.',
    discount: 25,
    price: 55000,
    originalPrice: 73000,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014cd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&q=80'
    ],
    validUntil: '2026-03-10',
    badge: 'Popular',
    tag: 'Popular',
    location: 'Bali, Indonesia',
    rating: 4.7,
    reviews: 890,
    duration: '6 Days / 5 Nights',
    highlights: [
      'Ayurvedic spa treatments',
      'Sunrise yoga',
      'Ubud monkey forest',
      'Tegalalang rice terraces',
      'Balinese cooking class'
    ],
    inclusions: [
      'Round-trip flights',
      'Luxury resort',
      'Daily yoga classes',
      '2 spa treatments',
      'Ubud tour',
      'Airport transfers'
    ],
    exclusions: [
      'Additional spa treatments',
      'Personal expenses',
      'Travel insurance',
      'Tips'
    ],
    terms: [
      'Valid for travel until Mar 10, 2026',
      'Subject to availability',
      '30% deposit required',
      'Free cancellation up to 15 days'
    ]
  }
];

const DealsCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const deals = DEALS;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [deals.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length)
  }

  const handleViewDeal = (dealId) => {
    navigate(`/deal/${dealId}`);
  };

  const handleViewAll = () => {
    navigate('/deals');
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-4"
          >
            <Percent className="w-4 h-4" />
            <span className="font-semibold text-sm">Special Offers</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Today's Best Deals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Don't miss out on these incredible offers for your dream vacation
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => handleViewDeal(deals[currentIndex].id)}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto">
                    <img
                      src={deals[currentIndex].image}
                      alt={deals[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                        <p className="text-3xl font-bold">{deals[currentIndex].discount}% OFF</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="warning" className="mb-4 w-fit">
                      {deals[currentIndex].badge}
                    </Badge>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {deals[currentIndex].title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {deals[currentIndex].description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 mb-8">
                      <Clock className="w-5 h-5" />
                      <span>Valid until {new Date(deals[currentIndex].validUntil).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          ₹{deals[currentIndex].price.toLocaleString()}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ₹{deals[currentIndex].originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button 
                        size="lg" 
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDeal(deals[currentIndex].id);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-orange-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleViewAll}
              className="text-orange-600 font-semibold hover:text-orange-700 inline-flex items-center gap-2"
            >
              View All Deals
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsCarousel