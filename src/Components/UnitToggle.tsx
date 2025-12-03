'use client';

import { useUnitToggle } from '@/hooks/useUnit';
import { UnitToggleProps } from '@/constants/types';
import { COLORS } from '@/constants/colors';

export default function UnitToggle({ small }: UnitToggleProps) {
  const { unit, toggle, getSymbol } = useUnitToggle();

  return (
    <button
      onClick={toggle}
      className={`${
        small ? 'text-3xl  ' : 'text-5xl py-1 '
      } font-extrabold rounded-lg bg-transparent hover:opacity-80`}
      style={{ color: COLORS.textPrimary }}
    >
      {getSymbol()}
    </button>
  );
}
