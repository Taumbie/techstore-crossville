// ==========================
// Imports
// ==========================
import { Handlers } from "https://deno.land/x/fresh@1.1.6/server.ts";
import { define } from "../../utils.ts";
import StackedLayout from "../../components/StackedLayout.tsx";

// ==========================
// Types
// ==========================
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// ==========================
// Handlers
// Fetches a single product from the local API proxy and renders the page
// ==========================
export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    try {
      // Fetch directly from the public fakestore API for SSR. This avoids
      // requiring a local proxy to be running on another port.
      const res = await fetch(
        `https://fakestoreapi.com/products/${encodeURIComponent(id)}`,
      );
      if (!res.ok) {
        // render a fallback page with an empty product to avoid throwing
        return ctx.render({ product: null });
      }
      const product: Product = await res.json();
      return ctx.render({ product });
    } catch (err) {
      console.error("Failed to fetch product for id", id, err);
      return ctx.render({ product: null });
    }
  },
};

// ==========================
// Page
// ==========================
type PageData = { product: Product };

export default define.page(function ProductPage({ data }: { data: PageData }) {
  const product: Product = data.product;

  return (
    <StackedLayout overview={product.title}>
      <div class="max-w-4xl mx-auto bg-slate-900 p-6 rounded">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src={product.image}
            alt={product.title}
            class="w-full h-64 object-contain rounded"
          />
          <div class="md:col-span-2">
            <h1 class="text-2xl font-bold mb-2">{product.title}</h1>
            <p class="text-slate-300 mb-4">{product.description}</p>
            <div class="flex items-center gap-4">
              <span class="text-xl font-semibold">${product.price}</span>
              <a href="/products" class="px-3 py-2 bg-slate-700 rounded">
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </StackedLayout>
  );
});
