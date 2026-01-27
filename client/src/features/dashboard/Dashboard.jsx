import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Plane, Hotel, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getUserBookings } from '../bookings/bookings.api'
import { SkeletonCard } from '../../ui/Skeleton'

const Dashboard = () => {
  const { user } = useAuth()

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['userBookings'],
    queryFn: getUserBookings
  })

  const stats = [
    {
      icon: Calendar,
      label: 'Total Bookings',
      value: bookings.length || 0,
      color: 'bg-blue-500',
      trend: '+12%'
    },
    {
      icon: Plane,
      label: 'Flights Booked',
      value: bookings.filter(b => b.type === 'flight').length || 0,
      color: 'bg-purple-500',
      trend: '+8%'
    },
    {
      icon: Hotel,
      label: 'Hotels Booked',
      value: bookings.filter(b => b.type === 'hotel').length || 0,
      color: 'bg-green-500',
      trend: '+15%'
    },
    {
      icon: Package,
      label: 'Packages',
      value: bookings.filter(b => b.type === 'package').length || 0,
      color: 'bg-orange-500',
      trend: '+20%'
    }
  ]

  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'danger',
      completed: 'info'
    }
    return variants[status] || 'default'
  }

  const recentBookings = bookings.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-blue-100">
            Here's what's happening with your travel bookings today
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">{stat.trend}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Link to="/dashboard/bookings">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No bookings yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start planning your next adventure!
              </p>
              <Link to="/">
                <Button>Explore Destinations</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {booking.type === 'flight' && <Plane className="w-6 h-6 text-primary" />}
                      {booking.type === 'hotel' && <Hotel className="w-6 h-6 text-primary" />}
                      {booking.type === 'package' && <Package className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {booking.itemDetails?.name || `${booking.type} Booking`}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <Badge variant={getStatusBadge(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ₹{booking.totalPrice?.toLocaleString()}
                    </p>
                    <Link
                      to={`/dashboard/bookings`}
                      className="text-sm text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="cursor-pointer">
          <Link to="/search?type=flights">
            <CardContent className="text-center py-8">
              <Plane className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Book a Flight</h3>
              <p className="text-sm text-gray-600">Find the best flight deals</p>
            </CardContent>
          </Link>
        </Card>

        <Card hover className="cursor-pointer">
          <Link to="/search?type=hotels">
            <CardContent className="text-center py-8">
              <Hotel className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Book a Hotel</h3>
              <p className="text-sm text-gray-600">Discover amazing stays</p>
            </CardContent>
          </Link>
        </Card>

        <Card hover className="cursor-pointer">
          <Link to="/search?type=packages">
            <CardContent className="text-center py-8">
              <Package className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Holiday Packages</h3>
              <p className="text-sm text-gray-600">Complete travel packages</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard