import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parceiros",
  description: "Conheça os parceiros que fazem parte do ecossistema LUNES Experience no Algarve.",
  alternates: { canonical: "/parceiros" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
