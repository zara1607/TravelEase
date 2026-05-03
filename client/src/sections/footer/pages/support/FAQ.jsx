// /src/sections/footer/pages/support/FAQ.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Booking & Reservations',
      questions: [
        {
          q: 'How do I book a flight on TravelEase?',
          a: 'Booking a flight on TravelEase is simple. Just enter your departure city, destination, travel dates, and number of passengers on our homepage. Click search, compare available flights, select your preferred option, and follow the checkout process to complete your booking.'
        },
        {
          q: 'Can I modify or cancel my booking?',
          a: 'Yes, you can modify or cancel your booking through your account dashboard. Go to "My Bookings", find your booking, and select the modification option. Please note that changes may be subject to airline or hotel policies and applicable fees.'
        },
        {
          q: 'How do I get my e-ticket after booking?',
          a: 'After successful payment, your e-ticket will be sent to your registered email address immediately. You can also download it from your account dashboard under "My Bookings".'
        }
      ]
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), net banking, UPI, and popular digital wallets like Paytm, Google Pay, and PhonePe.'
        },
        {
          q: 'How long does a refund take?',
          a: 'Refund processing time varies by payment method. Credit card refunds typically take 7-10 business days, while UPI and wallet refunds are processed within 3-5 business days.'
        },
        {
          q: 'Is it safe to save my payment information?',
          a: 'Yes, we use industry-standard 256-bit SSL encryption to protect your payment information. We are PCI-DSS compliant and never store your full card details on our servers.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on "Login/Signup" at the top right corner, then select "Create Account". Fill in your details, verify your email, and you\'re ready to start booking.'
        },
        {
          q: 'I forgot my password. What should I do?',
          a: 'Click on "Login", then "Forgot Password". Enter your registered email address, and we\'ll send you instructions to reset your password.'
        }
      ]
    },
    {
      category: 'Travel Insurance',
      questions: [
        {
          q: 'Do I need travel insurance?',
          a: 'While not mandatory, travel insurance is highly recommended to protect against unexpected events like trip cancellation, medical emergencies, lost baggage, or flight delays.'
        },
        {
          q: 'What does travel insurance cover?',
          a: 'Our travel insurance plans cover medical emergencies, trip cancellation/interruption, baggage loss/delay, flight delays, and personal accidents. Coverage amounts vary by plan.'
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <FooterPageLayout 
      title="Frequently Asked Questions" 
      subtitle="Find answers to common questions"
    >
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8">
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
            <div className="space-y-3">
              {category.questions.map((faq, index) => {
                const uniqueIndex = `${categoryIndex}-${index}`;
                const isOpen = openIndex === uniqueIndex;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : uniqueIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4 text-gray-600">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredFAQs.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500">No FAQs found matching your search.</p>
          </Card>
        )}
      </div>
    </FooterPageLayout>
  );
};

export default FAQ;