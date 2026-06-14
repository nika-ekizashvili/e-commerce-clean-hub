import Link from "next/link";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-clean-gradient px-4 text-center">
      <div>
        <div className="text-6xl">🧼</div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          გვერდი ვერ მოიძებნა
        </h1>
        <p className="mt-2 text-slate-600">
          სამწუხაროდ, თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          {t.navHome}
        </Link>
      </div>
    </main>
  );
}
