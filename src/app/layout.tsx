import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WeddingSite - Siti Web Matrimoniali Pronti all'Uso",
  description: "Crea il sito web perfetto per il vostro matrimonio. Template eleganti, personalizzabili e pronti all'uso con add-on premium.",
  keywords: ["sito matrimonio", "wedding website", "inviti digitali", "RSVP online", "template matrimonio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
