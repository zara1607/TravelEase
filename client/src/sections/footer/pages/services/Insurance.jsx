// /src/sections/footer/pages/services/Insurance.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Heart, Briefcase, Clock, CheckCircle, Award, Users, Phone } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';
import Badge from '../../../../ui/Badge';

const Insurance = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Travel Shield',
      price: '₹499',
      coverage: '₹50,000',
      benefits: ['Medical Coverage', 'Trip Cancellation', 'Baggage Loss'],
      popular: false
    },
    {
      name: 'Premium Travel Guard',
      price: '₹999',
      coverage: '₹2,00,000',
      benefits: ['Enhanced Medical', 'Trip Interruption', 'Adventure Sports', 'Emergency Evacuation'],
      popular: true
    },
    {
      name: 'Family Travel Protect',
      price: '₹1,799',
      coverage: '₹3,00,000',
      benefits: ['Covers 4 Members', 'Comprehensive Medical', 'Child Care', 'Personal Liability'],
      popular: false
    }
  ];

  const features = [
    { icon: Clock, title: '24/7 Assistance', description: 'Round-the-clock emergency support' },
    { icon: Award, title: 'Cashless Claims', description: 'Network of 5000+ hospitals' },
    { icon: Users, title: 'Family Cover', description: 'Protect your loved ones' },
    { icon: Briefcase, title: 'Trip Protection', description: 'Coverage for delays & cancellations' }
  ];

  const benefits = [
    'Emergency Medical Expenses',
    'Trip Cancellation & Interruption',
    'Loss of Checked Baggage',
    'Flight Delay Coverage',
    'Personal Accident Cover',
    'Emergency Evacuation',
    'Adventure Sports Coverage',
    '24/7 Travel Assistance'
  ];

  return (
    <FooterPageLayout 
      title="Travel Insurance" 
      subtitle="Protect your journey with comprehensive coverage"
    >
      {/* Hero CTA */}
      <Card className="mb-12 p-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Travel with Peace of Mind</h2>
          <p className="text-lg mb-6 opacity-90">Get covered against unexpected events</p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => navigate('/insurance')}
          >
            Get a Quote
          </Button>
        </div>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <div className="inline-flex p-3 bg-purple-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Insurance Plans */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Insurance Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 h-full relative ${plan.popular ? 'border-2 border-purple-500 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="primary" className="bg-purple-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="text-center mb-4">
                  <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{plan.price}</p>
                  <p className="text-sm text-gray-500">Coverage up to {plan.coverage}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? "primary" : "outline"} 
                  size="sm" 
                  fullWidth
                  className={plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}
                  onClick={() => navigate('/insurance')}
                >
                  Select Plan
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">{benefit}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Need help choosing the right plan? Call our insurance experts at{' '}
            <a href="tel:+911234567890" className="text-purple-600 hover:underline">
              +91 123 456 7890
            </a>
          </p>
        </div>
      </Card>
    </FooterPageLayout>
  );
};

export default Insurance;