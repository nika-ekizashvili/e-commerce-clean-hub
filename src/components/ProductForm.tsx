import Link from "next/link";
import { t } from "@/lib/i18n";

type Category = { id: string; nameKa: string; emoji: string | null };

type Defaults = {
  titleKa?: string;
  categoryId?: string;
  price?: number;
  descriptionKa?: string;
  specsKa?: string;
  imageUrl?: string;
  inStock?: boolean;
  featured?: boolean;
};

// Shared create/edit form. `action` is a bound server action.
export default function ProductForm({
  action,
  categories,
  defaults = {},
  submitLabel,
}: {
  action: (formData: FormData) => void;
  categories: Category[];
  defaults?: Defaults;
  submitLabel: string;
}) {
  const inStock = defaults.inStock ?? true;
  const featured = defaults.featured ?? false;

  return (
    <form action={action} className="space-y-5">
      <Field label={t.fieldTitle} htmlFor="titleKa">
        <input
          id="titleKa"
          name="titleKa"
          required
          defaultValue={defaults.titleKa ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.fieldCategory} htmlFor="categoryId">
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={defaults.categoryId ?? ""}
            className={inputCls}
          >
            <option value="" disabled>
              —
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.nameKa}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.fieldPrice} htmlFor="price">
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaults.price ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={t.fieldDescription} htmlFor="descriptionKa">
        <textarea
          id="descriptionKa"
          name="descriptionKa"
          rows={3}
          defaultValue={defaults.descriptionKa ?? ""}
          className={inputCls}
        />
      </Field>

      <Field label={t.fieldSpecs} htmlFor="specsKa">
        <textarea
          id="specsKa"
          name="specsKa"
          rows={3}
          placeholder={"წონა: 150გ\nსურნელი: ლიმონი"}
          defaultValue={defaults.specsKa ?? ""}
          className={inputCls}
        />
      </Field>

      <Field label={t.fieldImageUrl} htmlFor="imageUrl">
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://…"
          defaultValue={defaults.imageUrl ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={inStock}
            className="h-4 w-4 rounded border-slate-300"
          />
          {t.fieldInStock}
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={featured}
            className="h-4 w-4 rounded border-slate-300"
          />
          {t.fieldFeatured}
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin"
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100"
        >
          {t.adminCancel}
        </Link>
      </div>
    </form>
  );
}

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
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
