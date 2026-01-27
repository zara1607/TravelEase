import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Clock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '../../ui/Card'
import Badge from '../../ui/Badge'
import Button from '../../ui/Button'
import { CURRENCY } from '../../lib/constants'

const FlightCard = ({ flight }) => {
  const navigate = useNavigate()

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const handleBookNow = () => {
    navigate(`/flights/${flight._id}`)
  }

  return (
    <Card hover className="cursor-pointer" onClick={handleBookNow}>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Airline Logo & Name */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{flight.airline}</p>
                <p className="text-sm text-gray-500">{flight.flightNumber}</p>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between">
              {/* Departure */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(flight.departure.time)}
                </p>
                <p className="text-gray-600 font-medium mt-1">
                  {flight.departure.airport}
                </p>
                <p className="text-sm text-gray-500">{flight.departure.city}</p>
              </div>

              {/* Flight Path */}
              <div className="flex-1 px-6">
                <div className="relative">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      {formatDuration(flight.duration)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-0.5 flex-1 bg-gray-300"></div>
                    <Plane className="w-5 h-5 text-primary -rotate-45 mx-2" />
                    <div className="h-0.5 flex-1 bg-gray-300"></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-500">
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(flight.arrival.time)}
                </p>
                <p className="text-gray-600 font-medium mt-1">
                  {flight.arrival.airport}
                </p>
                <p className="text-sm text-gray-500">{flight.arrival.city}</p>
              </div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="lg:col-span-3 flex flex-col items-end justify-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Starting from</p>
              <p className="text-3xl font-bold text-gray-900">
                {CURRENCY.symbol}{flight.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">per person</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {flight.class && (
                <Badge variant="info">{flight.class}</Badge>
              )}
              {flight.refundable && (
                <Badge variant="success">Refundable</Badge>
              )}
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                handleBookNow()
              }}
            >
              Book Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FlightCard