import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import CategoryForm from "@/components/CategoryForm";
import { createCategory } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminAddCategory };

export default async function NewCategoryPage() {
  if (!isAuthenticated()) redirect("/admin/login");

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
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{t.adminAddCategory}</h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <CategoryForm action={createCategory} submitLabel={t.adminSave} />
        </div>
      </main>
    </div>
  );
}
