import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { fetchForecast } from '@/store/slices/forecastSlice';
import { RootState, AppDispatch } from '@/store';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

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
      if (API_KEY) {
        dispatch(fetchWeather({ city, apiKey: API_KEY }));
      }
    },
    [dispatch]
  );

  return {
    weather,
    loading,
    error,
    fetchWeatherByCity,
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
      if (API_KEY) {
        dispatch(fetchForecast({ city, apiKey: API_KEY }));
      }
    },
    [dispatch]
  );

  return {
    forecast,
    loading,
    error,
    fetchForecastByCity,
  };
};

/**
 * Combined hook to fetch both weather and forecast data
 * Returns both datasets and loading state
 */
export const useWeatherAndForecast = (city: string) => {
  const {
    weather,
    loading: weatherLoading,
    fetchWeatherByCity,
  } = useWeatherData();
  const {
    forecast,
    loading: forecastLoading,
    fetchForecastByCity,
  } = useForecastData();

  useEffect(() => {
    if (city) {
      fetchWeatherByCity(city);
      fetchForecastByCity(city);
    }
  }, [city, fetchWeatherByCity, fetchForecastByCity]);

  return {
    weather,
    forecast,
    loading: weatherLoading || forecastLoading,
  };
};
