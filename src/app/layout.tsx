import type { Metadata } from "next";
import "./globals.css";
import { store } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: `${store.name} — ${store.taglineKa}`,
    template: `%s · ${store.name}`,
  },
  description:
    "დასუფთავებისა და საყოფაცხოვრებო საშუალებები თბილისში. Clean Hub — ყველაფერი სისუფთავისთვის.",
  openGraph: {
    title: store.name,
    description: store.taglineKa,
    locale: "ka_GE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
