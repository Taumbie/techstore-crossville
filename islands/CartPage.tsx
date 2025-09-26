import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  image?: string;
};

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("techstore_cart");
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    function onAdd(e: Event) {
      const ev = e as CustomEvent<CartItem>;
      const it = ev.detail;
      setItems((cur) => {
        const found = cur.find((c) => c.id === it.id);
        let next: CartItem[];
        if (found) {
          next = cur.map((c) => c.id === it.id ? { ...c, qty: c.qty + 1 } : c);
        } else {
          next = [...cur, { ...it, qty: 1 }];
        }
        try {
          localStorage.setItem("techstore_cart", JSON.stringify(next));
        } catch (_e) { /* ignore storage errors */ }
        return next;
      });
    }
    globalThis.addEventListener(
      "techstore:add-to-cart",
      onAdd as EventListener,
    );
    return () =>
      globalThis.removeEventListener(
        "techstore:add-to-cart",
        onAdd as EventListener,
      );
  }, []);

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div>
      {items.length === 0
        ? <div class="text-slate-500">Your cart is empty.</div>
        : (
          <div class="space-y-4">
            {items.map((it) => (
              <div key={it.id} class="flex items-center gap-4">
                <img src={it.image} class="w-20 h-20 object-contain" />
                <div class="flex-1">
                  <div class="font-medium">{it.title}</div>
                  <div class="text-sm text-slate-500">
                    {it.qty} x <span class="product-price">${it.price}</span>
                  </div>
                </div>
                <div>
                  <Button
                    variant="danger"
                    className="text-sm"
                    onClick={() => {
                      const next = items.filter((x) => x.id !== it.id);
                      setItems(next);
                      try {
                        localStorage.setItem(
                          "techstore_cart",
                          JSON.stringify(next),
                        );
                      } catch (_e) { /* ignore */ }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div class="mt-4 font-semibold">
              Total: <span class="product-price">${total.toFixed(2)}</span>
            </div>
            <div class="flex gap-2 mt-2">
              <Button
                variant="danger"
                onClick={() => {
                  setItems([]);
                  try {
                    localStorage.setItem("techstore_cart", JSON.stringify([]));
                  } catch (_e) { /* ignore */ }
                }}
              >
                Clear cart
              </Button>
            </div>
          </div>
        )}
    </div>
  );
}
