import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.jpg';

const footerLinks = {
  collections: [
    { label: 'Men’s Capsule', path: '/men' },
    { label: 'Women’s Edit', path: '/women' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Trending Styles', path: '/trending' },
    { label: 'All Garments', path: '/shop' },
  ],
  services: [
    { label: 'Customer Concierge', path: '/contact' },
    { label: 'Frequently Asked Questions', path: '/faq' },
    { label: 'Express Shipping Policy', path: '/shipping-policy' },
    { label: '14-Day Returns & Exchanges', path: '/return-policy' },
    { label: 'Live Order Tracking', path: '/account/orders' },
  ],
  atelier: [
    { label: 'Our Philosophy & Craft', path: '/about' },
    { label: 'Custom Atelier Studio', path: '/customize' },
    { label: 'AI Wardrobe Stylist', path: '/ai-stylist' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Thank you for joining our private styling circle');
    setEmail('');
  };

  return (
    <footer className="bg-primary text-text-inverse border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-3 font-sans font-medium">
            Private Style Journal
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl tracking-[-0.01em] mb-4 text-white">
            Receive Curated Lookbooks & Early Access
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
            Subscribe to our seasonal edit for invitations to private capsule drops, fabric stories, and bespoke styling advice.
          </p>
          <form onSubmit={handleNewsletter} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3.5 bg-white/5 border border-white/20 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
              id="newsletter-email"
              required
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-primary text-xs font-semibold tracking-[0.14em] uppercase hover:bg-white/90 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="TIMELESS TRENDS Emblem"
                className="h-12 w-12 rounded-full object-cover border border-white/20 shadow-sm"
              />
              <div>
                <h2 className="font-serif text-2xl tracking-[0.14em] text-white uppercase">TIMELESS TRENDS</h2>
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mt-0.5">Haute Atelier · 2026</p>
              </div>
            </Link>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Style That Never Goes Out of Fashion. Designed with architectural silhouettes, organic textiles, and sustainable ethics for discerning wardrobes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {['Instagram', 'Pinterest', 'Vogue', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-3 py-1.5 border border-white/15 text-[11px] text-white/70 hover:text-white hover:border-white transition-colors uppercase tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 mb-5">
                Collections
              </h4>
              <ul className="space-y-3 text-xs text-white/60">
                {footerLinks.collections.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 mb-5">
                Client Services
              </h4>
              <ul className="space-y-3 text-xs text-white/60">
                {footerLinks.services.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 mb-5">
                The Atelier
              </h4>
              <ul className="space-y-3 text-xs text-white/60">
                {footerLinks.atelier.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} TIMELESS TRENDS Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>India / INR (₹)</span>
            <Link to="/admin/login" className="hover:text-white/70 transition-colors">
              Atelier Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
