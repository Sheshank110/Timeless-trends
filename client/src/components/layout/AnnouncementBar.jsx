import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  'COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER ₹999',
  'THE AUTUMN/WINTER CAPSULE — NOW AVAILABLE',
  'USE CODE WELCOME10 FOR 10% OFF YOUR FIRST ORDER',
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-text-inverse py-2 px-4 text-center overflow-hidden border-b border-white/5 relative z-[201]">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {announcements[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;
