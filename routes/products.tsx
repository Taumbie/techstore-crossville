// ==========================
// Imports
// ==========================
import { define } from "../utils.ts";
import ProductBrowser from "../islands/ProductBrowser.tsx";

// ==========================
// Page: Products
// Renders the ProductBrowser island inside a simple container
// ==========================
export default define.page(function Products() {
  return (
    <div class="min-h-screen bg-slate-900 text-slate-100 py-8 px-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-semibold mb-6">Productos</h1>
        <ProductBrowser />
      </div>
    </div>
  );
});
