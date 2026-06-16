import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
import { isAuthenticated } from "@/lib/auth";
import { getAllCategoriesForAdmin } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminCategories };

export default async function AdminCategoriesPage() {
  if (!isAuthenticated()) redirect("/admin/login");

  const categories = await getAllCategoriesForAdmin();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t.adminCategories}</h1>
            <p className="text-sm text-slate-500">{t.categoriesCount(categories.length)}</p>
          </div>
          <Link
            href="/admin/categories/new"
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            + {t.adminAddCategory}
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">{t.fieldTitle}</th>
                <th className="px-4 py-3 font-medium">{t.fieldEmoji}</th>
                <th className="px-4 py-3 font-medium">{t.fieldSortOrder}</th>
                <th className="px-4 py-3 font-medium">პროდუქტები</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    კატეგორია ვერ მოიძებნა.
                  </td>
                </tr>
              )}
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{c.nameKa}</td>
                  <td className="px-4 py-3 text-lg">{c.emoji ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{c.sortOrder}</td>
                  <td className="px-4 py-3 text-slate-600">{c._count.products}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/categories/${c.id}/edit`}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        {t.adminEdit}
                      </Link>
                      <DeleteCategoryButton id={c.id} />
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
