import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineChatAlt2 } from 'react-icons/hi';

const AIAssistantPromo = () => {
  return (
    <section className="py-28 lg:py-36 bg-white" id="ai-assistant-promo">
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual card (5 cols) */}
          <div className="lg:col-span-5 bg-primary text-text-inverse p-8 sm:p-10 rounded-xl shadow-lg relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <HiOutlineChatAlt2 className="w-5 h-5" />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium">Bespoke Concierge</p>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                "What should I wear to an evening rooftop dinner in Mumbai?"
              </h3>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg text-xs text-white/80 leading-relaxed border border-white/15">
                "Pair our Pure Linen Shirt in White with Japanese Selvedge Straight Jeans. Layer with the Tailored Utility Jacket in Olive for refined contrast."
              </div>
            </div>
          </div>

          {/* Right Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-secondary border border-border text-primary text-[11px] font-sans tracking-[0.2em] uppercase font-semibold">
              <HiOutlineSparkles className="w-3.5 h-3.5" /> AI Style Intelligence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-primary">
              Not Sure What to Wear?
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg">
              Our bespoke AI Fashion Consultant understands occasions, weather, color coordination, and silhouette balance. Get instant recommendations matched directly to the TIMELESS TRENDS collection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Occasion & dress-code matching</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Color palette and textile guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Capsule wardrobe curation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Direct 1-click cart addition</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/ai-stylist"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.16em] font-semibold hover:bg-primary-light transition-all rounded shadow-sm"
              >
                Consult Your Stylist <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPromo;
