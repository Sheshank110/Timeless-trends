import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineArchive,
  HiOutlineTicket,
  HiOutlineStar,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineLogout,
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin', icon: HiOutlineViewGrid, end: true },
  { label: 'Products', path: '/admin/products', icon: HiOutlineCube },
  { label: 'Categories', path: '/admin/categories', icon: HiOutlineTag },
  { label: 'Orders', path: '/admin/orders', icon: HiOutlineShoppingCart },
  { label: 'Users', path: '/admin/users', icon: HiOutlineUsers },
  { label: 'Inventory', path: '/admin/inventory', icon: HiOutlineArchive },
  { label: 'Coupons', path: '/admin/coupons', icon: HiOutlineTicket },
  { label: 'Reviews', path: '/admin/reviews', icon: HiOutlineStar },
  { type: 'divider' },
  { label: 'Sales Analytics', path: '/admin/analytics/sales', icon: HiOutlineChartBar },
  { label: 'Customer Analytics', path: '/admin/analytics/customers', icon: HiOutlineUserGroup },
  { type: 'divider' },
  { label: 'Settings', path: '/admin/settings', icon: HiOutlineCog },
];

import logo from '../../assets/logo.jpg';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 hidden lg:flex">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <img
          src={logo}
          alt="TIMELESS TRENDS Emblem"
          className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-2xs"
        />
        <div>
          <h1 className="font-serif text-sm tracking-[0.12em] font-bold text-gray-900 leading-none">TIMELESS TRENDS</h1>
          <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mt-1">Atelier Workspace</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {sidebarLinks.map((link, i) => {
          if (link.type === 'divider') {
            return <hr key={i} className="my-3 border-gray-100" />;
          }
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <HiOutlineLogout className="w-5 h-5 shrink-0" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
