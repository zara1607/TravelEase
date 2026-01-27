import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Hotel, Package, Calendar, MapPin, Users, X } from 'lucide-react'
import { Card, CardContent } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserBookings, cancelBooking } from '../bookings/bookings.api'
import { SkeletonCard } from '../../ui/Skeleton'
import toast from 'react-hot-toast'
import { CURRENCY } from '../../lib/constants'

const BookingHistory = () => {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['userBookings'],
    queryFn: getUserBookings
  })

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      toast.success('Booking cancelled successfully')
      queryClient.invalidateQueries(['userBookings'])
      setShowCancelModal(false)
      setSelectedBooking(null)
    },
    onError: () => {
      toast.error('Failed to cancel booking')
    }
  })

  const filterOptions = [
    { value: 'all', label: 'All Bookings' },
    { value: 'flights', label: 'Flights' },
    { value: 'hotels', label: 'Hotels' },
    { value: 'packages', label: 'Packages' }
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

  const getIcon = (type) => {
    const icons = {
      flight: Plane,
      hotel: Hotel,
      package: Package
    }
    return icons[type] || Plane
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    if (filter === 'flights') return booking.type === 'flight'
    if (filter === 'hotels') return booking.type === 'hotel'
    if (filter === 'packages') return booking.type === 'package'
    return true
  })

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking)
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    if (selectedBooking) {
      cancelMutation.mutate(selectedBooking._id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage all your travel bookings</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === option.value
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings found`
              }
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Start Booking
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking, index) => {
            const Icon = getIcon(booking.type)
            return (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover>
                  <CardContent>
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Icon & Type */}
                      <div className="flex items-start gap-4 lg:w-1/4">
                        <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <Badge variant={getStatusBadge(booking.status)} className="mb-2">
                            {booking.status}
                          </Badge>
                          <h3 className="font-bold text-gray-900 mb-1">
                            {booking.itemDetails?.name || `${booking.type} Booking`}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Booking ID: {booking._id?.slice(-8)}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 lg:w-1/2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(booking.createdAt).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          {booking.itemDetails?.location && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{booking.itemDetails.location}</span>
                            </div>
                          )}
                          {booking.passengerDetails && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">{booking.passengerDetails.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="lg:w-1/4 flex flex-col items-end justify-between">
                        <div className="text-right mb-4">
                          <p className="text-sm text-gray-500 mb-1">Total Price</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {CURRENCY.symbol}{booking.totalPrice?.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex gap-2 w-full lg:w-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            fullWidth
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View Details
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleCancelBooking(booking)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Booking"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => setShowCancelModal(false)}
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              loading={cancelMutation.isPending}
              onClick={confirmCancel}
            >
              Yes, Cancel Booking
            </Button>
          </div>
        </div>
      </Modal>

      {/* Booking Details Modal */}
      <Modal
        isOpen={selectedBooking && !showCancelModal}
        onClose={() => setSelectedBooking(null)}
        title="Booking Details"
        size="lg"
      >
        {selectedBooking && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Booking Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Booking ID</p>
                  <p className="font-medium text-gray-900">{selectedBooking._id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <Badge variant={getStatusBadge(selectedBooking.status)}>
                    {selectedBooking.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-500">Booking Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedBooking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-medium text-gray-900">
                    {CURRENCY.symbol}{selectedBooking.totalPrice?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {selectedBooking.passengerDetails && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Passenger Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.passengerDetails.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.passengerDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.passengerDetails.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BookingHistory