import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";
import { getCategories } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminAddProduct };

export default async function NewProductPage() {
  if (!isAuthenticated()) redirect("/admin/login");
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/admin"
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          ← {t.adminProducts}
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {t.adminAddProduct}
        </h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <ProductForm
            action={createProduct}
            categories={categories}
            submitLabel={t.adminSave}
          />
        </div>
      </main>
    </div>
  );
}
