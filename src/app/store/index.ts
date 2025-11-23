// src/app/store/index.ts
import { configureStore } from "@reduxjs/toolkit"; // <-- Add this import
import unitReducer from "./unitSlice";

export const store = configureStore({
  reducer: {
    unit: unitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
