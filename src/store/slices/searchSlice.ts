import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SearchResult, SearchState } from '@/constants/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  query: '',
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (
    query: string,
    { rejectWithValue }
  ) => {
    if (!query.trim()) {
      return [];
    }

    if (!API_KEY) {
      return rejectWithValue('API key not configured');
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=8&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Search API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Ensure data is an array
      if (!Array.isArray(data)) {
        return [];
      }

      return data.map((item: Record<string, unknown>) => ({
        name: String(item.name),
        state: (item.state as string) || undefined,
        country: String(item.country),
        lat: Number(item.lat),
        lon: Number(item.lon),
      }));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch search results'
      );
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.results = [];
      state.query = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.results = [];
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
