import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, Key, Lock, Bell } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <Helmet>
        <title>Security Settings | Admin Dashboard</title>
      </Helmet>

      <div className="flex items-center gap-3 mb-8">
        <ShieldAlert className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Security Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage API keys and security policies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">API Keys</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Manage your API keys to authenticate with external services.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg flex justify-between items-center">
            <code className="text-sm text-slate-800 dark:text-slate-200">sk_live_...489f</code>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Reveal</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Password Policy</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Require users to have complex passwords.
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enforce Complexity</span>
            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
