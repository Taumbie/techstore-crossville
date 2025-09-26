// Component: CategoryFilters
// Renders category-specific filter options (price ranges) and emits selection
type Props = {
  category: string | null;
  value?: string | null;
  onChange: (v: string | null) => void;
};

const FILTERS: Record<
  string,
  Array<{ key: string; label: string; min?: number; max?: number }>
> = {
  electronics: [
    { key: "all", label: "All" },
    { key: "under-50", label: "Under $50", max: 50 },
    { key: "50-200", label: "$50 - $200", min: 50, max: 200 },
    { key: "over-200", label: "Over $200", min: 200 },
  ],
  jewelery: [
    { key: "all", label: "All" },
    { key: "under-50", label: "Under $50", max: 50 },
    { key: "50-150", label: "$50 - $150", min: 50, max: 150 },
    { key: "over-150", label: "Over $150", min: 150 },
  ],
  "men's clothing": [
    { key: "all", label: "All" },
    { key: "under-25", label: "Under $25", max: 25 },
    { key: "25-75", label: "$25 - $75", min: 25, max: 75 },
    { key: "over-75", label: "Over $75", min: 75 },
  ],
  "women's clothing": [
    { key: "all", label: "All" },
    { key: "under-25", label: "Under $25", max: 25 },
    { key: "25-75", label: "$25 - $75", min: 25, max: 75 },
    { key: "over-75", label: "Over $75", min: 75 },
  ],
};

export default function CategoryFilters({ category, value, onChange }: Props) {
  const key = category ?? "all";
  const opts = FILTERS[key] ?? [
    { key: "all", label: "All" },
    { key: "under-50", label: "Under $50", max: 50 },
    { key: "50-200", label: "$50 - $200", min: 50, max: 200 },
    { key: "over-200", label: "Over $200", min: 200 },
  ];

  return (
    <div class="mb-4 bg-slate-800 p-3 rounded">
      <div class="text-sm text-slate-300 mb-2">
        Filters for {category ?? "All categories"}
      </div>
      <div class="flex gap-2 flex-wrap">
        {opts.map((o) => (
          <button
            type="button"
            key={o.key}
            class={`px-3 py-1 rounded ${
              value === o.key
                ? "bg-sky-500 text-white"
                : "bg-slate-700 text-slate-200"
            }`}
            onClick={() => onChange(o.key === "all" ? null : o.key)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
