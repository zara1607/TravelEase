import React from 'react'
import { Plane, Clock, Wifi, Coffee, Tv, Luggage, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card'
import Badge from '../../ui/Badge'
import { CURRENCY } from '../../lib/constants'

const FlightDetails = ({ flight }) => {
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi', available: flight.amenities?.wifi },
    { icon: Coffee, label: 'Meals', available: flight.amenities?.meals },
    { icon: Tv, label: 'Entertainment', available: flight.amenities?.entertainment },
    { icon: Luggage, label: 'Baggage', available: true }
  ]

  return (
    <div className="space-y-6">
      {/* Flight Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Flight Details</CardTitle>
            <div className="flex gap-2">
              <Badge variant="primary">{flight.class || 'Economy'}</Badge>
              {flight.refundable && <Badge variant="success">Refundable</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Airline Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plane className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{flight.airline}</h3>
                <p className="text-gray-600">{flight.flightNumber}</p>
              </div>
            </div>

            {/* Flight Timeline */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Departure */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Departure</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatTime(flight.departure.time)}
                </p>
                <p className="text-gray-700 font-medium">{flight.departure.city}</p>
                <p className="text-sm text-gray-500">{flight.departure.airport}</p>
                <p className="text-sm text-gray-500 mt-1">{formatDate(flight.departure.time)}</p>
              </div>

              {/* Duration */}
              <div className="flex flex-col justify-center items-center">
                <Clock className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-lg font-semibold text-gray-900">
                  {formatDuration(flight.duration)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Arrival */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Arrival</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {formatTime(flight.arrival.time)}
                </p>
                <p className="text-gray-700 font-medium">{flight.arrival.city}</p>
                <p className="text-sm text-gray-500">{flight.arrival.airport}</p>
                <p className="text-sm text-gray-500 mt-1">{formatDate(flight.arrival.time)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  amenity.available ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <amenity.icon
                  className={`w-6 h-6 ${
                    amenity.available ? 'text-green-600' : 'text-gray-400'
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-900">{amenity.label}</p>
                  <p className="text-xs text-gray-500">
                    {amenity.available ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Baggage Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Baggage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-3">
                <Luggage className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Check-in Baggage</h4>
                  <p className="text-gray-600">{flight.baggage?.checkin || '15 kg'} (1 piece)</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-3">
                <Luggage className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cabin Baggage</h4>
                  <p className="text-gray-600">{flight.baggage?.cabin || '7 kg'} (1 piece)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fare Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Fare Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-semibold text-gray-900">
                {CURRENCY.symbol}{(flight.price * 0.85).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="font-semibold text-gray-900">
                {CURRENCY.symbol}{(flight.price * 0.15).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                {CURRENCY.symbol}{flight.price.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Cancellation Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">
                {flight.refundable
                  ? 'Full refund available up to 24 hours before departure'
                  : 'Non-refundable ticket'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">Free date change up to 6 hours before departure</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-gray-700">No cancellation fees for medical emergencies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlightDetails