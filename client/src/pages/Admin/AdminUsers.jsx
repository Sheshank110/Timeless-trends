import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineUsers, HiOutlineShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    if (!window.confirm(`Change role to ${newRole}?`)) return;
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      toast.success('User role updated');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to change role');
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Accounts — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">User Management</h1>
          <p className="text-xs text-gray-500">Registered customers, verified emails, and admin permissions</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading user database...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Email Verified</th>
                    <th className="py-3.5 px-4">Joined Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-semibold text-gray-900">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${u.isEmailVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {u.isEmailVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleRole(u._id, u.role)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium text-xs underline"
                        >
                          Toggle {u.role === 'admin' ? 'Customer' : 'Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
