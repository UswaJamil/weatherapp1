// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import unitReducer from './slices/unitSlice';
import weatherReducer from './slices/weatherSlice';
import forecastReducer from './slices/forecastSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    unit: unitReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
