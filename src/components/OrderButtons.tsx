import { store, orderSmsBody } from "@/lib/config";
import { t } from "@/lib/i18n";

// Tap-to-call / tap-to-SMS order buttons. The SMS is pre-filled with the
// product name so the owner immediately knows what the customer wants.
export default function OrderButtons({
  productTitle,
  size = "md",
}: {
  productTitle: string;
  size?: "md" | "lg";
}) {
  const smsHref = `sms:${store.phoneE164}?&body=${encodeURIComponent(
    orderSmsBody(productTitle)
  )}`;
  const padding = size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2.5 text-sm";

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <a
        href={`tel:${store.phoneE164}`}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white transition hover:bg-brand-700 ${padding}`}
      >
        ☎ {t.orderCall}
      </a>
      <a
        href={smsHref}
        className={`flex flex-1 items-center justify-center gap-2 rounded-xl border border-fresh-500 bg-fresh-500 font-semibold text-white transition hover:bg-fresh-600 ${padding}`}
      >
        ✉ {t.orderSms}
      </a>
    </div>
  );
}
