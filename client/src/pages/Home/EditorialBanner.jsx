import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditorialBanner = () => {
  return (
    <section className="py-0 relative overflow-hidden" id="editorial-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Left Lifestyle Photo (7 cols) */}
        <motion.div
          className="lg:col-span-7 relative min-h-[400px] lg:min-h-[560px] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1400"
            alt="Editorial campaign"
            className="w-full h-full object-cover filter brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
        </motion.div>

        {/* Right Editorial Copy (5 cols) */}
        <motion.div
          className="lg:col-span-5 bg-primary flex items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-0 text-white z-10"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-6 max-w-md">
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 font-medium block">
              The Seasonal Lookbook
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-[-0.01em] leading-[1.1]">
              Where Restraint
              <br />
              Meets Luxury
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              Crafted in limited runs with European linens, heavyweight cottons, and architectural cuts. Each piece is designed to be worn across years, never defined by fleeting fads.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-block px-8 py-3.5 bg-white text-primary text-xs uppercase tracking-[0.16em] font-semibold hover:bg-white/90 transition-all hover:shadow-lg"
              >
                Explore The Edit
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EditorialBanner;
