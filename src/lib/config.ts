// Central store configuration for Clean Hub.
// Edit these values to update contact info across the whole site.

export const store = {
  name: "Clean Hub",
  // Georgian tagline: "Everything for cleanliness"
  taglineKa: "ყველაფერი სისუფთავისთვის",
  city: "თბილისი",
  country: "საქართველო",

  // Order channel — phone & SMS (tap-to-call / tap-to-text)
  // Stored in international format for tel:/sms: links.
  phoneE164: "+995575778142",
  // Human-readable display
  phoneDisplay: "+995 575 77 81 42",

  // Default business hours (shown on Contact / Footer)
  hoursKa: "ორშ.–შაბ. 10:00–19:00 · კვირა დახურულია",

  facebookUrl: "https://www.facebook.com/share/1LB8ns78FS/?mibextid=wwXIfr",

  currencyKa: "₾",
} as const;

// Pre-filled SMS body when a customer orders a product.
export function orderSmsBody(productTitle: string): string {
  return `გამარჯობა Clean Hub, მსურს შევუკვეთო: ${productTitle}`;
}
