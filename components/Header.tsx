/* ======================================================================
   Header component

   Purpose: reusable top navigation used across layouts.
   Sections below intentionally separate types, helpers (if any), and
   the render component for readability. No behavior changes.
   ====================================================================== */

// --- Types --------------------------------------------------------------
type NavItem = { label: string; href?: string };

type Props = {
  title?: string;
  navItems?: NavItem[];
};

// --- Component ----------------------------------------------------------
import Cart from "../islands/Cart.tsx";
import ThemeToggle from "../islands/ThemeToggle.tsx";

export default function Header({ navItems = [] }: Props) {
  // default navigation when none is provided
  const defaults: NavItem[] = [
    { label: "TechStore", href: "/" },
    { label: "Products", href: "/products" },
  ];

  const list = navItems.length === 0 ? defaults : navItems;

  return (
    <header class="bg-slate-800 border-b border-slate-700">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <a href="/" class="flex items-center gap-3 no-underline">
            <div class="w-8 h-8 bg-sky-500 rounded flex items-center justify-center font-bold text-white">
              {/* cart icon (inline svg) */}
              <svg
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="10" cy="19" r="1" fill="currentColor" />
                <circle cx="18" cy="19" r="1" fill="currentColor" />
              </svg>
            </div>
            <span class="text-lg font-semibold text-slate-100">TechStore</span>
          </a>

          <nav class="hidden md:flex gap-4 text-slate-300">
            {list.map((n) => (
              <a
                key={n.label}
                class="px-3 py-1 rounded hover:bg-slate-700 text-slate-200"
                href={n.href ?? "#"}
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right-side utilities */}
        <div class="flex items-center gap-3">
          {/* Theme toggle */}
          <ThemeToggle />
          {/* Cart island (client-side) */}
          <Cart />
          <img src="/logo.svg" alt="logo" class="w-8 h-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}
