// ==========================
// Types
// ==========================
import Card from "./Card.tsx";
import { Button } from "./Button.tsx";

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
    <aside class="md:col-span-1">
      <Card className="bg-slate-800 p-4">
        <h3 class="text-lg font-semibold mb-3">Categories</h3>
        <ul class="space-y-2 text-sm text-slate-200" style="min-height: 220px;">
          <li key="all">
            <Button
              variant="ghost"
              className="w-full text-left"
              onClick={() => onSelect(null)}
            >
              All
            </Button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <Button
                variant="ghost"
                className="w-full text-left font-medium text-base"
                onClick={() => onSelect(c)}
              >
                {c}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}
