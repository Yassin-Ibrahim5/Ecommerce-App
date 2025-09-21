# E‑Commerce App (Next.js)

![Project preview](public/SnapCart-Preview.png)

An e‑commerce web application built with Next.js (App Router) and React. It provides end‑to‑end shopping flows: product browsing and search, product details, cart and wishlist, checkout, and authentication using NextAuth.

Note: This README was refreshed to reflect the current codebase. Outdated info from earlier iterations (e.g., Redux Toolkit) has been corrected.

---

## Overview

- Framework: Next.js 15 (App Router under `src/app`)
- Language: TypeScript
- UI: Tailwind CSS v4, shadcn/ui (with Radix UI under the hood), lucide-react icons
- Auth: NextAuth (credentials provider)
- Data fetching: native fetch and axios
- Search: fuse.js for client-side fuzzy search
- Images: Next.js Image with remote patterns configured in `next.config.ts`
- Package manager: npm (package-lock.json present)

---

## Requirements

- Node.js 18.18+ (Next.js 15 requirement) or Node.js 20+
- npm 9+
- A valid NextAuth secret in environment (see Environment Variables)

---

## Getting Started

1) Clone the repository
- Using HTTPS
  git clone https://github.com/Yassin-Ibrahim5/Ecommerce-App.git
- Or clone from your own fork

2) Change into the app directory
  cd e-commerce-app

3) Install dependencies
  npm install

4) Configure environment variables
- Create a file named `.env.local` in `e-commerce-app/` with at least:
  AUTH_SECRET=your_generated_secret
- Optional/likely vars (confirm and add as needed):
  # TODO: If deploying NextAuth, set the canonical URL
  # NEXTAUTH_URL=https://your-domain.example

5) Start the development server
  npm run dev

6) Open the app
- Visit http://localhost:3000

---

## Scripts

Defined in `package.json`:
- dev: next dev --turbopack
- build: next build --turbopack
- start: next start
- lint: eslint

Typical usage:
- Development: npm run dev
- Production build: npm run build && npm run start
- Linting: npm run lint

---

## Environment Variables

The app uses NextAuth with JWT sessions and requires a secret:
- AUTH_SECRET: Required. Secret for NextAuth JWT and token decoding (used in `src/app/api/auth/[...nextauth]/route.ts` and `src/lib/token.utils.ts`).

Potential/optional variables:
- NEXTAUTH_URL: Recommended in production to tell NextAuth the canonical site URL. Not strictly required for local dev, but add it in hosted environments. [TODO: confirm and document exact requirements for your deployment]

Notes:
- Create a `.env.local` file at the project root (`e-commerce-app/.env.local`).
- Do not commit `.env*` files; they are git-ignored.

---

## Entry Points and Routing

- App entry: `src/app/page.tsx` (home page)
- Auth routes: NextAuth handler at `src/app/api/auth/[...nextauth]/route.ts`
- App Router pages (non-exhaustive):
  - `/products` → `src/app/products/page.tsx`
  - `/products/[id]` → `src/app/products/[id]/page.tsx`
  - `/cart` → `src/app/cart/page.tsx`
  - `/wishlist` → `src/app/wishlist/page.tsx`
  - `/brands` → `src/app/brands/page.tsx`
  - `/categories` → `src/app/categories/page.tsx`
  - Auth flows under `src/app/(auth)/*` (login/register/forgot/reset/change-data/password)

Images configuration for remote domains is set in `next.config.ts`.

---

## Project Structure

High-level structure (partial):

- e-commerce-app/
  - next.config.ts
  - package.json
  - postcss.config.mjs
  - tailwind.config.ts
  - tsconfig.json
  - public/
    - SnapCart-Preview.png
  - src/
    - app/
      - page.tsx (home)
      - globals.css (Tailwind import)
      - api/
        - auth/[...nextauth]/route.ts (NextAuth API route)
      - products/
        - page.tsx
        - [id]/page.tsx
      - cart/page.tsx
      - wishlist/page.tsx
      - brands/page.tsx
      - categories/page.tsx
      - (auth)/
        - login/page.tsx, register/page.tsx, forgot-password/*, reset-password/*, change-data/page.tsx, change-password/page.tsx
    - components/
      - nav-comps/, products-comps/, orders-comps/, ui/
    - lib/
      - token.utils.ts, utils.ts
    - app/context/
      - CartContext.tsx, OrdersContext.tsx
    - app/hooks/
      - useProductSearch.ts
    - app/types/
      - product.model.ts

Note: Paths use a base alias `@/*` → `src/*` as configured in `tsconfig.json`.

---

## Features

- Authentication with NextAuth (credentials provider; custom sign-in page at `/login`).
- Product catalog browsing and fuzzy search.
- Cart and wishlist management (implemented with React Context providers).
- Checkout page and orders view.
- Responsive UI with Tailwind CSS and shadcn/ui components.

---

## Styling and UI

- Tailwind CSS v4 is configured via `postcss.config.mjs` and `src/app/globals.css`.
- shadcn/ui is configured with `components.json` (aliases for `@/components`, `@/lib`, etc.).
- Radix UI primitives are used under shadcn/ui components.

---

## Testing

No automated tests or test scripts are currently configured in `package.json`.
- TODO: Add testing setup (e.g., Jest/RTL for unit tests and/or Playwright/Cypress for E2E) and corresponding `npm test` script.

---

## Linting

- ESLint is configured (`eslint` and `eslint-config-next`).
- Run: npm run lint

---

## Deployment

- Build with: npm run build
- Start with: npm run start
- Ensure AUTH_SECRET (and optionally NEXTAUTH_URL) are set in the runtime environment.

---

## License

No license file is present in this repository.
- TODO: Choose and add a LICENSE (e.g., MIT) and update package metadata if applicable.

---

## Contact

For any questions or feedback:
- Email: yassinhafez661@gmail.com
- GitHub: https://github.com/Yassin-Ibrahim5
