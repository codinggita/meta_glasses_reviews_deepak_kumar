import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Fetch average rating
export const fetchAverageRating = createAsyncThunk(
  'analytics/fetchAverageRating',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/average-rating');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch average rating');
    }
  }
);

// Fetch sentiment analysis
export const fetchSentiment = createAsyncThunk(
  'analytics/fetchSentiment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/sentiment');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sentiment analysis');
    }
  }
);

// Fetch rating distribution
export const fetchRatingDistribution = createAsyncThunk(
  'analytics/fetchRatingDist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/rating-distribution');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch rating distribution');
    }
  }
);

// Fetch monthly average
export const fetchMonthlyAverage = createAsyncThunk(
  'analytics/fetchMonthlyAverage',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/monthly-average');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch monthly average');
    }
  }
);

// Fetch country stats
export const fetchCountryStats = createAsyncThunk(
  'analytics/fetchCountryStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/country');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch country stats');
    }
  }
);

const initialState = {
  averageRating: null,
  sentiment: null,
  ratingDistribution: null,
  monthlyAverage: null,
  countryStats: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Average Rating
      .addCase(fetchAverageRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAverageRating.fulfilled, (state, action) => {
        state.loading = false;
        state.averageRating = action.payload;
      })
      .addCase(fetchAverageRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sentiment
      .addCase(fetchSentiment.fulfilled, (state, action) => {
        state.sentiment = action.payload;
      })
      // Rating Distribution
      .addCase(fetchRatingDistribution.fulfilled, (state, action) => {
        state.ratingDistribution = action.payload;
      })
      // Monthly Average
      .addCase(fetchMonthlyAverage.fulfilled, (state, action) => {
        state.monthlyAverage = action.payload;
      })
      // Country Stats
      .addCase(fetchCountryStats.fulfilled, (state, action) => {
        state.countryStats = action.payload;
      });
  },
});

export default analyticsSlice.reducer;
