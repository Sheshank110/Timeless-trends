import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { selectCartCount } from '../../features/cart/cartSlice';
import { selectWishlistItems } from '../../features/wishlist/wishlistSlice';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { setCartDrawer, setSearch, setMobileMenu } from '../../features/ui/uiSlice';
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import logo from '../../assets/logo.jpg';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Men', path: '/men' },
  { label: 'Women', path: '/women' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartCount = useSelector(selectCartCount);
  const wishlistItems = useSelector(selectWishlistItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isMobileMenuOpen, isSearchOpen } = useSelector((state) => state.ui);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(setMobileMenu(false));
  }, [location.pathname, dispatch]);

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-6 focus:z-[600] focus:px-4 focus:py-2 focus:bg-primary focus:text-text-inverse focus:text-xs uppercase tracking-wider"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-[200] transition-all duration-400 ${
          isScrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border/60 shadow-xs py-2.5'
            : 'bg-bg/95 backdrop-blur-xs py-4'
        }`}
      >
        {/* Generous edge spacing: px-6 sm:px-12 lg:px-20 xl:px-24 */}
        <nav className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Left: Mobile hamburger & Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                id="mobile-menu-toggle"
                className="lg:hidden p-2 -ml-2 text-primary hover:text-text-secondary transition-colors"
                onClick={() => dispatch(setMobileMenu(!isMobileMenuOpen))}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5" />
                )}
              </button>

              <Link
                to="/"
                className="flex items-center gap-3 group shrink-0"
                aria-label="TIMELESS TRENDS Home"
              >
                <img
                  src={logo}
                  alt="TIMELESS TRENDS Emblem"
                  className="h-11 sm:h-13 w-11 sm:w-13 object-cover rounded-full border border-black/5 shadow-2xs transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base sm:text-lg tracking-[0.14em] uppercase font-medium text-primary leading-none">
                    TIMELESS TRENDS
                  </span>
                  <span className="text-[9px] tracking-[0.26em] uppercase text-text-muted font-sans font-medium mt-0.5">
                    Haute Atelier · 2026
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Category Nav Links (Men, Women, Teen, etc.) + Actions */}
            <div className="flex items-center gap-6 lg:gap-8 xl:gap-10">
              {/* Desktop Nav Links positioned cleanly on the RIGHT side */}
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative text-xs tracking-[0.16em] uppercase font-sans font-medium transition-colors py-1 ${
                        isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Elegant divider between links and action icons */}
              <div className="hidden lg:block w-[1px] h-4 bg-border/80" />

              {/* Right Action Icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  id="search-toggle"
                  className="p-2 text-primary hover:text-text-secondary transition-colors rounded-full hover:bg-black/5"
                  onClick={() => dispatch(setSearch(true))}
                  aria-label="Search collection"
                >
                  <HiOutlineSearch className="w-4.5 h-4.5" />
                </button>

                <Link
                  to={isAuthenticated ? '/account' : '/login'}
                  className="p-2 text-primary hover:text-text-secondary transition-colors rounded-full hover:bg-black/5 hidden sm:flex items-center justify-center"
                  aria-label="Account"
                >
                  <HiOutlineUser className="w-4.5 h-4.5" />
                </Link>

                <Link
                  to="/wishlist"
                  className="p-2 text-primary hover:text-text-secondary transition-colors rounded-full hover:bg-black/5 relative"
                  aria-label="Wishlist"
                >
                  <HiOutlineHeart className="w-4.5 h-4.5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-text-inverse text-[9px] rounded-full flex items-center justify-center font-bold tabular-nums">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>

                <button
                  id="cart-toggle"
                  className="p-2 text-primary hover:text-text-secondary transition-colors rounded-full hover:bg-black/5 relative"
                  onClick={() => dispatch(setCartDrawer(true))}
                  aria-label="Shopping bag"
                >
                  <HiOutlineShoppingBag className="w-4.5 h-4.5" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-primary text-text-inverse text-[9px] rounded-full flex items-center justify-center font-bold tabular-nums shadow-xs"
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu />}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
