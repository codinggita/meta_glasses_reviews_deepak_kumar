import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { updateProfile } from '../../features/users/userSlice';
import { fetchCurrentUser } from '../../features/auth/authSlice';
import { User, Mail, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.users);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      const resultAction = await dispatch(updateProfile(values));
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success('Profile updated successfully!');
        dispatch(fetchCurrentUser()); // Refresh user data
      } else {
        toast.error('Failed to update profile');
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl min-h-screen">
      <Helmet>
        <title>Edit Profile | Meta Glasses Analytics</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Profile Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Update your personal information.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
            <span className="text-blue-600 dark:text-blue-400 text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Update your photo and personal details.</p>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                name="name"
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps('name')}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.name}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                name="email"
                type="email"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
