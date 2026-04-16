"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { useTranslation } from "@/src/hooks/useTranslation";

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer({ onContactClick }: { onContactClick?: () => void }) {
  const { t } = useTranslation();
  const [newsletterSent, setNewsletterSent] = useState(false);

  return (
    <footer className="bg-blackout text-coconut relative overflow-hidden font-sans">

      {/* ── Desktop: 5-column grid (unchanged) ── */}
      <div className="hidden md:block pt-32 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-16 mb-32 relative z-10">
          <div className="col-span-2 space-y-8">
            <Image src="/images/brand/LUNES horizontal branco.png" alt="LUNES" width={240} height={48} className="h-12 w-auto" />
            <p className="text-coconut/80 max-w-md font-light">
              {t('footer.description', 'Treino personalizado, passeios de barco na costa algarvia, horta em permacultura e alojamento local. Tudo num só lugar, no belo paraíso a sul de portugal chamado Algarve.')}
            </p>
            <div className="flex gap-6">
              <a href="https://chat.whatsapp.com/LhAgTtMugty7lPTxCo8wrE?mode=gi_t" target="_blank" rel="noopener noreferrer" className="relative group p-2 -m-2">
                <div className="absolute inset-0 bg-coconut/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                <WhatsAppIcon className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity relative z-10" />
              </a>
              {onContactClick ? (
                <div onClick={onContactClick} className="relative group p-2 -m-2">
                  <div className="absolute inset-0 bg-coconut/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Mail className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity relative z-10" />
                </div>
              ) : (
                <a href="mailto:hello@be-lunes.pt" className="relative group p-2 -m-2">
                  <div className="absolute inset-0 bg-coconut/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Mail className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity relative z-10" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">{t('footer.links', 'Links')}</h4>
            <ul className="space-y-4 text-sm text-coconut/70">
              <li>
                <a href="https://www.livroreclamacoes.pt/inicio/" target="_blank" rel="noopener noreferrer" className="relative w-fit hover:text-coconut cursor-pointer transition-colors group block">
                  {t('footer.complaints', 'Livro de Reclamações')}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <Link href="/privacidade" className="relative w-fit hover:text-coconut cursor-pointer transition-colors group block">
                  {t('footer.privacy', 'Política de Privacidade')}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/termos" className="relative w-fit hover:text-coconut cursor-pointer transition-colors group block">
                  {t('footer.terms', 'Termos & Condições')}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link href="/parceiros" className="relative w-fit hover:text-coconut cursor-pointer transition-colors group block">
                  {t('footer.partners', 'Parceiros')}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">{t('footer.contacts', 'Contactos')}</h4>
            <ul className="space-y-4 text-sm text-coconut/70">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 opacity-60" />
                <span>+351 928 322 866</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 opacity-60" />
                <a href="mailto:hello@be-lunes.pt" className="hover:text-coconut transition-colors group relative w-fit">
                  hello@be-lunes.pt
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-coconut transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold">{t('footer.newsletter', 'Newsletter')}</h4>
            <p className="text-sm text-coconut/70">{t('footer.newsletter.desc', 'Receba inspiração semanal para o seu bem-estar.')}</p>
            {newsletterSent ? (
              <p className="text-sm text-explore-cyan">{t('footer.newsletter.success', 'Subscrito com sucesso!')}</p>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
                const email = input?.value?.trim();
                if (!email) return;
                try {
                  await fetch(`${process.env.NEXT_PUBLIC_KIBAN_API_URL}/api/v1/newsletter/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KIBAN_API_KEY}` },
                    body: JSON.stringify({ email }),
                  });
                  setNewsletterSent(true);
                } catch {}
              }} className="flex border-b border-coconut/20 py-2">
                <input type="email" required placeholder={t('footer.newsletter.placeholder', 'O seu email')} className="bg-transparent border-none outline-none text-sm w-full placeholder:text-coconut/40" />
                <button type="submit"><ArrowRight className="w-4 h-4 opacity-80 hover:opacity-100 transition-opacity" /></button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-coconut/10 flex flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.5em] font-medium opacity-50 text-left">
          <div className="flex flex-col items-start gap-1">
            <span>&copy; 2026 LUNES EXPERIENCE LDA</span>
            <span className="text-[8px] tracking-[0.3em] opacity-30 normal-case">RNAAT n.o 1071/2025</span>
          </div>
          <a href="https://aorubro.pt" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity border-b border-coconut/20 pb-0.5">DESENVOLVIDO POR AORUBRO</a>
        </div>
      </div>

      {/* ── Mobile: redesigned single-column layout ── */}
      <div className="md:hidden px-6 pt-16 pb-10 relative z-10">

        {/* Logo + tagline centered */}
        <div className="text-center mb-10">
          <Image src="/images/brand/LUNES horizontal branco.png" alt="LUNES" width={180} height={36} className="h-9 w-auto mx-auto mb-5" />
          <p className="text-coconut/60 text-[15px] font-light leading-relaxed max-w-xs mx-auto">
            {t('footer.description', 'Treino personalizado, passeios de barco na costa algarvia, horta em permacultura e alojamento local. Tudo num só lugar, no belo paraíso a sul de portugal chamado Algarve.')}
          </p>
        </div>

        {/* Social icons centered */}
        <div className="flex justify-center gap-10 mb-10">
          <a href="https://chat.whatsapp.com/LhAgTtMugty7lPTxCo8wrE?mode=gi_t" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-6 h-6 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
          </a>
          {onContactClick ? (
            <div onClick={onContactClick} className="cursor-pointer">
              <Mail className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <a href="mailto:hello@be-lunes.pt">
              <Mail className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          )}
        </div>

        <div className="w-full h-[1px] bg-coconut/10 mb-10" />

        {/* 2-column grid: Links + Contacts */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-coconut/50 mb-5">{t('footer.links', 'Links')}</h4>
            <ul className="space-y-4 text-[15px] text-coconut/80">
              <li><Link href="/privacidade" className="hover:text-coconut transition-colors">{t('footer.privacy', 'Privacidade')}</Link></li>
              <li><Link href="/termos" className="hover:text-coconut transition-colors">{t('footer.terms', 'Termos')}</Link></li>
              <li><Link href="/parceiros" className="hover:text-coconut transition-colors">{t('footer.partners', 'Parceiros')}</Link></li>
              <li><a href="https://www.livroreclamacoes.pt/inicio/" target="_blank" rel="noopener noreferrer" className="hover:text-coconut transition-colors">{t('footer.complaints', 'Reclamações')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-coconut/50 mb-5">{t('footer.contacts', 'Contactos')}</h4>
            <ul className="space-y-4 text-[15px] text-coconut/80">
              <li>
                <a href="tel:+351928322866" className="flex items-center gap-3 hover:text-coconut transition-colors">
                  <Phone className="w-4 h-4 opacity-60 shrink-0" />
                  <span>928 322 866</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@be-lunes.pt" className="flex items-center gap-3 hover:text-coconut transition-colors">
                  <Mail className="w-4 h-4 opacity-60 shrink-0" />
                  <span>hello@be-lunes.pt</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-coconut/10 mb-10" />

        {/* Newsletter CTA block */}
        <div className="bg-coconut/[0.05] rounded-2xl p-6 mb-10">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-coconut/50 mb-3">{t('footer.newsletter', 'Newsletter')}</h4>
          <p className="text-[15px] text-coconut/70 mb-5">{t('footer.newsletter.desc', 'Receba inspiração semanal para o seu bem-estar.')}</p>
          {newsletterSent ? (
            <p className="text-sm text-explore-cyan">{t('footer.newsletter.success', 'Subscrito com sucesso!')}</p>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
              const email = input?.value?.trim();
              if (!email) return;
              try {
                await fetch(`${process.env.NEXT_PUBLIC_KIBAN_API_URL}/api/v1/newsletter/subscribe`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KIBAN_API_KEY}` },
                  body: JSON.stringify({ email }),
                });
                setNewsletterSent(true);
              } catch {}
            }} className="flex border-b border-coconut/30 py-3">
              <input type="email" required placeholder={t('footer.newsletter.placeholder', 'O seu email')} className="bg-transparent border-none outline-none text-[15px] w-full placeholder:text-coconut/40" />
              <button type="submit"><ArrowRight className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" /></button>
            </form>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center space-y-1.5 text-[10px] uppercase tracking-[0.4em] font-sans font-medium opacity-50">
          <p>&copy; 2026 LUNES EXPERIENCE LDA</p>
          <p className="text-[8px] tracking-[0.2em] opacity-50 normal-case">RNAAT n.o 1071/2025</p>
          <a href="https://aorubro.pt" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 hover:opacity-100 transition-opacity border-b border-coconut/20 pb-0.5">DESENVOLVIDO POR AORUBRO</a>
        </div>
      </div>

      {/* Background watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[120%] opacity-[0.04] pointer-events-none select-none">
        <img src="/images/brand/LUNES padrão texto.png" alt="" loading="lazy" className="w-full h-auto brightness-0 invert object-contain" />
      </div>
    </footer>
  );
}
