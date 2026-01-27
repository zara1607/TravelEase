import React from 'react'
import { motion } from 'framer-motion'
import HeroSearch from '../sections/hero/HeroSearch'
import PopularDestinations from '../sections/destinations/PopularDestinations'
import DealsCarousel from '../sections/deals/DealsCarousel'
import { Shield, Award, Clock, HeadphonesIcon, Star, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are 100% secure with industry-leading encryption'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'Find a lower price? We will refund the difference'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our team is always available to help you with any queries'
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Service',
      description: 'Dedicated support team for seamless travel experience'
    }
  ]

  const stats = [
    { value: '10M+', label: 'Happy Travelers' },
    { value: '50K+', label: 'Destinations' },
    { value: '4.9★', label: 'User Rating' },
    { value: '24/7', label: 'Support' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSearch />

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <DealsCarousel />

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Why Choose TravelEase?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              We provide the best travel booking experience with unmatched service and support
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <CardContent className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Travelers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Read reviews from our satisfied customers around the world
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Sharma',
                location: 'Mumbai, India',
                rating: 5,
                review: 'Absolutely seamless experience! Booked my Dubai trip and everything was perfect from start to finish.'
              },
              {
                name: 'Rahul Verma',
                location: 'Delhi, India',
                rating: 5,
                review: 'Best prices in the market and excellent customer support. Highly recommended for all travelers!'
              },
              {
                name: 'Anita Desai',
                location: 'Bangalore, India',
                rating: 5,
                review: 'The package deals are amazing! Saved so much money on my Maldives honeymoon package.'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-blue-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of travelers who trust TravelEase for their perfect vacation
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Explore Destinations
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home