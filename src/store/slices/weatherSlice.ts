import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherState {
  current: {
    name: string;
    main: MainWeatherInfo;
    weather: WeatherData[];
    wind: { speed: number };
    clouds: { all: number };
  } | null;
  loading: boolean;
  error: string | null;
  lastCity: string | null;
}

const initialState: WeatherState = {
  current: null,
  loading: false,
  error: null,
  lastCity: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (
    { city, apiKey }: { city: string; apiKey: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
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
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
