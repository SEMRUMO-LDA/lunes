"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { X, ArrowLeft } from "lucide-react";

export default function ParceirosPage() {
  const router = useRouter();
  const goHome = () => router.push("/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-white overflow-y-auto selection:bg-blackout selection:text-white"
    >
      <div className="max-w-4xl mx-auto px-8 py-24 md:py-32">
        <button
          onClick={goHome}
          className="fixed top-8 right-8 z-[110] p-4 rounded-full bg-blackout text-white hover:scale-110 transition-transform active:scale-95 group"
        >
          <X className="w-5 h-5" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-[0.3em] whitespace-nowrap pointer-events-none text-blackout font-bold">Fechar</span>
        </button>

        <button
          onClick={goHome}
          className="mb-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-sans font-bold text-blackout/40 hover:text-blackout transition-colors group"
        >
          <div className="p-2 rounded-full border border-blackout/10 group-hover:border-blackout/30 group-hover:bg-blackout/5 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Voltar à Homepage</span>
        </button>

        <div className="space-y-6 mb-16">
          <h1 className="text-5xl md:text-7xl font-light italic text-blackout">Parceiros</h1>
          <div className="w-24 h-[2px] bg-blackout/20" />
        </div>

        <div className="prose prose-lg max-w-none text-blackout/70 leading-relaxed font-sans">
          <p className="text-xl font-light leading-relaxed mb-12">
            A LUNES acredita que as melhores experiências nascem de colaborações autênticas. Trabalhamos com parceiros que partilham os nossos valores de qualidade, sustentabilidade e bem-estar.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="p-8 rounded-3xl border border-blackout/10 hover:border-blackout/20 transition-all">
              <h3 className="text-lg font-bold mb-2">Parceria Desportiva</h3>
              <p className="text-sm text-blackout/50">Em breve...</p>
            </div>
            <div className="p-8 rounded-3xl border border-blackout/10 hover:border-blackout/20 transition-all">
              <h3 className="text-lg font-bold mb-2">Parceria Náutica</h3>
              <p className="text-sm text-blackout/50">Em breve...</p>
            </div>
            <div className="p-8 rounded-3xl border border-blackout/10 hover:border-blackout/20 transition-all">
              <h3 className="text-lg font-bold mb-2">Parceria Gastronómica</h3>
              <p className="text-sm text-blackout/50">Em breve...</p>
            </div>
            <div className="p-8 rounded-3xl border border-blackout/10 hover:border-blackout/20 transition-all">
              <h3 className="text-lg font-bold mb-2">Parceria Turismo</h3>
              <p className="text-sm text-blackout/50">Em breve...</p>
            </div>
          </div>

          <div className="mt-16 p-12 rounded-3xl bg-blackout/5 text-center">
            <h3 className="text-2xl font-light italic mb-4">Quer ser nosso parceiro?</h3>
            <p className="text-sm text-blackout/60 mb-8">Entre em contacto connosco para explorar oportunidades de colaboração.</p>
            <a href="mailto:geral@lfrgroup.pt" className="inline-block px-8 py-4 rounded-full bg-blackout text-white text-[10px] uppercase tracking-[0.5em] font-sans font-bold hover:scale-105 transition-all duration-300">
              Contactar
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
