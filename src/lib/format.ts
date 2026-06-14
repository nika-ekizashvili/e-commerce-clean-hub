import { store } from "./config";

// Format a GEL price, e.g. 20 -> "20 ₾", 19.5 -> "19.50 ₾"
export function formatPrice(price: number): string {
  const hasFraction = Math.round(price * 100) % 100 !== 0;
  const value = hasFraction ? price.toFixed(2) : String(Math.round(price));
  return `${value} ${store.currencyKa}`;
}

// Build a URL-safe slug from Georgian or Latin text.
// Georgian characters are kept; spaces -> dashes; a short random suffix
// guarantees uniqueness.
export function slugify(input: string): string {
  const base = input
    .trim()
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).slice(2, 6);
  return base ? `${base}-${suffix}` : suffix;
}
