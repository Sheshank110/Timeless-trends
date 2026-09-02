import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch,
  HiOutlineCube,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/products?limit=50&search=${encodeURIComponent(search)}`);
      setProducts(data.data || []);
    } catch (err) {
      console.error('Error fetching admin products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Products — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Product Catalog</h1>
            <p className="text-xs text-gray-500">Manage all styles, inventory counts, and pricing</p>
          </div>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors self-start sm:self-auto"
          >
            <HiOutlinePlus className="w-4 h-4" /> Add New Product
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3">
          <HiOutlineSearch className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, SKU, tags or gender..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent focus:outline-none"
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading products catalog...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <HiOutlineCube className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-700">No products found</p>
              <Link to="/admin/products/add" className="text-xs text-indigo-600 underline mt-1 inline-block">
                Create first product
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Gender</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {products.map((prod) => (
                    <tr key={prod._id} className="hover:bg-gray-50/80">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-gray-100 rounded overflow-hidden shrink-0">
                            {prod.images?.[0]?.url && (
                              <img src={prod.images[0].url} alt={prod.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{prod.sku || 'NO-SKU'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 capitalize">{prod.category?.name || 'Garment'}</td>
                      <td className="py-3.5 px-4 capitalize">{prod.gender}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">₹{prod.price?.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {prod.stock} in stock
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700">
                          {prod.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/products/edit/${prod._id}`}
                            className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                            title="Edit"
                          >
                            <HiOutlinePencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(prod._id, prod.name)}
                            className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-4 h-4" />
                          </button>
                        </div>
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

export default AdminProducts;
