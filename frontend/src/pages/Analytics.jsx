import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { 
  fetchAverageRating, 
  fetchSentiment, 
  fetchRatingDistribution, 
  fetchMonthlyAverage,
  fetchCountryStats 
} from '../features/analytics/analyticsSlice';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Star, TrendingUp, Users, Map as MapIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
const SENTIMENT_COLORS = ['#ef4444', '#10b981']; // Negative, Positive

const Analytics = () => {
  const dispatch = useDispatch();
  const { 
    averageRating, 
    sentiment, 
    ratingDistribution, 
    monthlyAverage,
    countryStats,
    loading 
  } = useSelector((state) => state.analytics);
  const { theme } = useSelector((state) => state.ui);
  
  const isDark = theme === 'dark';

  useEffect(() => {
    dispatch(fetchAverageRating());
    dispatch(fetchSentiment());
    dispatch(fetchRatingDistribution());
    dispatch(fetchMonthlyAverage());
    dispatch(fetchCountryStats());
  }, [dispatch]);

  // Format data for charts
  const ratingData = ratingDistribution?.data?.map(item => ({
    name: `${item._id} Stars`,
    count: item.count
  })).sort((a, b) => b.name.localeCompare(a.name)) || [];

  const sentimentData = sentiment?.data ? [
    { name: 'Negative', value: sentiment.data.negative },
    { name: 'Positive', value: sentiment.data.positive }
  ] : [];

  const monthlyData = monthlyAverage?.data?.map(item => ({
    name: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
    rating: Number(item.averageRating?.toFixed(2) || 0),
    count: item.count
  })).sort((a, b) => a.name.localeCompare(b.name)) || [];

  const topCountriesData = countryStats?.data?.slice(0, 5).map(item => ({
    name: item._id,
    reviews: item.count,
    rating: Number(item.avgRating.toFixed(2))
  })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartAxisProps = {
    stroke: isDark ? '#475569' : '#94a3b8',
    style: { fontSize: '12px', fontFamily: 'Inter' }
  };

  if (loading && !averageRating) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>Meta Glasses Analytics | Dashboard</title>
        <meta name="description" content="Advanced analytics dashboard for Meta Smart Glasses." />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analytics Overview</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Deep dive into product performance and customer sentiment metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Average Rating</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {averageRating?.data ? Number(averageRating.data.averageRating).toFixed(1) : '-'}
              </h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
            <span>Overall rating from all users</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Reviews</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {sentiment?.data ? (sentiment.data.positive + sentiment.data.negative).toLocaleString() : '-'}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
            <span>Total dataset size</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Positive Sentiment</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {sentiment?.data ? 
                  Math.round((sentiment.data.positive / (sentiment.data.positive + sentiment.data.negative)) * 100) 
                : '-'}%
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
            <span>Of all analyzed reviews</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Top Region</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                {countryStats?.data?.[0]?._id || '-'}
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <MapIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span>{countryStats?.data?.[0]?.count || 0} reviews</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Rating Distribution Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Rating Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" {...chartAxisProps} />
                <YAxis {...chartAxisProps} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Reviews">
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sentiment Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Overall Sentiment</h3>
          <div className="h-72 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Monthly Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Monthly Average Rating Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" {...chartAxisProps} />
                <YAxis domain={['auto', 'auto']} {...chartAxisProps} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="rating" name="Avg Rating" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Countries */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 lg:col-span-2"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Regions by Review Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCountriesData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis type="number" {...chartAxisProps} />
                <YAxis dataKey="name" type="category" {...chartAxisProps} width={100} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="reviews" name="Total Reviews" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;
