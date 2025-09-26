// ==========================
// Imports
// ==========================
import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import type { Product } from "../components/types.ts";
import CategoryList from "../components/CategoryList.tsx";
import FiltersBar from "../components/FiltersBar.tsx";
import CategoryFilters from "../components/CategoryFilters.tsx";
import ProductGrid from "../components/ProductGrid.tsx";
import Card from "../components/Card.tsx";

// ==========================
// Component: ProductBrowser
// Interactive island that fetches categories and products and renders
// the sidebar + filters + product grid. Uses local API proxy at /api/products
// ==========================
export default function ProductBrowser() {
  // --------------------------
  // State
  // --------------------------
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // signals for UI inputs
  const category = useSignal<string | null>(null);
  const q = useSignal("");

  // --------------------------
  // Effects (initial load)
  // --------------------------
  useEffect(() => {
    fetchCategories();
    loadProducts();
  }, []);

  // --------------------------
  // Fetch helpers
  // --------------------------
  async function fetchCategories() {
    try {
      const res = await fetch("/api/products?meta=categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories([]);
    }
  }

  async function loadProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (category.value) params.set("category", category.value);
    if (q.value) params.set("q", q.value);
    params.set("limit", "24");
    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  // --------------------------
  // Handlers
  // --------------------------
  function handleCategorySelect(c: string | null) {
    category.value = c;
    loadProducts();
  }

  function handleQueryChange(v: string) {
    q.value = v;
  }

  // --------------------------
  // Render
  // --------------------------
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // apply client-side category-specific filter
  const filteredProducts = products.filter((p) => {
    if (!categoryFilter) return true;
    // map filter keys to ranges defined in CategoryFilters
    if (categoryFilter === "under-50") return p.price < 50;
    if (categoryFilter === "50-200") return p.price >= 50 && p.price <= 200;
    if (categoryFilter === "over-200") return p.price > 200;
    if (categoryFilter === "under-25") return p.price < 25;
    if (categoryFilter === "25-75") return p.price >= 25 && p.price <= 75;
    if (categoryFilter === "over-75") return p.price > 75;
    if (categoryFilter === "50-150") return p.price >= 50 && p.price <= 150;
    if (categoryFilter === "over-150") return p.price > 150;
    return true;
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="hidden md:block">
        <CategoryList categories={categories} onSelect={handleCategorySelect} />
      </Card>

      <section class="md:col-span-3 space-y-4">
        <Card>
          <CategoryFilters
            category={category.value}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
          <FiltersBar
            query={q.value}
            onQueryChange={handleQueryChange}
            onApply={loadProducts}
          />
        </Card>

        <Card>
          {loading
            ? <div class="text-sm text-slate-300">Loading...</div>
            : <ProductGrid products={filteredProducts} />}
        </Card>
      </section>
    </div>
  );
}
