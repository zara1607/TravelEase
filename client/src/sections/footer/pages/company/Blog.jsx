// /src/sections/footer/pages/company/Blog.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock } from 'lucide-react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';
import Button from '../../../../ui/Button';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: '10 Tips for Stress-Free International Travel',
      excerpt: 'Planning an international trip? Here are our top tips to make your journey smooth and enjoyable.',
      author: 'Sarah Johnson',
      date: '2024-03-01',
      readTime: '5 min read',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Best Beach Destinations for Summer 2024',
      excerpt: 'Discover the most beautiful beaches to visit this summer, from hidden gems to popular hotspots.',
      author: 'Mike Chen',
      date: '2024-02-25',
      readTime: '4 min read',
      category: 'Destinations',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'How to Save Money on Flight Bookings',
      excerpt: 'Learn the best strategies and timing for booking flights to get the best deals.',
      author: 'Priya Patel',
      date: '2024-02-20',
      readTime: '6 min read',
      category: 'Money Saving',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Solo Travel Guide: Staying Safe and Having Fun',
      excerpt: 'Everything you need to know about traveling alone, from safety tips to making friends on the road.',
      author: 'Alex Rivera',
      date: '2024-02-15',
      readTime: '7 min read',
      category: 'Solo Travel',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop'
    }
  ];

  const categories = ['All', 'Travel Tips', 'Destinations', 'Money Saving', 'Solo Travel', 'Reviews'];

  return (
    <FooterPageLayout 
      title="TravelEase Blog" 
      subtitle="Travel inspiration, tips, and stories from our team"
    >
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              index === 0 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  Read More
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </FooterPageLayout>
  );
};

export default Blog;