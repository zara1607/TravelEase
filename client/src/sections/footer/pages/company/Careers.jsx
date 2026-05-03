// /src/sections/footer/pages/company/Careers.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';

const Careers = () => {
  const openings = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Mumbai (Remote)',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We\'re looking for an experienced Frontend Developer to join our team and help build amazing user experiences.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Drive product strategy and roadmap for our travel booking platform.'
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Help our customers with their travel queries and provide exceptional support.'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Mumbai (Hybrid)',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Lead our marketing initiatives and help grow our brand presence.'
    }
  ];

  const benefits = [
    'Competitive salary & equity',
    'Health insurance for you and family',
    'Flexible work hours',
    'Remote work options',
    'Learning & development budget',
    'Annual team retreats',
    'Paid time off',
    'Parental leave'
  ];

  return (
    <FooterPageLayout 
      title="Join Our Team" 
      subtitle="Help us build the future of travel"
    >
      {/* Why Join Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work at TravelEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="bg-green-100 rounded-full p-1 mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <span className="text-gray-700">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        <Briefcase className="w-3 h-3" />
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                        <DollarSign className="w-3 h-3" />
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="whitespace-nowrap">
                    Apply Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Careers;