/**
 * Centralized TypeScript type definitions for the weather app
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface SearchResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface ForecastListItem {
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

// ============================================================================
// Store/Redux Types
// ============================================================================

export interface WeatherState {
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

export interface ForecastState {
  data: {
    list: ForecastListItem[];
  } | null;
  loading: boolean;
  error: string | null;
}

export interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
}

export interface UnitState {
  unit: 'metric' | 'imperial';
}

// ============================================================================
// Component Prop Types
// ============================================================================

export interface SearchInputProps {
  placeholder?: string;
}

export interface UnitToggleProps {
  small?: boolean; // for inline use
}

// ============================================================================
// Slice Component Prop Types
// ============================================================================

export type WeatherOverviewProps = unknown; // use specific Prismic types if available
export type WeatherForecastProps = unknown;
export type WeatherFactsProps = unknown;
export type HeroSearchProps = unknown;

// ============================================================================
// Utility Types
// ============================================================================

export type ColorKey = keyof typeof COLORS;

// Re-export COLORS for convenience (though it should be imported from constants)
import { COLORS } from './colors';
export { COLORS };

// ============================================================================
// Redux Store Types
// ============================================================================

import type { RootState as StoreRootState, AppDispatch as StoreAppDispatch } from '@/store';
export type RootState = StoreRootState;
export type AppDispatch = StoreAppDispatch;
