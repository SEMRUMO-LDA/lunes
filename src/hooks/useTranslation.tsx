'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ── Types ──

type TranslationDict = Record<string, string>;

interface TranslationContextValue {
  lang: string;
  t: (key: string, fallback: string) => string;
}

const DEFAULT_LANG = 'pt';
const API_URL = process.env.NEXT_PUBLIC_KIBAN_API_URL || 'https://kiban.pt';
const API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY || '';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// ── Context ──

const TranslationContext = createContext<TranslationContextValue>({
  lang: DEFAULT_LANG,
  t: (_key, fallback) => fallback,
});

// ── Helpers ──

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function getUrlParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  return new URL(window.location.href).searchParams.get(name);
}

function getCacheKey(lang: string) {
  return `kiban-translations-${lang}`;
}

function getCached(lang: string): TranslationDict | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(getCacheKey(lang));
    if (!raw) return null;
    const { dict, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return dict;
  } catch {
    return null;
  }
}

function setCache(lang: string, dict: TranslationDict) {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(getCacheKey(lang), JSON.stringify({ dict, ts: Date.now() }));
  } catch { /* quota exceeded — ignore */ }
}

async function fetchTranslations(lang: string): Promise<TranslationDict> {
  const res = await fetch(
    `${API_URL}/api/v1/entries/site-translations?status=published&lang=${lang}`,
    { headers: { Authorization: `Bearer ${API_KEY}` } }
  );
  if (!res.ok) return {};

  const entries: any[] = await res.json();
  const dict: TranslationDict = {};

  for (const entry of entries) {
    const c = entry.content || {};
    // key field (original) → value is already overlaid by ?lang=
    const key = c.key || entry.slug;
    const value = c.value;
    if (key && value) dict[key] = value;
  }

  return dict;
}

// ── Provider ──

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(DEFAULT_LANG);
  const [dict, setDict] = useState<TranslationDict>({});

  // Detect initial language
  useEffect(() => {
    const initial = getUrlParam('lang') || getCookie('kiban-lang') || DEFAULT_LANG;
    setLang(initial);
  }, []);

  // Fetch dictionary when lang changes
  useEffect(() => {
    if (lang === DEFAULT_LANG) {
      setDict({});
      return;
    }

    const cached = getCached(lang);
    if (cached) {
      setDict(cached);
      return;
    }

    let cancelled = false;
    fetchTranslations(lang).then((d) => {
      if (!cancelled) {
        setDict(d);
        setCache(lang, d);
      }
    });
    return () => { cancelled = true; };
  }, [lang]);

  // Listen for widget language change events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang) setLang(detail.lang);
    };
    window.addEventListener('kiban-lang-change', handler);
    return () => window.removeEventListener('kiban-lang-change', handler);
  }, []);

  // Update <html lang>
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string, fallback: string): string => {
      if (lang === DEFAULT_LANG) return fallback;
      return dict[key] || fallback;
    },
    [lang, dict]
  );

  return (
    <TranslationContext.Provider value={{ lang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
