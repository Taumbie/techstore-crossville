import { useEffect, useState } from "preact/hooks";

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

function writeCart(items: CartItem[]) {
  try {
    localStorage.setItem("techstore_cart", JSON.stringify(items));
  } catch (_e) { /* ignore storage errors */ }
}

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
    function handler(e: Event) {
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
        writeCart(next);
        return next;
      });
    }
    globalThis.addEventListener(
      "techstore:add-to-cart",
      handler as EventListener,
    );
    return () =>
      globalThis.removeEventListener(
        "techstore:add-to-cart",
        handler as EventListener,
      );
  }, []);

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);
  const count = items.reduce((s, it) => s + (it.qty || 0), 0);

  return (
    <div class="relative">
      <button
        type="button"
        class="px-3 py-1 rounded bg-slate-700 text-slate-100"
        onClick={() => setOpen((o) => !o)}
      >
        Cart ({count})
      </button>

      {open && (
        <div class="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 p-3 rounded shadow-lg z-50">
          <h4 class="font-semibold mb-2">Cart</h4>
          {items.length === 0
            ? <div class="text-sm text-slate-400">Empty</div>
            : (
              <div class="space-y-2">
                {items.map((it) => (
                  <div key={it.id} class="flex items-center gap-2">
                    <img
                      src={it.image}
                      class="w-10 h-10 object-contain rounded"
                    />
                    <div class="flex-1 text-sm">
                      <div class="font-medium">{it.title}</div>
                      <div class="text-slate-400 text-xs">
                        {it.qty} x ${it.price}
                      </div>
                    </div>
                  </div>
                ))}
                <div class="mt-2 font-semibold">Total: ${total.toFixed(2)}</div>
                <div class="mt-2">
                  <a
                    href="/checkout"
                    class="px-3 py-2 bg-sky-500 text-white rounded"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
