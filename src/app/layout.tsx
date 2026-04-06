import type { Metadata } from "next";
import { Instrument_Serif, Kantumruy_Pro } from "next/font/google";
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
  icons: "/LUNES icon preto.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${instrumentSerif.variable} ${kantumruyPro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
