import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Threshold value (0-1)
 * @param {string} options.rootMargin - Root margin string
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Array} [ref, inView] - Ref callback and visibility state
 */
export const useInView = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);
  const observerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!ref) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (options.triggerOnce && hasTriggeredRef.current) {
          return;
        }

        setInView(isIntersecting);

        if (isIntersecting && options.triggerOnce) {
          hasTriggeredRef.current = true;
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    );

    observerRef.current.observe(ref);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce]);

  return [setRef, inView];
};

export default useInView;