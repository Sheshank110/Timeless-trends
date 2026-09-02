import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { HiOutlineBell, HiOutlineMenu } from 'react-icons/hi';

const AdminHeader = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome back{user ? `, ${user.firstName}` : ''}
        </h2>
        <p className="text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative"
          aria-label="Notifications"
        >
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
          {user ? user.firstName?.[0]?.toUpperCase() : 'A'}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
