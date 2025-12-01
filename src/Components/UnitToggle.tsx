'use client';

import { useUnitToggle } from '@/hooks/useUnit';

interface UnitToggleProps {
  small?: boolean; // for inline use
}

export default function UnitToggle({ small }: UnitToggleProps) {
  const { unit, toggle, getSymbol } = useUnitToggle();

  return (
    <button
      onClick={toggle}
      className={`${
        small ? 'text-3xl  ' : 'text-5xl py-1 '
      } font-extrabold rounded-lg text-white bg-transparent hover:opacity-80`}
    >
      {getSymbol()}
    </button>
  );
}
