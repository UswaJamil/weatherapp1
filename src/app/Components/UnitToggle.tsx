"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "@/app/store/unitSlice";
import { RootState } from "@/app/store";

interface UnitToggleProps {
  small?: boolean; // for inline use
}

export default function UnitToggle({ small }: UnitToggleProps) {
  const unit = useSelector((state: RootState) => state.unit.unit);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleUnit())}
      className={`${
        small ? "text-3xl px-2 py-1" : "text-6xl px-4 py-2"
      } font-bold rounded-lg text-white bg-transparent hover:opacity-80`}
    >
      {unit === "metric" ? "°C" : "°F"}
    </button>
  );
}
