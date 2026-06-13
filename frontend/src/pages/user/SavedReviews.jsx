import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchSavedReviews, removeSavedReview } from '../../features/users/userSlice';
import { Bookmark, Star, Calendar, MapPin, CheckCircle2, Trash2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SavedReviews = () => {
  const dispatch = useDispatch();
  const { savedReviews, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchSavedReviews());
  }, [dispatch]);

  const handleRemove = async (id) => {
    const resultAction = await dispatch(removeSavedReview(id));
    if (removeSavedReview.fulfilled.match(resultAction)) {
      toast.success('Removed from saved reviews');
    } else {
      toast.error('Failed to remove review');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Saved Reviews | Meta Glasses Analytics</title>
      </Helmet>

      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-purple-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Saved Reviews</h1>
          <p className="text-slate-600 dark:text-slate-400">Reviews you have bookmarked for later.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl p-6 h-64 border border-slate-200 dark:border-slate-700">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : savedReviews.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Saved Reviews</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            You haven't saved any reviews yet. Browse the reviews section and save the ones you find interesting.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedReviews.map((review, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              key={review._id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-md transition-shadow relative group"
            >
              <button
                onClick={() => handleRemove(review._id)}
                className="absolute top-4 right-4 p-2 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from saved"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {renderStars(review.rating || 0)}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 pr-8 line-clamp-2">
                {review.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 text-sm line-clamp-4">
                {review.review}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <div className="font-medium text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="truncate max-w-[100px]">{review.name || 'Anonymous'}</span>
                  </div>
                  {review.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedReviews;
