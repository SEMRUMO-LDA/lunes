import type { Metadata } from "next";
import { Instrument_Serif, Kantumruy_Pro } from "next/font/google";
import Script from "next/script";
import { TranslationProvider } from "../hooks/useTranslation";
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
  metadataBase: new URL("https://www.be-lunes.pt"),
  title: {
    default: "LUNES — Time to be You",
    template: "%s | LUNES",
  },
  description: "Move. Explore. Feel. Stay. Experiências de bem-estar no Algarve — treino personalizado, passeios de barco, permacultura e alojamento.",
  icons: "/favicon.png",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://www.be-lunes.pt",
    siteName: "LUNES Experience",
    title: "LUNES — Time to be You",
    description: "Move. Explore. Feel. Stay. Experiências de bem-estar no Algarve.",
    images: [{ url: "/images/brand/lunes-horizontal-preto.png", width: 1200, height: 630, alt: "LUNES Experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUNES — Time to be You",
    description: "Move. Explore. Feel. Stay. Experiências de bem-estar no Algarve.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${instrumentSerif.variable} ${kantumruyPro.variable}`}>
      <head>
        <meta name="theme-color" content="#1E1E1E" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body className="bg-blackout">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LUNES Experience",
              url: "https://www.be-lunes.pt",
              logo: "https://www.be-lunes.pt/images/brand/lunes-horizontal-preto.png",
              description: "Experiências de bem-estar no Algarve — treino personalizado, passeios de barco, permacultura e alojamento.",
              email: "hello@be-lunes.pt",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Estrada Municipal 529-1",
                addressLocality: "Porches",
                addressRegion: "Algarve",
                postalCode: "8400-492",
                addressCountry: "PT",
              },
              sameAs: [
                "https://www.instagram.com/be.lunes",
                "https://www.facebook.com/be.lunes",
              ],
            }),
          }}
        />
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Script
          src="https://kiban.pt/api/v1/i18n/widget.js"
          data-api-key="kiban_live_kExDoEu9ch0gqUdweNil9ddbKl3wqFK"
          strategy="lazyOnload"
        />
        <Script
          src="https://kiban.pt/api/v1/cookie-notice/widget.js"
          data-api-key="kiban_live_kExDoEu9ch0gqUdweNil9ddbKl3wqFK"
          strategy="lazyOnload"
        />
        <Script
          src="https://kiban.pt/api/v1/accessibility/widget.js"
          data-api-key="kiban_live_kExDoEu9ch0gqUdweNil9ddbKl3wqFK"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
