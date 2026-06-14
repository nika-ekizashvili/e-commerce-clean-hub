import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata = { title: t.catalogTitle };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const category = searchParams.category;
  const search = searchParams.q?.trim() || undefined;

  const [products, categories] = await Promise.all([
    getProducts({ category, search }),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">{t.catalogTitle}</h1>

        {/* Search */}
        <form action="/products" method="get" className="mt-4">
          {category && (
            <input type="hidden" name="category" value={category} />
          )}
          <div className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={search ?? ""}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              ძებნა
            </button>
          </div>
        </form>

        {/* Category pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterPill
            href={search ? `/products?q=${encodeURIComponent(search)}` : "/products"}
            active={!category}
            label={t.allCategories}
          />
          {categories.map((c) => {
            const params = new URLSearchParams();
            params.set("category", c.slug);
            if (search) params.set("q", search);
            return (
              <FilterPill
                key={c.id}
                href={`/products?${params.toString()}`}
                active={category === c.slug}
                label={`${c.emoji} ${c.nameKa}`}
              />
            );
          })}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          {t.resultsCount(products.length)}
        </p>

        {products.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">{t.noProducts}</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function FilterPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-slate-300 bg-white text-slate-600 hover:border-brand-300"
      }`}
    >
      {label}
    </Link>
  );
}
