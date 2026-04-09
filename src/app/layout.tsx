import type { Metadata } from "next";
import { Instrument_Serif, Kantumruy_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUNES — Time to be You",
  description: "Move. Explore. Feel. Stay. Uma experiência de bem-estar no Algarve.",
  icons: "/favicon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${instrumentSerif.variable} ${kantumruyPro.variable}`}>
      <body>
        {children}
        <Script
          src="https://kiban.pt/api/v1/i18n/widget.js"
          data-api-key="kiban_live_kExDoEu9ch0gqUdweNil9ddbKl3wqFK"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
