import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

export interface Partner {
  name: string;
  logo: string;
  description: string;
  url: string;
}

const STATIC_PARTNERS: Partner[] = [
  { name: 'Parceria Desportiva', logo: '', description: 'Em breve...', url: '' },
  { name: 'Parceria Náutica', logo: '', description: 'Em breve...', url: '' },
  { name: 'Parceria Gastronómica', logo: '', description: 'Em breve...', url: '' },
  { name: 'Parceria Turismo', logo: '', description: 'Em breve...', url: '' },
];

/**
 * Hook para carregar parceiros do KibanCMS com fallback estático.
 *
 * Coleção esperada no CMS: "parceiros"
 * Campos no content JSON: { name, logo, description, url, order }
 */
export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>(STATIC_PARTNERS);
  const [isFromCMS, setIsFromCMS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPartners() {
      try {
        const entries = await kibanService.getPublishedEntries('parceiros') as any[];

        if (cancelled || !entries || entries.length === 0) {
          setLoading(false);
          return;
        }

        const sorted = [...entries].sort((a: any, b: any) => {
          const orderA = a.content?.order ?? 999;
          const orderB = b.content?.order ?? 999;
          return orderA - orderB;
        });

        const isImageUrl = (v: any) =>
          typeof v === 'string' &&
          (/\.(webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(v) || /\/(media|storage)\//.test(v));
        const isLink = (v: any) => typeof v === 'string' && /^https?:\/\//i.test(v);

        const mapped: Partner[] = sorted.map((entry: any) => {
          const c = entry.content || {};
          const fieldValues = Object.keys(c)
            .filter((k) => k.startsWith('field-'))
            .sort()
            .map((k) => c[k]);

          // Infer logo/url/description from raw field values by content type
          let inferredLogo = '';
          let inferredUrl = '';
          const textFields: string[] = [];
          for (const v of fieldValues) {
            if (!v) continue;
            if (!inferredLogo && isImageUrl(v)) {
              inferredLogo = v;
            } else if (!inferredUrl && isLink(v)) {
              inferredUrl = v;
            } else {
              textFields.push(String(v));
            }
          }

          const name = c.name || entry.title || textFields[0] || '';
          const description =
            c.description ||
            c.short_description ||
            textFields.find((t) => t !== name) ||
            (textFields.length > 1 ? textFields[textFields.length - 1] : '') ||
            entry.excerpt ||
            '';

          return {
            name,
            logo: c.logo || inferredLogo || entry.featured_image || '',
            description,
            url: c.url || c.website || inferredUrl || '',
          };
        });

        if (!cancelled && mapped.length > 0) {
          console.info(`[Kiban CMS] Successfully loaded ${mapped.length} partners.`);
          setPartners(mapped);
          setIsFromCMS(true);
        }
      } catch (err) {
        console.warn('[Kiban CMS] Failed to fetch partners, using static fallback:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPartners();
    return () => {
      cancelled = true;
    };
  }, []);

  return { partners, isFromCMS, loading };
}
