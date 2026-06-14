import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/products";
import { store } from "@/lib/config";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: t.aboutTitle };

export default async function AboutPage() {
  const categories = await getCategories();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">{t.aboutTitle}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">
          {t.aboutBody}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-2 font-semibold text-slate-800">
                {c.nameKa}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-clean-gradient p-6">
          <h2 className="text-lg font-bold text-slate-900">{t.navContact}</h2>
          <p className="mt-2 text-slate-700">
            ☎{" "}
            <a
              href={`tel:${store.phoneE164}`}
              className="font-semibold text-brand-700"
            >
              {store.phoneDisplay}
            </a>
          </p>
          <p className="mt-1 text-slate-700">{store.hoursKa}</p>
          <p className="mt-1 text-slate-700">
            {store.city}, {store.country}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
