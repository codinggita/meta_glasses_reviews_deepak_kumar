import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Don't show toast for initial auth check if it fails
        if (error.config.url !== '/auth/me') {
          toast.error('Session expired. Please log in again.');
          // We can use a custom event or window location to redirect, 
          // but React Router handles this best in components.
          window.dispatchEvent(new Event('auth-unauthorized'));
        }
      } 
      // Handle other specific errors if needed
      else if (response.status === 403) {
        toast.error('You do not have permission to perform this action.');
      }
      else if (response.data && response.data.message) {
        // We'll let the thunk/component handle specific error messages,
        // but we can log them or show generic toasts if we want
      }
    } else {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
