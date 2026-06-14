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

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL

## Getting started

```bash
npm install
cp .env.example .env      # set DATABASE_URL (a local/Docker Postgres works)
npm run db:push           # create the database schema
npm run db:seed           # load starter categories + products
npm run dev               # http://localhost:3000
```

Need a local Postgres quickly?

```bash
docker run --name cleanhub-pg -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=cleanhub -p 5432:5432 -d postgres:16
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cleanhub"
```

Admin panel: <http://localhost:3000/admin> — default password `cleanhub`
(set `ADMIN_PASSWORD` in `.env`).

## Configuration

- **Contact info / phone / hours / tagline** → `src/lib/config.ts`
- **Georgian UI text** → `src/lib/i18n.ts`
- **Starter products** → `prisma/seed.ts`

## Deploying to production (usectl)

The app is hosted on [usectl](https://usectl.com) — a managed Kubernetes
platform that builds the GitHub repo into a live HTTPS app and provides a
managed PostgreSQL database.

Outline (run the usectl CLI from a machine that can reach usectl's API):

1. Install & authenticate the usectl CLI, then connect this repo's `main` branch.
2. Provision the **PostgreSQL** addon — usectl injects `DATABASE_URL`.
3. Set the app environment variables:
   - `ADMIN_PASSWORD` — a strong admin password
   - `AUTH_SECRET` — a long random string
4. Build command: `npm run build` · Start command: `npm start`.
5. One-time database setup against the managed Postgres:
   ```bash
   npm run db:push     # create tables
   npm run db:seed     # load starter products (run once)
   ```

`npm run build` runs `prisma generate` automatically, and the Prisma schema
includes the `debian-openssl-3.0.x` binary target for Linux containers.

## Roadmap

- **Phase 1 (done):** catalog + tap-to-call/SMS ordering + admin panel
- **Phase 2:** shopping cart + checkout + local payment (COD / bank transfer / card)
- **Phase 3:** orders dashboard, inventory, promotions, analytics
- Image uploads (Vercel Blob / Cloudinary) instead of pasting URLs
