// ==========================
// Types
// ==========================
type Props = {
  categories: string[];
  _active?: string | null;
  onSelect: (c: string | null) => void;
};

// ==========================
// Component: CategoryList
// Left sidebar listing categories with a simple 'All' action
// ==========================
export default function CategoryList({ categories, _active, onSelect }: Props) {
  return (
    <aside class="md:col-span-1 bg-slate-800 p-4 rounded">
      <h3 class="text-lg font-semibold mb-3">Categories</h3>
      <ul class="space-y-2 text-sm text-slate-200">
        <li key="all">
          <button
            type="button"
            class="w-full text-left"
            onClick={() => onSelect(null)}
          >
            All
          </button>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <button
              type="button"
              class="w-full text-left hover:underline"
              onClick={() => onSelect(c)}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
