import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { store } from "@/lib/config";
import { t } from "@/lib/i18n";

export default function AdminHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white">
            ✦
          </span>
          <span className="font-bold text-slate-900">{store.name}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
            {t.adminTitle}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            ↗ საიტი
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              {t.adminLogout}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
