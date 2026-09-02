import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HiOutlineArrowLeft, HiOutlinePhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    gender: 'men',
    price: '',
    originalPrice: '',
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#111111' }, { name: 'White', hex: '#FFFFFF' }],
    imageUrl: '',
    material: '100% Premium Cotton',
    fit: 'regular',
    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await api.get('/categories');
        const cats = data.data || [];
        setCategories(cats);
        if (cats.length > 0) {
          setFormData((prev) => ({ ...prev, category: cats[0]._id }));
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Name and Price are mandatory');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        images: formData.imageUrl ? [{ url: formData.imageUrl, alt: formData.name }] : [],
      };

      await api.post('/products', payload);
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Product — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <Link
            to="/admin/products"
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-gray-500 hover:text-gray-900 font-semibold"
          >
            <HiOutlineArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create New Garment</h1>
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
                placeholder="e.g. Essential Oversized Tee"
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
              placeholder="Describe the fabric, tailoring details, fit, and aesthetic..."
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
                placeholder="1499"
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
                placeholder="1999"
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
              Image URL (Cloudinary or Unsplash CDN)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Material Composition
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Garment Fit
              </label>
              <select
                value={formData.fit}
                onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              >
                <option value="regular">Regular Fit</option>
                <option value="slim">Slim Fit</option>
                <option value="relaxed">Relaxed Fit</option>
                <option value="oversized">Oversized Fit</option>
                <option value="tailored">Tailored Cut</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-gray-900"
              />
              Featured in Showcase
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="w-4 h-4 rounded text-gray-900"
              />
              Trending Style
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
              {isSubmitting ? 'Saving...' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAddProduct;
