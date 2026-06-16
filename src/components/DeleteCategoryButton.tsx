"use client";

import { deleteCategory } from "@/app/admin/actions";
import { t } from "@/lib/i18n";

export default function DeleteCategoryButton({ id }: { id: string }) {
  return (
    <form
      action={deleteCategory}
      onSubmit={(e) => {
        if (!confirm(t.confirmDeleteCategory)) e.preventDefault();
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
