import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchWeatherByCoords as fetchWeatherCoordsThunk } from '@/store/slices/weatherSlice';
import { fetchForecast, fetchForecastByCoords as fetchForecastCoordsThunk } from '@/store/slices/forecastSlice';
import { RootState, AppDispatch } from '@/constants/types';

/**
 * Hook to fetch and manage current weather data
 * Returns weather state and fetch function
 */
export const useWeatherData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather.current);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const fetchWeatherByCity = useCallback(
    (city: string) => {
      dispatch(fetchWeather(city));
    },
    [dispatch]
  );

  const fetchWeatherByCoords = useCallback(
    (lat: number, lon: number) => {
      dispatch(fetchWeatherCoordsThunk({ lat, lon }));
    },
    [dispatch]
  );

  return {
    weather,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  };
};

/**
 * Hook to fetch and manage 5-day forecast data
 * Returns forecast state and fetch function
 */
export const useForecastData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const forecast = useSelector((state: RootState) => state.forecast.data);
  const loading = useSelector((state: RootState) => state.forecast.loading);
  const error = useSelector((state: RootState) => state.forecast.error);

  const fetchForecastByCity = useCallback(
    (city: string) => {
      dispatch(fetchForecast(city));
    },
    [dispatch]
  );

  const fetchForecastByCoords = useCallback(
    (lat: number, lon: number) => {
      dispatch(fetchForecastCoordsThunk({ lat, lon }));
    },
    [dispatch]
  );

  return {
    forecast,
    loading,
    error,
    fetchForecastByCity,
    fetchForecastByCoords,
  };
};

/**
 * Combined hook to fetch both weather and forecast data
 * Returns both datasets and loading state
 */
export const useWeatherAndForecast = (city: string, lat?: number, lon?: number) => {
  const {
    weather,
    loading: weatherLoading,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  } = useWeatherData();
  const {
    forecast,
    loading: forecastLoading,
    fetchForecastByCity,
    fetchForecastByCoords,
  } = useForecastData();

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      // Use coordinates for more accurate results
      fetchWeatherByCoords(lat, lon);
      fetchForecastByCoords(lat, lon);
    } else if (city) {
      // Fallback to city name
      fetchWeatherByCity(city);
      fetchForecastByCity(city);
    }
  }, [city, lat, lon, fetchWeatherByCity, fetchWeatherByCoords, fetchForecastByCity, fetchForecastByCoords]);

  return {
    weather,
    forecast,
    loading: weatherLoading || forecastLoading,
  };
};
