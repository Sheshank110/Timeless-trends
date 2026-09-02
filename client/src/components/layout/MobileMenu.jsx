import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineUser, HiOutlineCog } from 'react-icons/hi';
import { setMobileMenu } from '../../features/ui/uiSlice';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const menuLinks = [
  { label: 'Home', path: '/' },
  { label: 'Men', path: '/men' },
  { label: 'Women', path: '/women' },
  { label: 'AI Stylist', path: '/ai-stylist' },
  { label: 'Create Your Look', path: '/customize' },
];

const secondaryLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

const MobileMenu = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[299] bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => dispatch(setMobileMenu(false))}
      />

      {/* Menu Panel */}
      <motion.div
        className="fixed top-0 left-0 bottom-0 z-[300] w-[85%] max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/70 bg-white/80 shrink-0">
          <h2 className="font-serif text-xl tracking-[0.2em] uppercase text-primary leading-normal">
            MENU
          </h2>
          <button
            onClick={() => dispatch(setMobileMenu(false))}
            className="p-2 -mr-2 text-primary hover:text-text-secondary rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close menu"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-6 space-y-1">
            {menuLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  className="block py-3 text-sm tracking-[0.14em] uppercase font-sans font-medium text-primary hover:text-primary-light transition-colors border-b border-border-light/70"
                  onClick={() => dispatch(setMobileMenu(false))}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="px-6 mt-8">
            <p className="text-[10px] tracking-[0.22em] uppercase text-text-muted mb-3 font-semibold">
              Atelier Services
            </p>
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-2 text-xs text-text-secondary hover:text-primary transition-colors"
                onClick={() => dispatch(setMobileMenu(false))}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 pb-8 border-t border-border/70 bg-white/80 shrink-0">
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-semibold text-primary hover:text-primary-light transition-colors"
            onClick={() => dispatch(setMobileMenu(false))}
          >
            <HiOutlineUser className="w-4.5 h-4.5" />
            {isAuthenticated ? 'My Account' : 'Sign In / Register'}
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
