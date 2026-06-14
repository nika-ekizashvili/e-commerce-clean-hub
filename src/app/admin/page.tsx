import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import DeleteProductButton from "@/components/DeleteProductButton";
import { isAuthenticated } from "@/lib/auth";
import { getAllProductsForAdmin } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminTitle };

export default async function AdminDashboard() {
  if (!isAuthenticated()) redirect("/admin/login");

  const products = await getAllProductsForAdmin();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {t.adminProducts}
            </h1>
            <p className="text-sm text-slate-500">
              {t.resultsCount(products.length)}
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + {t.adminAddProduct}
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">{t.fieldTitle}</th>
                <th className="px-4 py-3 font-medium">{t.fieldCategory}</th>
                <th className="px-4 py-3 font-medium">{t.fieldPrice}</th>
                <th className="px-4 py-3 font-medium">{t.inStock}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    {t.noProducts}
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100">
                        {p.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "🧴"
                        )}
                      </span>
                      <span className="font-medium text-slate-800">
                        {p.titleKa}
                        {p.featured && (
                          <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
                            ★
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.category.emoji} {p.category.nameKa}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {formatPrice(p.price)}
                  </td>
                  <td className="px-4 py-3">
                    {p.inStock ? (
                      <span className="text-fresh-600">✓</span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        {t.adminEdit}
                      </Link>
                      <DeleteProductButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
