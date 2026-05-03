// /src/sections/footer/pages/legal/Sitemap.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Hotel, Package, Shield, HelpCircle, FileText, Mail, Map } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const Sitemap = () => {
  const sections = [
    {
      title: 'Main Pages',
      icon: Map,
      links: [
        { label: 'Home', path: '/' },
        { label: 'Search', path: '/search' },
        { label: 'Deals', path: '/deals' },
        { label: 'Dashboard', path: '/dashboard' }
      ]
    },
    {
      title: 'Services',
      icon: Plane,
      links: [
        { label: 'Flights', path: '/flights' },
        { label: 'Hotels', path: '/hotels' },
        { label: 'Packages', path: '/packages' },
        { label: 'Travel Insurance', path: '/insurance' },
        { label: 'Cruises', path: '/cruises' },
        { label: 'Visa Services', path: '/visa' }
      ]
    },
    {
      title: 'Company',
      icon: FileText,
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Blog', path: '/blog' }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQs', path: '/faq' },
        { label: 'Cancellation Policy', path: '/cancellation' }
      ]
    },
    {
      title: 'Legal',
      icon: Shield,
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'Sitemap', path: '/sitemap' }
      ]
    }
  ];

  return (
    <FooterPageLayout 
      title="Sitemap" 
      subtitle="Quick access to all pages on TravelEase"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </FooterPageLayout>
  );
};

export default Sitemap;