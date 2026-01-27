import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const HotelGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const defaultImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'
  ]

  const galleryImages = images.length > 0 ? images : defaultImages

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(galleryImages[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = (e) => {
    e.stopPropagation()
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  const goToNext = (e) => {
    e.stopPropagation()
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
        {/* Main Image */}
        <div
          className="col-span-4 md:col-span-2 row-span-2 cursor-pointer relative overflow-hidden group"
          onClick={() => openLightbox(0)}
        >
          <img
            src={galleryImages[0]}
            alt="Hotel main"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
        </div>

        {/* Secondary Images */}
        {galleryImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className="col-span-2 md:col-span-1 aspect-video cursor-pointer relative overflow-hidden group"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image}
              alt={`Hotel ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            
            {/* Show All Photos overlay on last image */}
            {index === 3 && galleryImages.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{galleryImages.length - 5} Photos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            {/* Image */}
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImage}
              alt="Hotel"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default HotelGallery