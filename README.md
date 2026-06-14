# Clean Hub 🧼

E-commerce storefront for **Clean Hub** — a cleaning & housekeeping shop in
Tbilisi, Georgia. The site is in **Georgian** and prices are in **GEL (₾)**.

**v1 model:** browse the catalog, then **tap to call or SMS** to order
(`+995 575 77 81 42`). No online checkout yet — that's planned for phase 2.

## Features

- **Storefront** (Georgian, mobile-first)
  - Home with hero, categories, featured products
  - Catalog with search & category filter (`საყოფაცხოვრებო · სამზარეულო · გარაჟი`)
  - Product detail with photos, specs, description, and **call / SMS** order buttons
  - About & Contact pages
- **Admin panel** (`/admin`)
  - Password login
  - Add / edit / delete products, set price, photo (URL), stock, "featured"

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · SQLite (dev)

## Getting started

```bash
npm install
cp .env.example .env      # then edit values
npm run db:push           # create the database schema
npm run db:seed           # load starter categories + products
npm run dev               # http://localhost:3000
```

Admin panel: <http://localhost:3000/admin> — default password `cleanhub`
(set `ADMIN_PASSWORD` in `.env`).

## Configuration

- **Contact info / phone / hours / tagline** → `src/lib/config.ts`
- **Georgian UI text** → `src/lib/i18n.ts`
- **Starter products** → `prisma/seed.ts`

## Deploying to production (Vercel)

SQLite is great for local dev but doesn't persist on serverless hosting.
For production:

1. Create a hosted Postgres database (e.g. [Neon](https://neon.tech) — free tier).
2. In `prisma/schema.prisma`, change `provider = "sqlite"` →
   `provider = "postgresql"`.
3. Set these env vars in Vercel:
   - `DATABASE_URL` — your Postgres connection string
   - `ADMIN_PASSWORD` — a strong password
   - `AUTH_SECRET` — a long random string
4. Run `npx prisma db push` and `npm run db:seed` against the new DB.
5. Deploy.

## Roadmap

- **Phase 1 (done):** catalog + tap-to-call/SMS ordering + admin panel
- **Phase 2:** shopping cart + checkout + local payment (COD / bank transfer / card)
- **Phase 3:** orders dashboard, inventory, promotions, analytics
- Image uploads (Vercel Blob / Cloudinary) instead of pasting URLs
