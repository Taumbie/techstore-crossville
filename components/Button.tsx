// ==========================
// Imports
// ==========================
import type { ComponentChildren } from "preact";

// ==========================
// Types
// ==========================
export interface ButtonProps {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  disabled?: boolean;
}

// ==========================
// Component: Button
// Simple styled button wrapper used across the UI
// ==========================
export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class="px-2 py-1 border-gray-500 border-2 rounded-sm bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
