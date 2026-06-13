import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/reviews', { params });
      return response.data; // Expected: { data: [...], pagination: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  'reviews/fetchReviewById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/reviews/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch review');
    }
  }
);

export const toggleLikeReview = createAsyncThunk(
  'reviews/toggleLikeReview',
  async ({ id, action }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/reviews/${id}/like`, { action });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle like');
    }
  }
);

const initialState = {
  items: [],
  pagination: {
    page: 1,
    limit: 9,
    totalCount: 0,
    totalPages: 0,
  },
  currentReview: null,
  filters: {
    search: '',
    rating: '',
    sentiment: '',
    country: '',
    verifiedPurchase: '',
  },
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to page 1 on filter change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.pagination && action.payload.pagination.page > 1) {
          // Append items, filtering out potential duplicates
          const newItems = action.payload.data.filter(
            newItem => !state.items.find(item => item._id === newItem._id && newItem._id !== undefined)
          );
          state.items = [...state.items, ...newItems];
        } else {
          // Replace items on page 1
          state.items = action.payload.data;
        }
        
        if (action.payload.pagination) {
          state.pagination = { ...state.pagination, ...action.payload.pagination };
        }
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Review
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload.data;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Like Review
      .addCase(toggleLikeReview.fulfilled, (state, action) => {
        const updatedReview = action.payload.data;
        const index = state.items.findIndex(item => item._id === updatedReview._id);
        if (index !== -1) {
          state.items[index] = updatedReview;
        }
        if (state.currentReview?._id === updatedReview._id) {
          state.currentReview = updatedReview;
        }
      });
  },
});

export const { setFilters, setPage, clearFilters } = reviewSlice.actions;
export default reviewSlice.reducer;
