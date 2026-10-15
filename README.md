# SportVerse

Cinematic live-score studio built with React, Vite, Tailwind, Framer Motion, GSAP, React Three Fiber, Recharts, and TanStack Query.

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview the production build

## Auth (mock)

Accounts are stored in `localStorage`. Sign up first, then log in.

Protected routes: `/live`, `/match/:id`, `/favorites`, `/account`.

Unauthenticated visits redirect to `/login` and return to the original page after a successful login.

## Data

Mock JSON lives in `src/data`. All reads go through `src/services/sportsApi.js` so a real sports API can replace the mock layer later.

## Stack

React 18 · Vite · React Router · Tailwind CSS · Framer Motion · GSAP · React Three Fiber · Recharts · TanStack Query · Lucide
