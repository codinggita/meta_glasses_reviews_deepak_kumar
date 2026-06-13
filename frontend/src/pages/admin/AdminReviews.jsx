import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchReviews, setPage } from '../../features/reviews/reviewSlice';
import api from '../../services/api';
import { Database, Trash2, Edit, Loader2, Search, Eye } from 'lucide-react';
import ReviewModal from '../../components/ReviewModal';
import toast from 'react-hot-toast';

const AdminReviews = () => {
  const dispatch = useDispatch();
  const { items: reviews, pagination, loading } = useSelector((state) => state.review);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    dispatch(fetchReviews({ page: pagination.page, limit: pagination.limit, search: searchTerm }));
  }, [dispatch, pagination.page, pagination.limit, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await api.delete(`/reviews/${id}`);
        toast.success('Review deleted successfully');
        dispatch(fetchReviews({ page: pagination.page, limit: pagination.limit, search: searchTerm }));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    dispatch(fetchReviews({ page: 1, limit: pagination.limit, search: searchTerm }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Manage Reviews | Admin Dashboard</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <Database className="w-8 h-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Review Management</h1>
            <p className="text-slate-600 dark:text-slate-400">Moderate and manage all user reviews.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search reviews..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-500 dark:text-slate-400">
                <th className="px-6 py-4">ID / Title</th>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Sentiment</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-500" />
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{review.reviewID}</div>
                      <div className="font-medium text-slate-900 dark:text-white line-clamp-1">{review.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{review.review}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-xs">{review.country}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {review.rating}/5
                    </td>
                    <td className="px-6 py-4">
                      {review.is_positive_review === 1 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Positive
                        </span>
                      ) : review.is_positive_review === 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Negative
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View review details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing page {pagination.page} of {pagination.totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(setPage(pagination.page - 1))}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => dispatch(setPage(pagination.page + 1))}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-lg text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      <ReviewModal 
        review={selectedReview} 
        onClose={() => setSelectedReview(null)} 
      />
    </div>
  );
};

export default AdminReviews;
