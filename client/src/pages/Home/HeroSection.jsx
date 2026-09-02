import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBanner from '../../assets/hero-banner.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[88vh] min-h-[620px] max-h-[950px] overflow-hidden bg-primary" id="hero-section">
      {/* Background Image with Ambient Zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={heroBanner}
          alt="TIMELESS TRENDS Fashion Collection"
          className="w-full h-full object-cover object-center filter brightness-[0.92]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </motion.div>

      {/* Content with generous left margin & edge spacing */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
          <div className="max-w-2xl text-left">
            {/* Editorial capsule badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-sans tracking-[0.2em] uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Autumn / Winter Capsule 2025
            </motion.div>

            <motion.h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              TIMELESS
              <br />
              TRENDS
            </motion.h1>

            <motion.p
              className="text-white/85 text-base sm:text-lg font-serif italic tracking-wide mb-10 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Style That Never Goes Out of Fashion. Designed with intentional restraint and tactile luxury.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                to="/men"
                className="px-8 py-3.5 bg-white text-primary text-xs tracking-[0.16em] uppercase font-semibold hover:bg-white/90 transition-all hover:shadow-lg shadow-sm"
              >
                Explore Men
              </Link>
              <Link
                to="/women"
                className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs tracking-[0.16em] uppercase font-semibold hover:bg-white hover:text-primary transition-all shadow-sm"
              >
                Explore Women
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-sans">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
