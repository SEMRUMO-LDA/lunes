import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar Experiência",
  description: "Reserve a sua experiência LUNES no Algarve. Passeios de barco, treinos personalizados e muito mais.",
  alternates: { canonical: "/reservar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
