/* ======================================================================
   StackedLayout

   Sections:
   - Imports
   - Types
   - Hooks / Helpers
   - Render
   No logic changes; only added section comments and minimal reordering
   for readability.
   ====================================================================== */

// --- Imports ------------------------------------------------------------
import { useState } from "preact/hooks";
import { ComponentChildren } from "preact";

// --- Types --------------------------------------------------------------
interface Props {
  children: ComponentChildren;
  overview?: string;
  code?: string;
}

// --- Component ----------------------------------------------------------
export default function StackedLayout({ children, overview, code }: Props) {
  // reserved for future copy interactions
  const _ = useState(false);

  // summary text
  const summary = overview ??
    `TechStore is a Deno + Fresh e-commerce starter focused on SSR, Islands
architecture, security and performance. Use this dashboard to monitor
catalog, orders and admin tasks.`;

  // small visual helper used in render
  const patternPanel = (
    <div class="rounded-lg border border-slate-700 overflow-hidden panel-pattern h-64 w-full">
    </div>
  );

  // --- Render -----------------------------------------------------------
  return (
    <div class="min-h-screen bg-slate-900 text-slate-100">
      <main class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-semibold mb-4">Dashboard</h1>

        <div class="bg-slate-800 rounded-lg border border-slate-700 p-4">
          <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="rounded-md overflow-hidden">{patternPanel}</div>
            {code && (
              <div class="rounded-lg overflow-hidden bg-slate-900 border border-slate-700 p-3 text-slate-200">
                <h4 class="font-medium mb-2">Tailwind example</h4>
                <pre class="text-xs overflow-auto whitespace-pre-wrap">{code}</pre>
              </div>
            )}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section class="md:col-span-2 bg-slate-900 p-6 rounded-lg border border-slate-700">
              {children}
            </section>

            <aside class="space-y-4">
              <div class="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 class="text-lg font-semibold">Overview</h3>
                <p class="mt-2 text-slate-300 text-sm whitespace-pre-line">
                  {summary}
                </p>
              </div>

              <div class="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h4 class="font-medium">Quick actions</h4>
                <div class="mt-3 flex flex-col gap-2">
                  <button
                    type="button"
                    class="text-left px-3 py-2 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    class="text-left px-3 py-2 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    View Orders
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
