import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide tour package name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: 3000
  },
  destination: {
    type: String,
    required: [true, 'Please provide destination']
  },
  duration: {
    type: String,
    required: [true, 'Please provide duration'],
    // e.g., "5 Days, 4 Nights"
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  originalPrice: {
    type: Number
  },
  images: [{
    type: String
  }],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  inclusions: [{
    type: String,
    trim: true
  }],
  exclusions: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 0
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1
  },
  availableSlots: {
    type: Number,
    required: true,
    min: 0
  },
  startDates: [{
    type: Date
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'difficult'],
    default: 'moderate'
  },
  category: {
    type: String,
    enum: ['adventure', 'cultural', 'beach', 'wildlife', 'spiritual', 'honeymoon'],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
})

// Index for searching
tourSchema.index({ destination: 1, price: 1 })
tourSchema.index({ rating: -1 })

const Tour = mongoose.model('Tour', tourSchema)

export default Tour