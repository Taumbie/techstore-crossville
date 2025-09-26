// ==========================
// Imports
// ==========================
import type { ComponentChildren } from "preact";

export interface ButtonProps {
  id?: string;
  onClick?: (e?: Event) => void;
  children?: ComponentChildren;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "muted" | "danger" | "ghost";
  type?: "button" | "submit" | "reset";
}

export function Button({
  id,
  onClick,
  children,
  disabled,
  className = "",
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 justify-center rounded transition";
  const variants: Record<string, string> = {
    primary: "px-3 py-2 bg-sky-500 text-white hover:bg-sky-400",
    muted: "px-3 py-2 bg-slate-700 text-slate-100 hover:bg-slate-600",
    danger: "px-2 py-1 bg-red-600 text-white hover:bg-red-500",
    ghost: "px-2 py-1 bg-transparent text-slate-200 hover:bg-slate-700",
  };

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      class={cls}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
}
