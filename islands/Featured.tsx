import { useEffect, useState } from "preact/hooks";
import type { Product } from "../components/types.ts";
import ProductCard from "../components/ProductCard.tsx";

export default function Featured() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=3");
        const data: Product[] = await res.json();
        if (mounted) setItems(data);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div class="text-slate-300">Loading featured...</div>;

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
