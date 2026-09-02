import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi';

const CustomizerPromo = () => {
  return (
    <section className="py-28 lg:py-36 bg-[#F3EFE9] border-y border-[#E6DFD5] relative overflow-hidden" id="customizer-promo">
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left copy (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DFD5] text-primary text-[11px] font-sans tracking-[0.2em] uppercase font-semibold">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-600" /> Interactive Styling Studio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-primary">
              Create Your Signature Ensemble
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg">
              Experiment with pairing our 240 GSM organic tees, European linen shirts, Japanese selvedge denim, and structured outerwear. Preview the entire silhouette in real time and purchase the complete ensemble in a single click.
            </p>
            <div className="pt-2">
              <Link
                to="/customize"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.16em] font-semibold hover:bg-primary-light transition-all rounded shadow-sm"
              >
                Launch Outfit Studio <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Stack (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-5">
            <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-xs border border-[#E6DFD5]">
              <img
                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800"
                alt="Upper garment customizer preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-xs border border-[#E6DFD5] mt-8">
              <img
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
                alt="Lower garment customizer preview"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizerPromo;
