import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  variant?: "default" | "outline" | "filled";
  size?: "sm" | "md" | "lg";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-white hover:bg-slate-50 text-slate-900 ring-1 ring-inset ring-slate-300 hover:ring-slate-200",
      outline: "ring-2 ring-inset ring-slate-300 hover:ring-slate-200",
      filled: "bg-slate-50 hover:bg-slate-100 text-slate-900",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-5 text-lg",
    };

    return (
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-base ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-sm sm:leading-6",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";