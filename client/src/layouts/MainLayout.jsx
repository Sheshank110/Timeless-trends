import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import CartDrawer from '../components/cart/CartDrawer';
import WhatsAppButton from '../components/common/WhatsAppButton';

// MainLayout: NO Footer — footer is reserved for the homepage only (HomeLayout)
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <AnnouncementBar />
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
