import Link from "next/link";
import { store } from "@/lib/config";
import { t } from "@/lib/i18n";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              ✦
            </span>
            <span className="text-base font-bold text-slate-900">
              {store.name}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">{store.taglineKa}</p>
        </div>

        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-slate-900">{t.navContact}</h4>
          <p className="text-slate-600">
            <a href={`tel:${store.phoneE164}`} className="hover:text-brand-700">
              ☎ {store.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-slate-600">{store.hoursKa}</p>
          <p className="mt-1 text-slate-600">
            {store.city}, {store.country}
          </p>
        </div>

        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-slate-900">
            {t.navProducts}
          </h4>
          <ul className="space-y-1">
            <li>
              <Link href="/products" className="text-slate-600 hover:text-brand-700">
                {t.catalogTitle}
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 hover:text-brand-700">
                {t.aboutTitle}
              </Link>
            </li>
            <li>
              <a
                href={store.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-brand-700"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {store.name} · {t.footerRights} ·{" "}
        {t.footerMadeIn}
      </div>
    </footer>
  );
}
