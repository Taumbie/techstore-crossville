# TechStore (Crossville)

Small e-commerce demo built with Deno + Fresh + Preact and Tailwind CSS.

This repository contains a stacked layout, product browsing UI wired to the
fakestoreapi, a client-side cart persisted to localStorage, and a minimal API
proxy for development.

## Features

- Stacked Tailwind layout and reusable `Header` component.
- Product browsing UI (categories, filters, grid) using
  `https://fakestoreapi.com`.
- Client-side cart that persists to `localStorage` and a `/cart` page to view
  saved items.
- Theme toggle (called "light mode") in the header — toggles a `light` class on
  the document element.
- API proxy at `routes/api/products.ts` (in-memory; no disk persistence).

## Development (local)

Prerequisites:

- Deno (v1.XX or newer) installed. See https://deno.land/

Run the dev server (client bundler + server):

```powershell
deno task dev
deno task start
```

- `deno task dev` runs the Vite dev server for client assets.
- `deno task start` launches the Fresh server
  (`deno serve -A _fresh/server.js`).

Open `http://localhost:8000` in your browser. The header contains a theme toggle
(light/dark) and a cart button. Add products to the cart with the "Add" button
on product cards. Visit `/cart` to see the full cart.

Notes:

- The cart persists to `localStorage` under the key `techstore_cart`.
- The header cart badge shows the total quantity (sum of quantities), not the
  number of distinct products.
- The theme toggle stores preference in `localStorage` under
  `techstore_light_mode` and toggles the `light` class on `<html>`.

## Build

```powershell
deno task build
deno task start
```

`deno task build` runs the Vite build for client assets.

## Deploy

You can deploy a Fresh app to platforms that support Deno (for example, Deno
Deploy or a Docker container).

Basic Deno Deploy steps:

1. Push your repository to GitHub.
2. Use Deno Deploy and point it to your repository.

Or using Docker:

```dockerfile
FROM denoland/deno:alpine-1.0.0
WORKDIR /app
COPY . .
RUN deno cache main.ts
CMD ["task", "start"]
```

## CI

Consider adding a GitHub Actions workflow to run `deno task check` on push/pull
requests.

## License

MIT

# Fresh project

Your new Fresh project is ready to go. You can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

### Usage

Make sure to install Deno:
https://docs.deno.com/runtime/getting_started/installation

Then start the project in development mode:

```
deno task dev
```

This will watch the project directory and restart as necessary.
