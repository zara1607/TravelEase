import { useState, useEffect } from 'react'

/**
 * Custom hook to track scroll position and direction
 * @returns {object} - { scrollY, scrollDirection, isAtTop, isScrolled }
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [isAtTop, setIsAtTop] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollState = () => {
      const currentScrollY = window.pageYOffset
      
      // Determine scroll direction
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      
      // Update states
      setScrollY(currentScrollY)
      setScrollDirection(direction)
      setIsAtTop(currentScrollY < 10)
      setIsScrolled(currentScrollY > 20)
      
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollState)

    // Initial call
    updateScrollState()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateScrollState)
    }
  }, [])

  return {
    scrollY,
    scrollDirection,
    isAtTop,
    isScrolled
  }
}

export default useScroll