# FoodDash (Client)

React + Vite frontend for the food delivery Order Management app. Connects to the Express API in `../backend`.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- TanStack Query (data fetching)
- React Router v6
- Axios
- React Hook Form + Zod (checkout validation)
- Vitest + React Testing Library + MSW (tests)

## Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:3000`

## Setup

```bash
cd client
npm install
```

Create or verify `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Dev server (http://localhost:5173) |
| `npm run build`   | Production build               |
| `npm run preview` | Preview production build       |
| `npm test`        | Vitest (watch mode)            |
| `npm run test:run`| Vitest (single run)            |

## Routes

| Path            | Page               |
|-----------------|--------------------|
| `/`             | Menu + cart drawer |
| `/checkout`     | Checkout           |
| `/orders/:id`   | Order tracking (SSE) |

## Project structure

```
src/
  api/              # Axios API calls (menu, orders)
  components/       # UI components
  context/          # CartContext (localStorage persistence)
  hooks/            # useCart, useOrderStatus (SSE)
  pages/            # MenuPage, CheckoutPage, OrderTrackingPage
  tests/            # Vitest + MSW setup and component tests
  App.jsx
  main.jsx
```

## Features

- Browse menu, add items to cart (persisted in `localStorage`)
- Slide-out cart with quantity controls
- Checkout form with validation (name, address, 10-digit phone)
- Live order tracking via SSE (`/api/orders/:id/stream`)
- Orange primary theme (`#F97316`)

## Running locally

```bash
# Terminal 1 — start API (from ../backend)
npm run dev

# Terminal 2 — start frontend
npm run dev
```

From the repo root you can also use:

```bash
npm run dev:backend
npm run dev:client
```

## Tests

Component tests use Vitest, React Testing Library, and MSW to mock API endpoints.

```bash
npm run test:run
```

Test files live under `src/tests/components/`.
