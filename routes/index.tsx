// ==========================
// Imports
// ==========================
import { define } from "../utils.ts";
import StackedLayout from "../components/StackedLayout.tsx";
import Featured from "../islands/Featured.tsx";

export default define.page(function Home() {
  return (
    <StackedLayout overview="Discover the latest tech at TechStore">
      <section class="max-w-7xl mx-auto py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl font-bold mb-4">
              TechStore — Modern Devices for Makers
            </h1>
            <p class="text-slate-300 mb-6">
              Explore curated electronics, accessories and tools for your
              projects. Fast shipping and friendly support.
            </p>
            <div class="flex gap-3">
              <a
                href="/products"
                class="px-4 py-2 rounded bg-sky-500 text-white"
              >
                Browse Products
              </a>
              <a
                href="/products"
                class="px-4 py-2 rounded bg-slate-700 text-slate-100"
              >
                Featured
              </a>
            </div>
          </div>

          <div>
            <Featured />
          </div>
        </div>
      </section>
    </StackedLayout>
  );
});
