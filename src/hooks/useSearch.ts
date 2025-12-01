import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSearchResults,
  setQuery,
  clearSearch,
  SearchResult,
} from '@/store/slices/searchSlice';
import { RootState, AppDispatch } from '@/store';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

/**
 * Hook to manage location search functionality
 * Returns search results, loading state, and search functions
 */
export const useLocationSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.search.results);
  const loading = useSelector((state: RootState) => state.search.loading);
  const error = useSelector((state: RootState) => state.search.error);
  const query = useSelector((state: RootState) => state.search.query);

  const search = useCallback(
    (searchQuery: string) => {
      dispatch(setQuery(searchQuery));
      if (API_KEY) {
        dispatch(fetchSearchResults({ query: searchQuery, apiKey: API_KEY }));
      }
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  return {
    results,
    loading,
    error,
    query,
    search,
    clear,
  };
};

/**
 * Hook to select a location and format it
 */
export const useLocationSelect = () => {
  const selectLocation = useCallback((location: SearchResult): string => {
    const parts = [location.name];
    if (location.state) {
      parts.push(location.state);
    }
    parts.push(location.country);
    return parts.join(', ');
  }, []);

  return { selectLocation };
};
