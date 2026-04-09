"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-blackout text-coconut flex flex-col items-center justify-center px-8 selection:bg-coconut selection:text-blackout"
    >
      <div className="text-center space-y-8 max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Image src="/images/brand/LUNES horizontal branco.png" alt="LUNES" width={200} height={40} className="h-10 w-auto mx-auto mb-12 opacity-40" />
        </motion.div>

        <h1 className="text-[20vw] md:text-[12rem] leading-none font-serif italic tracking-tighter opacity-10">
          404
        </h1>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl italic tracking-tight">
            Página não encontrada.
          </h2>
          <p className="text-coconut/50 text-sm font-light max-w-sm mx-auto">
            O caminho que procura não existe. Talvez o mar o tenha levado. Volte ao início e redescubra o seu ritmo.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-3 mt-8 border border-coconut/20 rounded-full px-8 py-4 text-[10px] uppercase tracking-[0.5em] font-sans font-bold hover:bg-coconut hover:text-blackout transition-all duration-300 bg-coconut/5 backdrop-blur-md group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Início
        </button>
      </div>

      {/* Background pattern */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120%] opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/LUNES padrao texto.png"
          alt=""
          fill
          className="w-full h-auto brightness-0 invert object-contain"
          sizes="120vw"
        />
      </div>
    </motion.div>
  );
}
