import type { Metadata } from "next";
import BrandPage from './BrandPageClient';

const brandMeta: Record<string, { title: string; description: string }> = {
  move: {
    title: "MOVE — Treino Personalizado",
    description: "Treinos personalizados, seguros e baseados em ciência. Presencial, online ou ao domicílio no Algarve.",
  },
  explore: {
    title: "EXPLORE — Passeios de Barco",
    description: "Descubra a costa algarvia a partir do mar. Passeios partilhados, privados e experiências Taylor Made desde Portimão.",
  },
  feel: {
    title: "FEEL — Permacultura e Bem-Estar",
    description: "Sentir o sabor real do alimento e a tranquilidade de saber a sua origem. Permacultura, cultivo em solo vivo e animais em liberdade.",
  },
  stay: {
    title: "STAY — Alojamento no Algarve",
    description: "Apartamento moderno com 200 m² no coração do Algarve. Três quartos, luz natural e uma calma regeneradora.",
  },
};

export function generateStaticParams() {
  return [
    { brandId: 'move' },
    { brandId: 'explore' },
    { brandId: 'feel' },
    { brandId: 'stay' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ brandId: string }> }): Promise<Metadata> {
  const { brandId } = await params;
  const meta = brandMeta[brandId];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${brandId}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function BrandPageRoute() {
  return <BrandPage />;
}
