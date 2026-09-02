import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Our Atelier — TIMELESS TRENDS</title>
        <meta name="description" content="Discover the story behind TIMELESS TRENDS. Minimalist luxury garments designed with precision, longevity, and sustainable craftsmanship." />
      </Helmet>

      {/* Hero */}
      <div className="bg-primary text-text-inverse py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">Our Atelier Story</p>
          <h1 className="font-serif text-4xl sm:text-6xl tracking-[0.03em] mb-4">TIMELESS TRENDS</h1>
          <p className="font-serif italic text-lg sm:text-xl text-white/80">Style That Never Goes Out of Fashion.</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-medium block mb-2">Our Philosophy</span>
            <h2 className="font-serif text-3xl text-primary tracking-[0.02em] mb-4">Precision in Every Stitch</h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Founded on the belief that modern fashion should outlast fleeting seasons, TIMELESS TRENDS crafts capsule wardrobe staples with architectural silhouettes, premium natural textiles, and conscious tailoring.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              We design for discerning men, women, and youth who prioritize lasting style, tactile comfort, and subtle understated luxury.
            </p>
          </div>
          <div className="aspect-[4/3] bg-bg-secondary overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
              alt="Atelier workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border-light text-center">
          <div className="p-6 bg-bg-secondary/40 rounded-lg">
            <h3 className="font-serif text-xl text-primary mb-2">Sustainable Fabrics</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              100% Organic combed cottons, European linens, and heavyweight Japanese selvedge denim.
            </p>
          </div>
          <div className="p-6 bg-bg-secondary/40 rounded-lg">
            <h3 className="font-serif text-xl text-primary mb-2">Ethical Craftsmanship</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Manufactured in fair-wage ateliers prioritizing zero-waste pattern making and longevity.
            </p>
          </div>
          <div className="p-6 bg-bg-secondary/40 rounded-lg">
            <h3 className="font-serif text-xl text-primary mb-2">Contemporary Elegance</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Minimalist aesthetics designed to be mixed, matched, and treasured across every season.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            to="/shop"
            className="inline-block px-8 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.16em] font-medium hover:bg-primary-light transition-all"
          >
            Explore The Collection
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
