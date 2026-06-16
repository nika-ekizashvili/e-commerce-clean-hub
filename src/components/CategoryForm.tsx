import Link from "next/link";
import { t } from "@/lib/i18n";

type Defaults = {
  nameKa?: string;
  emoji?: string;
  sortOrder?: number;
};

const inputCls =
  "w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function CategoryForm({
  action,
  defaults = {},
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: Defaults;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5">
      <Field label={t.fieldTitle} htmlFor="nameKa">
        <input
          id="nameKa"
          name="nameKa"
          required
          defaultValue={defaults.nameKa ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.fieldEmoji} htmlFor="emoji">
          <input
            id="emoji"
            name="emoji"
            placeholder="🧹"
            defaultValue={defaults.emoji ?? ""}
            className={inputCls}
          />
        </Field>

        <Field label={t.fieldSortOrder} htmlFor="sortOrder">
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min="0"
            defaultValue={defaults.sortOrder ?? 0}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/categories"
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100"
        >
          {t.adminCancel}
        </Link>
      </div>
    </form>
  );
}
