import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-clean-gradient">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
            <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-brand-700">
              🧼 {t.footerMadeIn}
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              {t.heroSubtitle}
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                {t.heroCta}
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-brand-300"
              >
                {t.navContact}
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            {t.categoriesTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-3xl">
                  {c.emoji}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {c.nameKa}
                  </h3>
                  <span className="text-sm text-brand-700 group-hover:underline">
                    {t.viewAll} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured products */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {t.featuredTitle}
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              {t.viewAll} →
            </Link>
          </div>
          {featured.length === 0 ? (
            <p className="text-slate-500">{t.noProducts}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
