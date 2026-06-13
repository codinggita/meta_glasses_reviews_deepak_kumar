import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchReviews, setFilters, setPage, clearFilters, toggleLikeReview } from '../features/reviews/reviewSlice';
import { Search, Filter, Star, Lock, Loader2, CheckCircle2, Calendar, MapPin, ThumbsUp } from 'lucide-react';
import ReviewModal from '../components/ReviewModal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Reviews = () => {
  const dispatch = useDispatch();
  const { items, pagination, filters, loading, error } = useSelector((state) => state.review);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedReview, setSelectedReview] = useState(null);
  const [localLikedReviews, setLocalLikedReviews] = useState(() => {
    const saved = localStorage.getItem('likedReviews');
    return saved ? JSON.parse(saved) : {};
  });

  const handleToggleLike = async (e, review) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to vote on reviews');
      return;
    }
    
    const isLiked = localLikedReviews[review.reviewID];
    const action = isLiked ? 'unlike' : 'like';
    
    const updatedLiked = { ...localLikedReviews, [review.reviewID]: !isLiked };
    setLocalLikedReviews(updatedLiked);
    localStorage.setItem('likedReviews', JSON.stringify(updatedLiked));

    try {
      await dispatch(toggleLikeReview({ id: review.reviewID, action })).unwrap();
    } catch (err) {
      const reverted = { ...localLikedReviews, [review.reviewID]: isLiked };
      setLocalLikedReviews(reverted);
      localStorage.setItem('likedReviews', JSON.stringify(reverted));
      toast.error(err || 'Failed to update like');
    }
  };

  const displayItems = useMemo(() => {
    if (isAuthenticated) return items;
    
    const positive = [];
    const negative = [];
    const others = [];
    
    items.forEach(item => {
      if (item.is_positive_review === true) {
        if (positive.length < 5) positive.push(item);
      } else if (item.is_positive_review === false) {
        if (negative.length < 5) negative.push(item);
      } else {
        others.push(item);
      }
    });
    
    return [...positive, ...negative, ...others].slice(0, 9);
  }, [items, isAuthenticated]);

  useEffect(() => {
    dispatch(fetchReviews({
      page: pagination.page,
      limit: pagination.limit,
      ...filters
    }));
  }, [dispatch, pagination.page, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled via the form submission
    dispatch(fetchReviews({
      page: 1,
      limit: pagination.limit,
      ...filters
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Meta Glasses Analytics | Reviews</title>
        <meta name="description" content="Browse and filter Meta Smart Glasses user reviews." />
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Customer Reviews</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse through detailed customer feedback and sentiments.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search reviews..."
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
            />
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="block w-full lg:w-32 py-3 pl-3 pr-10 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            
            <select
              name="sentiment"
              value={filters.sentiment}
              onChange={handleFilterChange}
              className="block w-full lg:w-40 py-3 pl-3 pr-10 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Sentiments</option>
              <option value="1">Positive</option>
              <option value="0">Negative</option>
            </select>
            
            <select
              name="verifiedPurchase"
              value={filters.verifiedPurchase}
              onChange={handleFilterChange}
              className="block w-full lg:w-48 py-3 pl-3 pr-10 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Verification Status</option>
              <option value="true">Verified Purchase</option>
              <option value="false">Unverified</option>
            </select>

            <button
              type="button"
              onClick={() => dispatch(clearFilters())}
              className="w-full lg:w-auto px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && items.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl p-6 h-64 border border-slate-200 dark:border-slate-700">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center border border-red-200 dark:border-red-800">
          <p className="font-semibold text-lg mb-2">Oops! Something went wrong</p>
          <p>{error}</p>
        </div>
      )}

      {/* Reviews Grid */}
      {!loading && !error && displayItems.length === 0 && (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl text-center border border-slate-200 dark:border-slate-700">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No reviews found</h3>
          <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search term.</p>
        </div>
      )}

      {!error && displayItems.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {displayItems.map((review, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={review._id || review.reviewID || index}
                onClick={() => setSelectedReview(review)}
                className="cursor-pointer bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star 
                        key={index} 
                        className={`w-4 h-4 ${index < (review.rating || 0) ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`} 
                      />
                    ))}
                  </div>
                  {review.is_positive_review === true ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Positive
                    </span>
                  ) : review.is_positive_review === false ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      Negative
                    </span>
                  ) : null}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {review.title || 'Review'}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 text-sm line-clamp-4">
                  {review.review || 'No review content'}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <div className="font-medium text-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">
                        {(review.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[100px]">{review.name || 'Anonymous'}</span>
                    </div>
                    {review.verifiedPurchase && (
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {review.date ? new Date(review.date).toLocaleDateString() : 'Unknown date'}
                      </span>
                      {review.country && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {review.country}
                        </span>
                      )}
                    </div>
                    {review.helpful_aug >= 0 && (
                      <button 
                        onClick={(e) => handleToggleLike(e, review)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
                          localLikedReviews[review.reviewID] 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-medium' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                        }`}
                        title="Mark as helpful"
                      >
                        <ThumbsUp className={`w-3 h-3 ${localLikedReviews[review.reviewID] ? 'fill-current' : ''}`} />
                        {review.helpful_aug} found helpful
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination or Login Prompt */}
          {!isAuthenticated ? (
            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Want to see more reviews?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Sign in to your account to read all customer reviews, filter by sentiments, and see advanced analytics.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            pagination.page < pagination.totalPages && (
              <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  More reviews available
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Click below to load the next 9 reviews.
                </p>
                <button
                  onClick={() => dispatch(setPage(pagination.page + 1))}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center mx-auto gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Load More Reviews
                </button>
              </div>
            )
          )}
        </>
      )}

      {/* Review Details Modal */}
      <ReviewModal 
        review={selectedReview} 
        onClose={() => setSelectedReview(null)} 
        onToggleLike={handleToggleLike}
        isLiked={selectedReview ? localLikedReviews[selectedReview.reviewID] : false}
      />
    </div>
  );
};

export default Reviews;
