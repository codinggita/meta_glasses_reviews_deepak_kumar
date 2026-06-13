import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import reviewReducer from '../features/reviews/reviewSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    review: reviewReducer,
    analytics: analyticsReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
