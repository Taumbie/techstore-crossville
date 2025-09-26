import type { ComponentChildren } from "preact";

type Props = { children?: ComponentChildren; className?: string };

export default function Card({ children, className = "" }: Props) {
  return (
    <div class={`card p-4 rounded-lg border border-slate-700 ${className}`}>
      {children}
    </div>
  );
}
