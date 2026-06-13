import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { User, Settings, Bookmark, Activity } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Dashboard | Meta Glasses Analytics</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome, {user?.name || 'User'}!</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your profile and view your personalized insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 md:col-span-1 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-800 shadow-lg">
              <span className="text-blue-600 dark:text-blue-400 text-3xl font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{user?.email}</p>
            
            <div className="w-full flex flex-col gap-2">
              <Link to="/profile" className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium text-sm">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link to="/saved-reviews" className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bookmark className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Reviews</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">View bookmarked</p>
              </div>
            </Link>
            
            <Link to="/profile" className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Settings</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Manage details</p>
              </div>
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Welcome to your dashboard</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              You can navigate to your saved reviews or update your profile from the sections above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
