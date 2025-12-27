import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";

const initial = 80;

export default function Range() {
  const [value, setValue] = useState(initial);

  const getColorClass = (value: number) => {
    if (value <= 79) return "text-slate-400";
    if (value <= 88) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="w-full space-y-10">
      <h4
        className={`text-center text-4xl font-semibold transition-colors duration-300 ${getColorClass(value)}`}
      >
        {value <= initial - 1 ? "Service" : `${value}%`}
      </h4>

      <div className="px-3">
        <Slider
          min={0}
          max={100}
          defaultValue={[value]}
          onValueChange={(newValue) => setValue(newValue[0])}
        />
      </div>
    </div>
  );
}
