import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de utilização dos serviços da LUNES Experience, Lda. Reservas, cancelamentos, segurança e regras.",
  alternates: { canonical: "/termos" },
  robots: { index: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
