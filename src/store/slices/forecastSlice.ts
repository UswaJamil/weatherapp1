import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ForecastListItem, ForecastState } from '@/constants/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const initialState: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  'forecast/fetch5Day',
  async (
    city: string,
    { rejectWithValue }
  ) => {
    if (!API_KEY) {
      return rejectWithValue('API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch forecast'
      );
    }
  }
);

export const fetchForecastByCoords = createAsyncThunk<
  any,
  { lat: number; lon: number }
>(
  'forecast/fetchByCoords',
  async (
    { lat, lon },
    { rejectWithValue }
  ) => {
    if (!API_KEY) {
      return rejectWithValue('API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch forecast'
      );
    }
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    clearForecast: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      })
      .addCase(fetchForecastByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchForecastByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

export const { clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;
