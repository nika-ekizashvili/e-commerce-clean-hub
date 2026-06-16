import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import CategoryForm from "@/components/CategoryForm";
import { updateCategory } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";
import { getCategoryById } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminEdit };

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isAuthenticated()) redirect("/admin/login");

  const category = await getCategoryById(params.id);
  if (!category) notFound();

  const action = updateCategory.bind(null, category.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/admin/categories"
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          ← {t.adminCategories}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {t.adminEdit}: {category.nameKa}
        </h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <CategoryForm
            action={action}
            submitLabel={t.adminSave}
            defaults={{
              nameKa: category.nameKa,
              emoji: category.emoji ?? "",
              sortOrder: category.sortOrder,
            }}
          />
        </div>
      </main>
    </div>
  );
}
