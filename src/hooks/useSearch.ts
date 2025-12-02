import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSearchResults,
  setQuery,
  clearSearch,
  SearchResult,
} from '@/store/slices/searchSlice';
import { RootState, AppDispatch } from '@/store';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const useLocationSearch = (debounceTime = 400) => {
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.search.results);
  const loading = useSelector((state: RootState) => state.search.loading);
  const error = useSelector((state: RootState) => state.search.error);
  const query = useSelector((state: RootState) => state.search.query);

  const [localQuery, setLocalQuery] = useState(query);

  // Set query in redux with debounce
  useEffect(() => {
    if (localQuery.trim().length === 0) return;

    const timeout = setTimeout(() => {
      dispatch(setQuery(localQuery));
      if (API_KEY) {
        dispatch(fetchSearchResults({ query: localQuery, apiKey: API_KEY }));
      }
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [localQuery, dispatch, debounceTime]);

  const search = useCallback((searchQuery: string) => {
    setLocalQuery(searchQuery);
  }, []);

  const clear = useCallback(() => {
    setLocalQuery('');
    dispatch(clearSearch());
  }, [dispatch]);

  return {
    results,
    loading,
    error,
    query: localQuery,
    search,
    clear,
  };
};

export const useLocationSelect = () => {
  const selectLocation = useCallback((location: SearchResult): string => {
    const parts = [location.name];
    if (location.state) parts.push(location.state);
    parts.push(location.country);
    return parts.join(', ');
  }, []);

  return { selectLocation };
};
