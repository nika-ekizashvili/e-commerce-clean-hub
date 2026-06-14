import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store, orderSmsBody } from "@/lib/config";
import { t } from "@/lib/i18n";

export const metadata = { title: t.contactTitle };

export default function ContactPage() {
  const smsHref = `sms:${store.phoneE164}?&body=${encodeURIComponent(
    orderSmsBody("")
  )}`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900">{t.contactTitle}</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <InfoCard label={t.contactPhone}>
            <a
              href={`tel:${store.phoneE164}`}
              className="text-lg font-semibold text-brand-700"
            >
              {store.phoneDisplay}
            </a>
          </InfoCard>
          <InfoCard label={t.contactHours}>
            <span className="text-slate-700">{store.hoursKa}</span>
          </InfoCard>
          <InfoCard label={t.contactCity}>
            <span className="text-slate-700">
              {store.city}, {store.country}
            </span>
          </InfoCard>
          <InfoCard label={t.contactFacebook}>
            <a
              href={store.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 hover:underline"
            >
              facebook.com →
            </a>
          </InfoCard>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${store.phoneE164}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700"
          >
            ☎ {t.contactCallNow}
          </a>
          <a
            href={smsHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-fresh-500 px-5 py-3 font-semibold text-white hover:bg-fresh-600"
          >
            ✉ {t.contactSmsNow}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}
