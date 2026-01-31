import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Card } from '../../ui/Card'
import { POPULAR_DESTINATIONS, CURRENCY } from '../../lib/constants'

const PopularDestinations = () => {
  const navigate = useNavigate()

  const handleDestinationClick = (destination) => {
    navigate(`/booking/package/${destination.id}`, {
      state: {
        item: {
          ...destination,
          type: 'package',
          basePrice: destination.startingPrice,
          discount: destination.discount || 0,
          name: destination.name,
          image: destination.image,
          description: destination.description,
          rating: destination.rating || 4.5,
          reviews: destination.reviews || 120,
        }
      }
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Get featured packages (destinations marked as featured or top destinations)
  const featuredDestinations = POPULAR_DESTINATIONS.filter(dest => 
    dest.featured || dest.isTopDestination
  ).slice(0, 6) // Limit to 6 featured destinations

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore the world's most amazing places and create unforgettable memories
          </motion.p>
        </div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
            >
              <Card
                hover
                onClick={() => handleDestinationClick(destination)}
                className="cursor-pointer overflow-hidden group relative"
              >
                {/* Discount Badge (if available) */}
                {destination.discount && destination.discount > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {destination.discount}% OFF
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-gray-900">
                      {destination.country}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-200">
                      {destination.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Starting from</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-gray-900">
                          {CURRENCY.symbol}{destination.startingPrice.toLocaleString()}
                        </p>
                        {destination.discount && destination.discount > 0 && (
                          <p className="text-lg line-through text-gray-400">
                            {CURRENCY.symbol}{Math.round(destination.startingPrice * 100 / (100 - destination.discount)).toLocaleString()}
                          </p>
                        )}
                      </div>
                      {destination.discount && destination.discount > 0 && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          Save {destination.discount}% on this destination!
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <button className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        <span>Book Now</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        Click to book package
                      </p>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      {destination.duration && (
                        <span className="text-gray-600">
                          ⏱️ {destination.duration}
                        </span>
                      )}
                      {destination.rating && (
                        <span className="text-gray-600">
                          ⭐ {destination.rating} ({destination.reviews || 0} reviews)
                        </span>
                      )}
                    </div>
                    <span className="text-primary font-medium">
                      Package Deal
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/packages')}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
          >
            View All Packages
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularDestinations