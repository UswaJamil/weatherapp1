import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '@/store/slices/unitSlice';
import { RootState, AppDispatch } from '@/store';

/**
 * Hook to manage temperature unit toggle (metric/imperial)
 * Returns current unit and toggle function
 */
export const useUnitToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const unit = useSelector((state: RootState) => state.unit.unit);

  const toggle = useCallback(() => {
    dispatch(toggleUnit());
  }, [dispatch]);

  const convertTemperature = useCallback(
    (temp: number): number => {
      return unit === 'metric'
        ? Math.round(temp)
        : Math.round((temp * 9) / 5 + 32);
    },
    [unit]
  );

  const getSymbol = useCallback((): string => {
    return unit === 'metric' ? '°C' : '°F';
  }, [unit]);

  return {
    unit,
    toggle,
    convertTemperature,
    getSymbol,
  };
};
