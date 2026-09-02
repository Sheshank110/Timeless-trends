import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gender: 'men',
    price: '',
    originalPrice: '',
    stock: 0,
    imageUrl: '',
    material: '',
    fit: 'regular',
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const prod = data.data;
        setFormData({
          name: prod.name || '',
          description: prod.description || '',
          gender: prod.gender || 'men',
          price: prod.price || '',
          originalPrice: prod.originalPrice || '',
          stock: prod.stock || 0,
          imageUrl: prod.images?.[0]?.url || '',
          material: prod.material || '',
          fit: prod.fit || 'regular',
          isFeatured: !!prod.isFeatured,
          isTrending: !!prod.isTrending,
          isNewArrival: !!prod.isNewArrival,
        });
      } catch (err) {
        console.error('Error fetching product for edit:', err);
        toast.error('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        images: formData.imageUrl ? [{ url: formData.imageUrl, alt: formData.name }] : [],
      };

      await api.put(`/products/${id}`, payload);
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="max-w-4xl mx-auto py-12"><div className="h-64 skeleton" /></div>;
  }

  return (
    <>
      <Helmet>
        <title>Edit Product — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <Link
            to="/admin/products"
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 font-semibold"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Edit Product: {formData.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Gender Demographic *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Description & Specifications *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Sale Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Original Price (₹ MRP)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Stock Units Available *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-gray-900"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="w-4 h-4 rounded text-gray-900"
              />
              Trending
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 rounded text-gray-900"
              />
              New Arrival
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Link
              to="/admin/products"
              className="px-5 py-2.5 text-xs uppercase tracking-wider text-gray-600 font-semibold hover:text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Save Product Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminEditProduct;
