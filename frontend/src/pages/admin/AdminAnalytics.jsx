import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchSentiment, fetchAverageRating } from '../../features/analytics/analyticsSlice';
import { BarChart3, Database, HardDrive, Cpu, Loader2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const AdminAnalytics = () => {
  const dispatch = useDispatch();
  const { averageRating, sentiment, loading } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchSentiment());
    dispatch(fetchAverageRating());
  }, [dispatch]);

  const sentimentData = sentiment?.data ? [
    { name: 'Negative', value: sentiment.data.negative },
    { name: 'Positive', value: sentiment.data.positive }
  ] : [];

  const SENTIMENT_COLORS = ['#ef4444', '#10b981'];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>System Analytics | Admin Dashboard</title>
      </Helmet>

      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-emerald-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400">View advanced system metrics and resource usage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Database className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Database Size</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">12.4 MB</div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Cpu className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">API Requests (24h)</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">8,439</div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Server Status</div>
            <div className="text-2xl font-bold text-emerald-500">Healthy</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Database Sentiment Overview</h3>
          {loading ? (
             <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
             </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
