import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Users, Database, ShieldAlert, BarChart3, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../features/users/userSlice';
import { fetchSentiment } from '../../features/analytics/analyticsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { pagination: usersPagination } = useSelector((state) => state.users);
  const { sentiment } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 1, role: 'user' }));
    dispatch(fetchSentiment());
  }, [dispatch]);

  const adminModules = [
    {
      title: 'Users Management',
      description: 'Manage users, roles, and permissions.',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
      path: '/admin/users'
    },
    {
      title: 'Reviews Management',
      description: 'Moderate reviews, edit, or delete items.',
      icon: <Database className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
      path: '/admin/reviews'
    },
    {
      title: 'System Analytics',
      description: 'View advanced system metrics and logs.',
      icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
      path: '/admin/analytics'
    },
    {
      title: 'Security Settings',
      description: 'Manage API keys and security policies.',
      icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
      color: 'bg-red-100 dark:bg-red-900/30 text-red-600',
      path: '/admin/settings'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Admin Dashboard | Meta Glasses Analytics</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Control Panel</h1>
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 text-xs font-bold rounded-full uppercase tracking-wider">
              Admin
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            System administration and management dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 pr-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <div className="font-bold text-slate-900 dark:text-white">{user?.name}</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs">{user?.email}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{usersPagination.totalCount || '-'}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Reviews</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {sentiment?.data ? (sentiment.data.positive + sentiment.data.negative).toLocaleString() : '-'}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">System Health</h3>
          <p className="text-3xl font-bold text-green-500">99.9%</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Active Sessions</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">34</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Management Modules</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminModules.map((module, index) => (
          <Link 
            key={index}
            to={module.path}
            className="group bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-start gap-5"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${module.color}`}>
              {module.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {module.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {module.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
