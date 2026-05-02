import { useEffect } from 'react';
import { trackScrollDepth } from '@/utils/trackingEvents';

export function useScrollTracking() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrolled = (window.scrollY / scrollHeight) * 100;

      thresholds.forEach(threshold => {
        if (scrolled >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
