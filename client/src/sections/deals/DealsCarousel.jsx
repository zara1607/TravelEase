import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Percent, Clock } from 'lucide-react'
import { Card } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'

const DealsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const deals = [
    {
      id: 1,
      title: 'Dubai Mega Sale',
      description: 'Experience luxury at unbeatable prices',
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      validUntil: '31 Jan 2026',
      tag: 'Limited Time'
    },
    {
      id: 2,
      title: 'Maldives Paradise',
      description: 'All-inclusive resort packages',
      discount: '35% OFF',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
      validUntil: '15 Feb 2026',
      tag: 'Hot Deal'
    },
    {
      id: 3,
      title: 'European Explorer',
      description: 'Multi-city tour packages',
      discount: '30% OFF',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
      validUntil: '28 Feb 2026',
      tag: 'Best Seller'
    }
  ]

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
                        <p className="text-3xl font-bold">{deals[currentIndex].discount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="warning" className="mb-4 w-fit">
                      {deals[currentIndex].tag}
                    </Badge>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {deals[currentIndex].title}
                    </h3>
                    
                    <p className="text-lg text-gray-600 mb-6">
                      {deals[currentIndex].description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 mb-8">
                      <Clock className="w-5 h-5" />
                      <span>Valid until {deals[currentIndex].validUntil}</span>
                    </div>

                    <Button size="lg" className="w-full md:w-auto">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DealsCarousel