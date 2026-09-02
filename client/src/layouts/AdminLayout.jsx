import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuthenticated } from '../features/auth/authSlice';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
