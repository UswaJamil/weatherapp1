import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ForecastListItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

interface ForecastState {
  data: {
    list: ForecastListItem[];
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchForecast = createAsyncThunk(
  'forecast/fetch5Day',
  async (
    { city, apiKey }: { city: string; apiKey: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`,
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
      });
  },
});

export const { clearForecast } = forecastSlice.actions;
export default forecastSlice.reducer;
