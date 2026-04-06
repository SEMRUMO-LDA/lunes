import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

// Fallback estático — garantia de conteúdo caso o CMS esteja offline
const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sofia Martins",
    role: "LUNES MOVE Member",
    quote: "A LUNES não é apenas um ginásio, é onde encontro o meu equilíbrio semanal. O ambiente é acolhedor e os treinos são desafiantes mas respeitam o meu ritmo.",
    image: "https://i.pravatar.cc/150?u=sofia"
  },
  {
    name: "Ricardo Silva",
    role: "LUNES EXPLORE Guest",
    quote: "A expedição náutica foi transformadora. Estar em alto mar, com o silêncio curado da LUNES, permitiu-me reconectar com o que realmente importa.",
    image: "https://i.pravatar.cc/150?u=ricardo"
  },
  {
    name: "Ana Oliveira",
    role: "LUNES STAY Resident",
    quote: "Ficar no alojamento da LUNES foi como respirar pela primeira vez em meses. O design minimalista e a luz natural criam uma paz indescritível.",
    image: "https://i.pravatar.cc/150?u=ana"
  }
];

/**
 * Hook para carregar testemunhos do KibanCMS com fallback estático.
 * 
 * Coleção esperada no CMS: "testimonials"
 * Campos no content JSON: { name, role, quote, image }
 * 
 * O site nunca fica em branco — usa dados estáticos enquanto carrega
 * ou se o CMS não estiver disponível.
 */
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS);
  const [isFromCMS, setIsFromCMS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTestimonials() {
      try {
        const entries = await kibanService.getPublishedEntries('testimonials') as any[];

        if (cancelled || !entries || entries.length === 0) {
          setLoading(false);
          return;
        }

        const mapped: Testimonial[] = entries.map((entry: any) => {
          const c = entry.content || {};
          // Support both named fields and dynamic Kiban field keys (field-xxx-N)
          const fieldValues = Object.keys(c)
            .filter(k => k.startsWith('field-'))
            .sort()
            .map(k => c[k]);

          return {
            name: c.name || fieldValues[0] || entry.title || '',
            role: c.role || fieldValues[1] || entry.excerpt || '',
            quote: c.quote || fieldValues[3] || fieldValues[2] || '',
            image: c.image || entry.featured_image || 'https://i.pravatar.cc/150',
          };
        });

        if (!cancelled && mapped.length > 0) {
          console.info(`[Kiban CMS] Successfully loaded ${mapped.length} testimonials.`);
          setTestimonials(mapped);
          setIsFromCMS(true);
        }
      } catch (err) {
        console.warn('[Kiban CMS] Failed to fetch testimonials, using static fallback:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTestimonials();
    return () => { cancelled = true; };
  }, []);

  return { testimonials, isFromCMS, loading };
}
