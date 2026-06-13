import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch all users (Admin only)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// Delete user (Admin only)
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

// Update user role (Admin only)
export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/${id}`, { role });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role');
    }
  }
);

// Update profile (User)
export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/users/me', userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// Fetch saved reviews (User)
export const fetchSavedReviews = createAsyncThunk(
  'users/fetchSavedReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me/saved');
      return response.data.data; // Array of reviews
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch saved reviews');
    }
  }
);

// Save review (User)
export const saveReview = createAsyncThunk(
  'users/saveReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.post('/users/me/saved', { reviewId });
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save review');
    }
  }
);

// Remove saved review (User)
export const removeSavedReview = createAsyncThunk(
  'users/removeSavedReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await api.delete(`/users/me/saved/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove saved review');
    }
  }
);

const initialState = {
  users: [],
  savedReviews: [],
  pagination: {
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersPage: (state, action) => {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        if (action.payload.pagination) {
          state.pagination = { ...state.pagination, ...action.payload.pagination };
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      // Update User Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Fetch Saved Reviews
      .addCase(fetchSavedReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.savedReviews = action.payload;
      })
      .addCase(fetchSavedReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save Review
      .addCase(saveReview.fulfilled, (state, action) => {
        // We might not have the full review object to push, but usually we refetch or update UI optimistically
      })
      // Remove Saved Review
      .addCase(removeSavedReview.fulfilled, (state, action) => {
        state.savedReviews = state.savedReviews.filter(review => review._id !== action.payload);
      });
  },
});

export const { setUsersPage } = userSlice.actions;
export default userSlice.reducer;
