import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineLocationMarker,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineCheck,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    label: 'home',
    isDefault: false,
  });

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/users/addresses');
      setAddresses(data.data || []);
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      label: 'home',
      isDefault: addresses.length === 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingId(addr._id);
    setFormData({ ...addr });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/addresses/${editingId}`, formData);
        toast.success('Address updated');
      } else {
        await api.post('/users/addresses', formData);
        toast.success('Address added');
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await api.delete(`/users/addresses/${id}`);
      toast.success('Address deleted');
      fetchAddresses();
    } catch (err) {
      toast.error('Failed to delete address');
    }
  };

  return (
    <>
      <Helmet>
        <title>Saved Addresses — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-light">
          <div>
            <h1 className="font-serif text-3xl tracking-[0.04em]">Saved Addresses</h1>
            <p className="text-xs text-text-muted uppercase tracking-[0.1em] mt-1">
              Manage your delivery locations for faster checkout
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/account" className="text-xs uppercase tracking-[0.1em] text-text-secondary hover:text-primary underline underline-offset-4">
              ← Account
            </Link>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-text-inverse text-xs uppercase tracking-[0.1em] font-medium hover:bg-primary-light transition-colors"
            >
              <HiOutlinePlus className="w-4 h-4" /> Add Address
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-44 skeleton" />
            <div className="h-44 skeleton" />
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-20 bg-bg-secondary/40 border border-border-light p-8">
            <HiOutlineLocationMarker className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h2 className="font-serif text-xl mb-2">No Addresses Saved Yet</h2>
            <p className="text-xs text-text-secondary mb-6">
              Save your delivery addresses for effortless one-click checkout.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-6 py-2.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.12em] font-medium"
            >
              Add New Address
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`p-6 border bg-white flex flex-col justify-between transition-all ${
                  addr.isDefault ? 'border-primary shadow-xs' : 'border-border-light hover:border-border'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-medium uppercase tracking-[0.1em] px-2.5 py-0.5 bg-bg-secondary text-primary">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                        <HiOutlineCheck className="w-3.5 h-3.5" /> Default Address
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-primary mb-1">{addr.fullName}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{addr.address}</p>
                  {addr.apartment && <p className="text-xs text-text-secondary">{addr.apartment}</p>}
                  <p className="text-xs text-text-secondary">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-text-muted mt-2">Phone: {addr.phone}</p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-light text-xs">
                  <button
                    onClick={() => handleOpenEdit(addr)}
                    className="text-text-secondary hover:text-primary flex items-center gap-1 font-medium"
                  >
                    <HiOutlinePencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-error/80 hover:text-error flex items-center gap-1 font-medium ml-auto"
                  >
                    <HiOutlineTrash className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Address Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-bg w-full max-w-lg p-8 shadow-2xl relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-serif text-2xl mb-6 pb-3 border-b border-border">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Apartment / Suite (Optional)</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2 border border-border text-xs bg-transparent focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={formData.isDefault}
                        onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                        className="w-4 h-4 accent-primary"
                      />
                      <span>Set as default address</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-xs uppercase tracking-[0.1em] text-text-muted hover:text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.12em] font-medium"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AddressesPage;
