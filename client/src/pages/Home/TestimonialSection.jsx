import { useState } from 'react';
import { HiStar, HiOutlineBadgeCheck } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Aarav Singhania',
    city: 'Mumbai',
    role: 'Creative Director',
    quote: 'The textile density and silhouette of the Essential Oversized Tee are on par with Paris fashion houses. It has completely redefined my daily capsule.',
    purchased: 'Essential Oversized Cotton Tee (Onyx Black)',
  },
  {
    id: 2,
    name: 'Meera Nambiar',
    city: 'Bangalore',
    role: 'Architect',
    quote: 'The tailoring on the Structured Blazer is exceptional. Clean, structured shoulders with effortless drape. Outstanding attention to internal finishing.',
    purchased: 'Structured Double-Breasted Blazer',
  },
  {
    id: 3,
    name: 'Rohan Mehra',
    city: 'New Delhi',
    role: 'Product Designer',
    quote: 'Authentic 13oz Japanese selvedge denim at this price point is unheard of in India. The fit around the ankle and waist is impeccably calibrated.',
    purchased: 'Urban Straight Selvedge Jeans',
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5] border-y border-[#E6DFD5]" id="testimonials">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-text-muted font-medium block mb-2">
            Client Perspectives
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-primary">
            Worn & Treasured
          </h2>
        </div>

        <div className="bg-white p-8 sm:p-12 lg:p-16 rounded-xl border border-border-light shadow-2xs text-center relative overflow-hidden">
          {/* Star rating */}
          <div className="flex items-center justify-center gap-1 text-primary mb-8">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className="w-4.5 h-4.5 text-primary" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <blockquote className="font-serif text-2xl sm:text-3xl text-primary leading-snug italic max-w-2xl mx-auto">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              <div className="pt-4">
                <p className="text-sm font-bold text-primary">{testimonials[activeIndex].name}</p>
                <p className="text-xs text-text-muted mt-0.5">
                  {testimonials[activeIndex].role} · {testimonials[activeIndex].city}
                </p>
                <p className="text-[11px] text-emerald-800 font-medium inline-flex items-center gap-1 mt-2 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <HiOutlineBadgeCheck className="w-3.5 h-3.5" /> Verified Atelier Purchase: {testimonials[activeIndex].purchased}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation indicators */}
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-text-muted'
                }`}
                aria-label={`View client review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
