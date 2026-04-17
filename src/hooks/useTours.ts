import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

function formatDurationMinutes(mins: number): string {
  if (!mins || mins <= 0) return '';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h${m}`;
  if (h) return h === 1 ? '1 hora' : `${h} horas`;
  return `${m} min`;
}

export interface Tour {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  duration: string;
  rating: number;
  capacity: string;
  priceTotal: string;
  priceAdult: string;
  priceChild: string;
  childAge: string;
  image: string;
  timeSlots: string[];
  digitalTicket: boolean;
  instantConfirmation: boolean;
}

// Fallback estático — dados atuais do site
const STATIC_TOURS: Tour[] = [
  {
    title: "Costa de Portimão à Sra. da Rocha",
    slug: "costa-portimao",
    subtitle: "",
    image: "/images/tours/explore-services-1.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Navegamos entre grutas, falésias douradas e praias icónicas. Contamos histórias, exploramos recantos únicos e paramos para mergulho na inesquecível Praia da Marinha.",
    timeSlots: ["10:00", "14:00"],
    digitalTicket: true,
    instantConfirmation: true,
  },
  {
    title: "Rio Arade",
    slug: "rio-arade",
    subtitle: "",
    image: "/images/tours/explore-services-2.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Um passeio calmo, perfeito para quem procura natureza, biodiversidade e silêncio. Aqui o tempo abranda e a ligação ao lugar acontece naturalmente.",
    timeSlots: ["10:00", "15:00"],
    digitalTicket: true,
    instantConfirmation: true,
  },
  {
    title: "Sunrise & Sunset",
    slug: "sunrise-sunset",
    subtitle: "",
    image: "/images/tours/explore-services-3.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Ao nascer ou ao pôr do sol, a luz transforma tudo. As cores, o mar e a atmosfera criam um momento íntimo e memorável, daqueles que se guardam.",
    timeSlots: ["06:30", "18:00"],
    digitalTicket: true,
    instantConfirmation: true,
  },
  {
    title: "Passeios Privados",
    slug: "passeios-privados",
    subtitle: "",
    image: "/images/tours/explore-services-4.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Até 17 pessoas",
    priceTotal: "550€",
    priceAdult: "",
    priceChild: "",
    childAge: "",
    description: "Uma experiência feita à sua medida, no seu ritmo. Navegue com quem escolhe, descubra a costa com calma e desfrute de uma bebida de boas-vindas a bordo.",
    timeSlots: ["10:00", "14:00", "18:00"],
    digitalTicket: true,
    instantConfirmation: true,
  }
];

/**
 * Hook para carregar tours do KibanCMS com fallback estático.
 * 
 * Coleção esperada no CMS: "tours"
 * Campos no content JSON: { title, description, duration, price, capacity, rating, image, order }
 */
export function useTours() {
  const [tours, setTours] = useState<Tour[]>(STATIC_TOURS);
  const [isFromCMS, setIsFromCMS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTours() {
      try {
        const entries = await kibanService.getPublishedEntries('tours') as any[];

        if (cancelled || !entries || entries.length === 0) {
          setLoading(false);
          return;
        }

        // Ordenar pelo campo "order" no content
        const sorted = [...entries].sort((a: any, b: any) => {
          const orderA = a.content?.order ?? 999;
          const orderB = b.content?.order ?? 999;
          return orderA - orderB;
        });

        // No positional fallback for images — it produced mismatches when the CMS
        // order didn't match the curated images' order. Empty cover_image now falls
        // back to a neutral placeholder, pushing the operator to upload the right
        // image for each tour in the CMS.
        const PLACEHOLDER = '/images/tour-placeholder.svg';

        const mapped: Tour[] = sorted.map((entry: any) => {
          const c = entry.content || {};
          // Tours addon v1.0.0 used `time_slots` + `max_capacity`; v1.1.0 renamed
          // to `fixed_slots` + `capacity` and added `short_description`, `cover_image`,
          // `duration_minutes`. Read both shapes so the form works regardless of
          // which schema version the tour was edited under in kibanCMS.
          const slots: string[] = Array.isArray(c.fixed_slots) && c.fixed_slots.length
            ? c.fixed_slots
            : (Array.isArray(c.time_slots) ? c.time_slots : []);
          const duration = c.duration
            || (c.duration_minutes ? formatDurationMinutes(c.duration_minutes) : '');
          const capacityStr = c.capacity != null ? String(c.capacity)
            : c.max_capacity != null ? String(c.max_capacity)
            : '';
          return {
            title: c.title || entry.title || '',
            slug: entry.slug || '',
            subtitle: c.subtitle || '',
            description: c.full_description || c.short_description || c.description || entry.excerpt || '',
            duration,
            rating: c.rating || 5,
            capacity: capacityStr,
            priceTotal: c.price || (c.price_adult ? `${c.price_adult}€` : ''),
            priceAdult: c.price_adult ? `${c.price_adult}€` : '',
            priceChild: c.price_child ? `${c.price_child}€` : '',
            childAge: c.child_age_range || '2-10 anos',
            image: c.cover_image || entry.featured_image || PLACEHOLDER,
            timeSlots: slots,
            digitalTicket: c.is_digital_ticket === true,
            instantConfirmation: c.instant_confirmation === true,
          };
        });

        if (!cancelled && mapped.length > 0) {
          console.info(`[Kiban CMS] Successfully loaded ${mapped.length} tours.`);
          setTours(mapped);
          setIsFromCMS(true);
        }
      } catch (err) {
        console.warn('[Kiban CMS] Failed to fetch tours, using static fallback:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTours();
    return () => { cancelled = true; };
  }, []);

  return { tours, isFromCMS, loading };
}
