import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import ProductForm from "@/components/ProductForm";
import { updateProduct } from "@/app/admin/actions";
import { isAuthenticated } from "@/lib/auth";
import { getCategories, getProductById } from "@/lib/products";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.adminEdit };

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isAuthenticated()) redirect("/admin/login");

  const [product, categories] = await Promise.all([
    getProductById(params.id),
    getCategories(),
  ]);
  if (!product) notFound();

  // Bind the product id to the update server action.
  const action = updateProduct.bind(null, product.id);

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
          {t.adminEdit}: {product.titleKa}
        </h1>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <ProductForm
            action={action}
            categories={categories}
            submitLabel={t.adminSave}
            defaults={{
              titleKa: product.titleKa,
              categoryId: product.categoryId,
              price: product.price,
              descriptionKa: product.descriptionKa,
              specsKa: product.specsKa,
              imageUrl: product.imageUrl,
              inStock: product.inStock,
              featured: product.featured,
            }}
          />
        </div>
      </main>
    </div>
  );
}
