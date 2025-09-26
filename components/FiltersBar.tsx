// ==========================
// Types
// ==========================
type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  onApply: () => void;
};

// ==========================
// Component: FiltersBar
// Simple search bar and action button used above the product grid
// ==========================
export default function FiltersBar({ query, onQueryChange, onApply }: Props) {
  return (
    <div class="mb-4 flex items-center gap-3">
      <input
        class="flex-1 px-3 py-2 rounded bg-slate-700 text-slate-100"
        placeholder="Search products..."
        value={query}
        onInput={(e: InputEvent) => {
          const t = e.target as HTMLInputElement;
          onQueryChange(t.value);
        }}
      />
      <button
        type="button"
        class="px-3 py-2 bg-sky-500 text-white rounded"
        onClick={onApply}
      >
        Search
      </button>
    </div>
  );
}
