// /src/sections/footer/pages/support/Cancellation.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, DollarSign, Shield, AlertCircle } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const Cancellation = () => {
  const policies = [
    {
      title: 'Flight Cancellations',
      icon: Clock,
      items: [
        'Cancellations made 48+ hours before departure: 90% refund',
        'Cancellations made 24-48 hours before departure: 75% refund',
        'Cancellations made less than 24 hours before departure: 50% refund',
        'No-show: Non-refundable'
      ]
    },
    {
      title: 'Hotel Cancellations',
      icon: Calendar,
      items: [
        'Free cancellation up to 7 days before check-in',
        '50% refund for cancellations 3-7 days before check-in',
        'No refund for cancellations within 48 hours of check-in',
        'Special rates may have different cancellation policies'
      ]
    },
    {
      title: 'Package Tours',
      icon: DollarSign,
      items: [
        '60+ days before departure: 90% refund',
        '30-60 days before departure: 75% refund',
        '15-30 days before departure: 50% refund',
        'Less than 15 days: Non-refundable'
      ]
    },
    {
      title: 'Travel Insurance Claims',
      icon: Shield,
      items: [
        'Medical emergencies: Covered up to policy limit',
        'Trip interruption: Covered for qualifying reasons',
        'Baggage loss: Up to policy limits with documentation',
        'Claims must be filed within 30 days of incident'
      ]
    }
  ];

  const exceptions = [
    'Non-refundable fares and special promotional rates',
    'Peak season bookings (Dec 20 - Jan 10)',
    'Group bookings of 10+ passengers',
    'Force majeure events (subject to individual policies)'
  ];

  return (
    <FooterPageLayout 
      title="Cancellation Policy" 
      subtitle="Understand our cancellation and refund policies"
    >
      {/* Important Notice */}
      <Card className="mb-8 p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
            <p className="text-yellow-700">
              Cancellation policies may vary based on the specific airline, hotel, or tour operator. 
              The following are general guidelines. Please check your booking confirmation for the exact policy applicable to your reservation.
            </p>
          </div>
        </div>
      </Card>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
          return (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{policy.title}</h2>
                </div>
                <ul className="space-y-2">
                  {policy.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Exceptions */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Exceptions & Special Cases</h2>
        <ul className="space-y-2">
          {exceptions.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            For any questions about cancellations or to initiate a cancellation request, 
            please contact our support team at{' '}
            <a href="mailto:support@travelease.com" className="text-blue-600 hover:underline">
              support@travelease.com
            </a>{' '}
            or call{' '}
            <a href="tel:+911234567890" className="text-blue-600 hover:underline">
              +91 123 456 7890
            </a>
          </p>
        </div>
      </Card>
    </FooterPageLayout>
  );
};

export default Cancellation;