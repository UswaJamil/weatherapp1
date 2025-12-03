import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData, MainWeatherInfo, WeatherState } from '@/constants/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const initialState: WeatherState = {
  current: null,
  loading: false,
  error: null,
  lastCity: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (
    city: string,
    { rejectWithValue }
  ) => {
    if (!API_KEY) {
      return rejectWithValue('API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch weather'
      );
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk<
  any,
  { lat: number; lon: number }
>(
  'weather/fetchByCoords',
  async (
    { lat, lon },
    { rejectWithValue }
  ) => {
    if (!API_KEY) {
      return rejectWithValue('API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        { cache: 'no-store' }
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch weather'
      );
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.current = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.lastCity = action.payload.name;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.current = null;
      })
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.lastCity = action.payload.name;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.current = null;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
