import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Toast = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, children, open, onOpenChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-2 max-w-[350px] w-full bg-slate-900 border border-slate-700 text-slate-100 p-4 rounded-lg shadow-xl",
      className
    )}
    role="alert"
    {...props}
  >
    {children}
  </div>
));
Toast.displayName = "Toast";

export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ToastViewport = React.forwardRef<
  HTMLDivElement,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-2 max-w-[350px] w-full",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export interface ToastActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  ToastActionProps
>(({ className, children, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "h-9 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200",
      className
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
));
ToastAction.displayName = "ToastAction";

export interface ToastDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
}

export const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  ToastDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-slate-300 [&_a]:underline [&_a]:underline-offset-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </p>
));
ToastDescription.displayName = "ToastDescription";

export interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children?: React.ReactNode;
}

export const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  ToastTitleProps
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-sm font-semibold text-white",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
ToastTitle.displayName = "ToastTitle";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => (
  <div>
    <ToastViewport />
    {children}
  </div>
);
ToastProvider.displayName = "ToastProvider";