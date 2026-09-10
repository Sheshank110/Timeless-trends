import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import CartDrawer from '../components/cart/CartDrawer';
import WhatsAppButton from '../components/common/WhatsAppButton';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
