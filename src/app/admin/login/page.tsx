import { redirect } from "next/navigation";
import { login } from "../actions";
import { isAuthenticated } from "@/lib/auth";
import { store } from "@/lib/config";
import { t } from "@/lib/i18n";

export const metadata = { title: t.adminLoginTitle };

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAuthenticated()) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center bg-clean-gradient px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-xl font-bold text-white">
            ✦
          </span>
          <h1 className="mt-3 text-xl font-bold text-slate-900">
            {store.name}
          </h1>
          <p className="text-sm text-slate-500">{t.adminLoginTitle}</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t.adminPassword}
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          {searchParams.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {t.adminWrongPassword}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700"
          >
            {t.adminLogin}
          </button>
        </form>
      </div>
    </main>
  );
}
