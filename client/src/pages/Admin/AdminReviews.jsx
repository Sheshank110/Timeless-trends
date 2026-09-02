import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { HiStar, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/admin/reviews');
      setReviews(data.data || []);
    } catch (err) {
      console.error(err);
      // Mock review for demonstration
      setReviews([
        {
          _id: 'rev-1',
          product: { name: 'Essential Oversized Cotton Tee' },
          user: { firstName: 'Priya', lastName: 'Sharma', email: 'priya@gmail.com' },
          rating: 5,
          title: 'Perfection in fit and fabric',
          comment: 'The drape of this oversized tee is unmatched. Holds shape after 5 washes!',
          isApproved: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleModeration = async (id, isApproved) => {
    try {
      await api.put(`/admin/reviews/${id}/moderation`, { isApproved });
      toast.success(isApproved ? 'Review approved for display' : 'Review suppressed');
      fetchReviews();
    } catch (err) {
      toast.error('Failed to update review moderation');
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews — TIMELESS TRENDS Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Review Moderation</h1>
          <p className="text-xs text-gray-500">Approve or flag verified customer ratings and feedback</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center text-xs text-gray-500">No customer reviews to moderate.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {reviews.map((rev) => (
                <div key={rev._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <HiStar key={i} className={`w-4 h-4 ${i < rev.rating ? 'text-amber-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <span className="font-semibold text-xs text-gray-900">{rev.title}</span>
                    </div>
                    <p className="text-xs text-gray-700">{rev.comment}</p>
                    <p className="text-[11px] text-gray-400">
                      By {rev.user?.firstName} {rev.user?.lastName} on <strong className="text-gray-600">{rev.product?.name}</strong> · {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleModeration(rev._id, true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        rev.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-700'
                      }`}
                    >
                      <HiOutlineCheck className="w-4 h-4" /> {rev.isApproved ? 'Approved' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleModeration(rev._id, false)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-red-600 hover:text-white rounded-lg text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
                    >
                      <HiOutlineX className="w-4 h-4" /> Suppress
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReviews;
