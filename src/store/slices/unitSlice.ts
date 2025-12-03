import { createSlice } from '@reduxjs/toolkit';
import { UnitState } from '@/constants/types';

const initialState: UnitState = {
  unit: 'metric',
};

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
});

export const { toggleUnit } = unitSlice.actions;
export default unitSlice.reducer;
