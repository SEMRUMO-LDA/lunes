import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

export interface Tour {
  title: string;
  slug: string;
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
}

// Fallback estático — dados atuais do site
const STATIC_TOURS: Tour[] = [
  {
    title: "Costa de Portimão à Sra. da Rocha",
    slug: "costa-portimao",
    image: "/images/tours/explore-services-1.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Navegamos entre grutas, falésias douradas e praias icónicas. Contamos histórias, exploramos recantos únicos e paramos para mergulho na inesquecível Praia da Marinha.",
    timeSlots: ["10:00", "14:00"]
  },
  {
    title: "Rio Arade",
    slug: "rio-arade",
    image: "/images/tours/explore-services-2.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Um passeio calmo, perfeito para quem procura natureza, biodiversidade e silêncio. Aqui o tempo abranda e a ligação ao lugar acontece naturalmente.",
    timeSlots: ["10:00", "15:00"]
  },
  {
    title: "Sunrise & Sunset",
    slug: "sunrise-sunset",
    image: "/images/tours/explore-services-3.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    priceAdult: "40€",
    priceChild: "20€",
    childAge: "2-10 anos",
    description: "Ao nascer ou ao pôr do sol, a luz transforma tudo. As cores, o mar e a atmosfera criam um momento íntimo e memorável, daqueles que se guardam.",
    timeSlots: ["06:30", "18:00"]
  },
  {
    title: "Passeios Privados",
    slug: "passeios-privados",
    image: "/images/tours/explore-services-4.webp",
    duration: "2 horas",
    rating: 5,
    capacity: "Até 17 pessoas",
    priceTotal: "550€",
    priceAdult: "",
    priceChild: "",
    childAge: "",
    description: "Uma experiência feita à sua medida, no seu ritmo. Navegue com quem escolhe, descubra a costa com calma e desfrute de uma bebida de boas-vindas a bordo.",
    timeSlots: ["10:00", "14:00", "18:00"]
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

        const fallbackImages = [
          '/images/tours/explore-services-1.webp',
          '/images/tours/explore-services-2.webp',
          '/images/tours/explore-services-3.webp',
          '/images/tours/explore-services-4.webp',
        ];

        const mapped: Tour[] = sorted.map((entry: any, idx: number) => ({
          title: entry.content?.title || entry.title || '',
          slug: entry.slug || '',
          description: entry.content?.description || entry.excerpt || '',
          duration: entry.content?.duration || '',
          rating: entry.content?.rating || 5,
          capacity: entry.content?.capacity || '',
          priceTotal: entry.content?.price || entry.content?.price_adult ? `${entry.content.price_adult}€` : '',
          priceAdult: entry.content?.price_adult ? `${entry.content.price_adult}€` : '',
          priceChild: entry.content?.price_child ? `${entry.content.price_child}€` : '',
          childAge: entry.content?.child_age_range || '2-10 anos',
          image: fallbackImages[idx] || fallbackImages[0],
          timeSlots: entry.content?.time_slots || [],
        }));

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
