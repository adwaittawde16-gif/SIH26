import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({
    className,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    onValueCommit,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onValueChange?.(Number(val));
    };
    const handleCommit = (e: React.MouseEvent<HTMLInputElement>) => {
      const val = (e.currentTarget as HTMLInputElement).value;
      onValueCommit?.(Number(val));
    };

    return (
      <input
        ref={ref}
        type="range"
        className={cn(
          "h-1.5 w-full bg-slate-200 rounded-full cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onMouseUp={handleCommit}
      />
    );
  }
);
Slider.displayName = "Slider";