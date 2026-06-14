import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import OrderButtons from "@/components/OrderButtons";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  return { title: product?.titleKa ?? t.catalogTitle };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id);
  const specs = product.specsKa
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href={`/products?category=${product.category.slug}`}
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          {t.backToCatalog}
        </Link>

        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.titleKa}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-6xl text-slate-300">
                🧴
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-sm text-slate-400">
              {product.category.emoji} {product.category.nameKa}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              {product.titleKa}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-3xl font-extrabold text-brand-700">
                {formatPrice(product.price)}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  product.inStock
                    ? "bg-fresh-500/10 text-fresh-600"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {product.inStock ? `✓ ${t.inStock}` : t.outOfStock}
              </span>
            </div>

            {product.descriptionKa && (
              <div className="mt-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {t.description}
                </h2>
                <p className="mt-2 leading-relaxed text-slate-700">
                  {product.descriptionKa}
                </p>
              </div>
            )}

            {specs.length > 0 && (
              <div className="mt-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {t.specifications}
                </h2>
                <ul className="mt-2 space-y-1">
                  {specs.map((s, i) => (
                    <li key={i} className="flex gap-2 text-slate-700">
                      <span className="text-brand-500">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-7">
              <p className="mb-2 text-sm text-slate-500">{t.orderHint}</p>
              <OrderButtons productTitle={product.titleKa} size="lg" />
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              {t.relatedTitle}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
