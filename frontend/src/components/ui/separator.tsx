import * as React from "react";
import { cn } from "@/lib/utils";

export const Separator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "flex h-0.5 flex-1 bg-slate-200 dark:bg-slate-600",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";