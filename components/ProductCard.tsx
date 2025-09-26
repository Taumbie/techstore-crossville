// ==========================
// Imports
// ==========================
import type { Product } from "./types.ts";
import { Button } from "./Button.tsx";

// ==========================
// Types
// ==========================
type Props = { product: Product };

// ==========================
// Component: ProductCard
// Small product preview used in the product grid
// ==========================
export default function ProductCard({ product }: Props) {
  function addToCart() {
    const detail = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    };
    const ev = new CustomEvent("techstore:add-to-cart", { detail });
    globalThis.dispatchEvent(ev);
  }

  return (
    <div class="block no-underline">
      <div class="card bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded shadow p-4 flex flex-col hover:shadow-lg transition-transform duration-200">
        <a href={`/products/${product.id}`} class="no-underline">
          <img
            src={product.image}
            alt={product.title}
            class="h-40 object-contain mb-3 mx-auto"
          />
        </a>
        <h4 class="font-medium text-sm mb-1">{product.title}</h4>
        <p class="text-xs text-slate-500 flex-1">
          {product.description.slice(0, 80)}...
        </p>
        <div class="mt-3 flex items-center justify-between">
          <span class="font-semibold product-price">${product.price}</span>
          <Button variant="primary" onClick={addToCart}>Add</Button>
        </div>
      </div>
    </div>
  );
}
