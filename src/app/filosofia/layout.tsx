import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Nossa Filosofia — Permacultura e Cultivo Consciente",
  description: "Guiados pelos princípios da permacultura, criamos sistemas vivos e regenerativos. Conheça a nossa filosofia de cultivo em solo vivo e respeito pelos ciclos naturais.",
  alternates: { canonical: "/filosofia" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
