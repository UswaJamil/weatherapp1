"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "@/app/store/unitSlice";
import { RootState } from "@/app/store";

interface UnitToggleProps {
  small?: boolean;
}

export default function UnitToggle({ small }: UnitToggleProps) {
  const unit = useSelector((state: RootState) => state.unit.unit);
  const dispatch = useDispatch();

  const [flipped, setFlipped] = useState(unit === "imperial"); // Local flip for animation

  const sizeClasses = small ? "text-3xl px-4 py-2" : "text-6xl px-6 py-3";

  // Determine peek rotation based on state
  const peekRotation = unit === "metric" ? "hover:rotate-y-20" : "hover:-rotate-y-20";

  const handleClick = () => {
    dispatch(toggleUnit());
    setFlipped(!flipped);
  };

  return (
    <div className={`perspective-1000 inline-block ${sizeClasses}`} onClick={handleClick}>
      <div
        className={`
          relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
          ${flipped ? "rotate-y-180" : "rotate-y-0"} ${peekRotation}
          cursor-pointer
        `}
      >
        {/* Front side: Metric */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center font-bold text-white 
                        bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg
                        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          °C
        </div>

        {/* Back side: Imperial */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center font-bold text-white 
                        bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg
                        rotate-y-180 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          °F
        </div>
      </div>
    </div>
  );
}

