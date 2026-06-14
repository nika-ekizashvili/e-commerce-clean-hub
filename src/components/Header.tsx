import Link from "next/link";
import { store } from "@/lib/config";
import { t } from "@/lib/i18n";

const links = [
  { href: "/", label: t.navHome },
  { href: "/products", label: t.navProducts },
  { href: "/about", label: t.navAbout },
  { href: "/contact", label: t.navContact },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-lg font-bold text-white">
            ✦
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            {store.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${store.phoneE164}`}
          className="rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          ☎ {store.phoneDisplay}
        </a>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-2 py-1 sm:hidden">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
