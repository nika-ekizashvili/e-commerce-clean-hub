"use client";

import { deleteProduct } from "@/app/admin/actions";
import { t } from "@/lib/i18n";

export default function DeleteProductButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(t.confirmDelete)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        {t.adminDelete}
      </button>
    </form>
  );
}
