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
        small ? "text-3xl  " : "text-5xl py-1 "
      } font-extrabold rounded-lg text-white bg-transparent hover:opacity-80`}
    >
      {unit === "metric" ? "°C" : "°F"}
    </button>
  );
}
