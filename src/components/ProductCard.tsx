import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { t } from "@/lib/i18n";

type Props = {
  product: {
    slug: string;
    titleKa: string;
    price: number;
    imageUrl: string;
    inStock: boolean;
    category: { nameKa: string; emoji: string | null };
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.titleKa}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-4xl text-slate-300">
            🧴
          </div>
        )}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white">
            {t.outOfStock}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <span className="text-xs text-slate-400">
          {product.category.emoji} {product.category.nameKa}
        </span>
        <h3 className="mt-1 line-clamp-2 flex-1 text-sm font-semibold text-slate-800">
          {product.titleKa}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-bold text-brand-700">
            {formatPrice(product.price)}
          </span>
          <span className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
            ნახვა →
          </span>
        </div>
      </div>
    </Link>
  );
}
