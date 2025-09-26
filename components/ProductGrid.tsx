// ==========================
// Imports
// ==========================
import type { Product } from "./types.ts";
import ProductCard from "./ProductCard.tsx";

// ==========================
// Types
// ==========================
type Props = { products: Product[] };

// ==========================
// Component: ProductGrid
// Renders a responsive grid of product cards
// ==========================
export default function ProductGrid({ products }: Props) {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
