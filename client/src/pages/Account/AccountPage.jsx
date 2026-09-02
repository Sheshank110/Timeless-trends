import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HiOutlineShoppingBag,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineLogout,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { selectCurrentUser, logout } from '../../features/auth/authSlice';

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const accountCards = [
    {
      title: 'My Orders',
      desc: 'Track active shipments, view order history & invoices',
      icon: HiOutlineShoppingBag,
      link: '/account/orders',
    },
    {
      title: 'Saved Addresses',
      desc: 'Manage default billing and delivery locations',
      icon: HiOutlineLocationMarker,
      link: '/account/addresses',
    },
    {
      title: 'Profile Settings',
      desc: 'Update your contact information and security preferences',
      icon: HiOutlineUser,
      link: '/account/settings',
    },
    {
      title: 'My Wishlist',
      desc: 'View and purchase items saved for later',
      icon: HiOutlineHeart,
      link: '/wishlist',
    },
    {
      title: 'AI Style Assistant',
      desc: 'Get curated personalized fashion recommendations',
      icon: HiOutlineSparkles,
      link: '/ai-stylist',
    },
  ];

  return (
    <>
      <Helmet>
        <title>My Account — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* User Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-border-light mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-medium">Welcome to Your Portal</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-primary mt-1">
              Hello, {user?.firstName || 'Valued Customer'}
            </h1>
            <p className="text-sm text-text-secondary mt-1">{user?.email || 'Logged in'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-center flex items-center gap-2 px-5 py-2.5 border border-border hover:border-error hover:text-error text-xs uppercase tracking-[0.12em] font-medium transition-colors"
          >
            <HiOutlineLogout className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className="p-8 bg-bg-secondary/60 hover:bg-bg-secondary border border-border-light hover:border-primary transition-all group block"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl tracking-[0.02em] text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
                <span className="inline-block mt-4 text-xs font-medium text-primary uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform">
                  Access →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AccountPage;
