import type { Handlers } from "https://deno.land/x/fresh@1.1.6/server.ts";

const BASE = "https://fakestoreapi.com";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

// Simple local store kept in-memory only (no disk persistence).
const LOCAL_STORE: Product[] = [];
let NEXT_ID = 1000;

// No filesystem helpers; LOCAL_STORE starts empty and is ephemeral.

// Robust helper to read raw text from various request-like objects.
// Some runtimes pass wrapper objects or a .body stream instead of a Request
async function readRequestText(obj: unknown): Promise<string> {
  try {
    const candidate = obj as unknown;
    if (!candidate) return "";
    // text()
    if (typeof (candidate as { text?: unknown }).text === "function") {
      return await (candidate as { text: () => Promise<string> }).text();
    }
    // json()
    if (typeof (candidate as { json?: unknown }).json === "function") {
      const parsed = await (candidate as { json: () => Promise<unknown> })
        .json();
      return typeof parsed === "string" ? parsed : JSON.stringify(parsed);
    }
    // body stream
    if ((candidate as { body?: unknown }).body) {
      try {
        const b = (candidate as { body: unknown }).body;
        // try treating as BodyInit
        try {
          return await new Response(b as BodyInit).text();
        } catch (_e) {
          // fallback: stringify
          return JSON.stringify(b);
        }
      } catch (_e) {
        // fallback below
      }
    }
    if (typeof candidate === "string") return candidate;
    return "";
  } catch (_e) {
    return "";
  }
}

// No disk loading on startup; LOCAL_STORE is ephemeral for this process.

function validateProduct(body: unknown) {
  if (!body || typeof body !== "object") return "Invalid JSON body";
  const rec = body as Record<string, unknown>;
  const title = rec.title;
  const price = rec.price;
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return "title is required and must be at least 3 characters";
  }
  const p = Number(price as unknown);
  if (Number.isNaN(p) || p < 0) return "price must be a non-negative number";
  return null;
}

export const handler: Handlers = {
  async GET(req: Request) {
    // Some runtimes may pass a wrapper object; normalize to the real Request
    const _reqAny = req as unknown as { request?: Request };
    const request = _reqAny.request ?? (req as Request);
    const url = new URL(request.url);
    const params = url.searchParams;

    // support single product by id via ?id=
    const id = params.get("id");
    if (id) {
      // check local store first
      const local = LOCAL_STORE.find((x) => String(x.id) === id);
      if (local) {
        return new Response(JSON.stringify(local), {
          headers: { "Content-Type": "application/json" },
        });
      }
      const res = await fetch(`${BASE}/products/${encodeURIComponent(id)}`);
      const data: Product = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (params.get("meta") === "categories") {
      const res = await fetch(`${BASE}/products/categories`);
      const data: string[] = await res.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const category = params.get("category");
    const limit = params.get("limit");

    let endpoint = `${BASE}/products`;
    if (category) {
      endpoint = `${BASE}/products/category/${encodeURIComponent(category)}`;
    }
    if (limit) endpoint += `?limit=${encodeURIComponent(limit)}`;

    const res = await fetch(endpoint);
    const data: Product[] = await res.json();

    // merge local created products (simple strategy: append)
    const merged = data.concat(LOCAL_STORE);

    const q = params.get("q");
    let results: Product[] = merged;
    if (q) {
      const ql = q.toLowerCase();
      results = merged.filter((p) =>
        (p.title + p.description).toLowerCase().includes(ql)
      );
    }

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async POST(req: Request) {
    // Wrap processing in try/catch so we can return diagnostic info on 500s
    const _reqAny = req as unknown as { request?: Request };
    const request = _reqAny.request ?? (req as Request);
    const txt = await readRequestText(request);
    try {
      let body: unknown;
      try {
        body = txt ? JSON.parse(txt) : null;
      } catch (_e) {
        // Return the raw payload to help debug malformed requests from clients
        return new Response(
          JSON.stringify({ error: "Invalid JSON", raw: txt }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const err = validateProduct(body);
      if (err) {
        return new Response(JSON.stringify({ error: err }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Narrow the body to a record so TypeScript allows property access
      const rec = body as Record<string, unknown>;

      const p: Product = {
        id: NEXT_ID++,
        title: String(rec.title),
        price: Number(rec.price),
        description: rec.description ? String(rec.description) : "",
        category: rec.category ? String(rec.category) : "uncategorized",
        image: rec.image
          ? String(rec.image)
          : "https://via.placeholder.com/150",
      };

      // store only in-memory for this process
      LOCAL_STORE.push(p);

      return new Response(JSON.stringify(p), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
      // Log to terminal to help diagnose server-side failures
      try {
        console.error("POST /api/products error:", e);
      } catch (_err) {
        // ignore
      }
      // no disk diagnostics; just return the error details in the response
      // Return internal error with diagnostics (dev only)
      const msg = e && (e as Error).message ? (e as Error).message : String(e);
      const stack = e && (e as Error).stack ? (e as Error).stack : undefined;
      return new Response(
        JSON.stringify({ error: "internal", message: msg, stack, raw: txt }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
