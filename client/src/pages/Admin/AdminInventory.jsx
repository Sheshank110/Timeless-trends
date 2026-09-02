import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiOutlineArchive, HiOutlineRefresh } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const { data } = await api.get('/admin/inventory');
      setProducts(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleStockUpdate = async (id, newStock) => {
    try {
      await api.put(`/admin/inventory/${id}`, { stock: Number(newStock) });
      toast.success('Stock adjusted');
      fetchInventory();
    } catch (err) {
      toast.error('Failed to update stock');
    }
  };

  return (
    <>
      <Helmet>
        <title>Inventory Management — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory & Stock Tracking</h1>
          <p className="text-xs text-gray-500">Monitor stock levels and instantly replenish units</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-500 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">SKU / Item</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Unit Price</th>
                  <th className="py-3.5 px-4">Current Stock</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/80">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-gray-900">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{p.sku || 'SKU-PENDING'}</p>
                    </td>
                    <td className="py-3.5 px-4 capitalize">{p.category?.name || 'All'}</td>
                    <td className="py-3.5 px-4 font-medium">₹{p.price?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{p.stock} units</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stock <= 5
                            ? 'bg-red-100 text-red-700'
                            : p.stock <= 15
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {p.stock <= 5 ? 'Critical Low' : p.stock <= 15 ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {[+10, +25, +50].map((increment) => (
                          <button
                            key={increment}
                            onClick={() => handleStockUpdate(p._id, p.stock + increment)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-900 hover:text-white rounded text-[10px] font-semibold transition-colors"
                          >
                            +{increment}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminInventory;
