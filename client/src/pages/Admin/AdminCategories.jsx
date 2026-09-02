import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlinePlus, HiOutlineTrash, HiOutlineTag } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [newCatGender, setNewCatGender] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await api.post('/categories', { name: newCatName.trim(), gender: newCatGender });
      toast.success('Category added');
      setNewCatName('');
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Categories — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Category Structure</h1>
          <p className="text-xs text-gray-500">Configure departments and shop navigation taxonomies</p>
        </div>

        {/* Create form */}
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center">
          <input
            type="text"
            required
            placeholder="New category name (e.g. Blazers, Knitwear)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900 w-full sm:w-auto"
          />
          <select
            value={newCatGender}
            onChange={(e) => setNewCatGender(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900 w-full sm:w-auto"
          >
            <option value="all">All Genders</option>
            <option value="men">Men Only</option>
            <option value="women">Women Only</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-black transition-colors shrink-0 w-full sm:w-auto"
          >
            Add Category
          </button>
        </form>

        {/* Categories list */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <div key={cat._id} className="p-4 flex items-center justify-between hover:bg-gray-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                    <HiOutlineTag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{cat.name}</h4>
                    <p className="text-xs text-gray-400">Slug: /{cat.slug} · Scope: {cat.gender}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
