// /src/sections/footer/pages/company/Press.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Download } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';

const Press = () => {
  const pressReleases = [
    {
      date: '2024-02-15',
      title: 'TravelEase Raises $10M in Series A Funding',
      description: 'The funding will be used to expand our technology team and enhance the platform experience.',
      link: '#'
    },
    {
      date: '2024-01-20',
      title: 'TravelEase Launches New Mobile App',
      description: 'Our new iOS and Android apps make booking travel even easier on the go.',
      link: '#'
    },
    {
      date: '2023-12-10',
      title: 'TravelEase Named Best Travel Platform 2023',
      description: 'Recognized for innovation and customer satisfaction at the Travel Awards 2023.',
      link: '#'
    },
    {
      date: '2023-11-05',
      title: 'Partnership with 1000+ Hotels Announced',
      description: 'New partnerships expand our hotel inventory across Asia and Europe.',
      link: '#'
    }
  ];

  const mediaCoverage = [
    {
      outlet: 'TechCrunch',
      title: 'How TravelEase is Revolutionizing Travel Booking',
      date: '2024-02-01',
      link: '#'
    },
    {
      outlet: 'Forbes',
      title: 'Top 10 Travel Startups to Watch in 2024',
      date: '2024-01-15',
      link: '#'
    },
    {
      outlet: 'Economic Times',
      title: 'TravelEase: Making Travel Accessible for All',
      date: '2023-12-20',
      link: '#'
    }
  ];

  return (
    <FooterPageLayout 
      title="Press & Media" 
      subtitle="Latest news and updates from TravelEase"
    >
      {/* Press Kit */}
      <div className="mb-12">
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Press Kit</h2>
              <p className="opacity-90">
                Download our media kit including logos, brand guidelines, and executive photos.
              </p>
            </div>
            <Button variant="primary" className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap">
              <Download className="w-4 h-4 mr-2" />
              Download Press Kit
            </Button>
          </div>
        </Card>
      </div>

      {/* Press Releases */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Press Releases</h2>
        <div className="space-y-4">
          {pressReleases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a 
                  href={item.link} 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Coverage */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Media Coverage</h2>
        <div className="space-y-4">
          {mediaCoverage.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-600">{item.outlet}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <a 
                  href={item.link} 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read Article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </FooterPageLayout>
  );
};

export default Press;