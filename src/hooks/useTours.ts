import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

export interface Tour {
  title: string;
  description: string;
  duration: string;
  rating: number;
  capacity: string;
  priceTotal: string;
  image: string;
}

// Fallback estático — dados atuais do site
const STATIC_TOURS: Tour[] = [
  {
    title: "Costa de Portimão à Sra. da Rocha",
    image: "/tours-coast.jpg",
    duration: "150 Min",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    description: "Navegamos entre grutas, falésias douradas e praias icónicas. Contamos histórias, exploramos recantos únicos e paramos para mergulho na inesquecível Praia da Marinha."
  },
  {
    title: "Rio Arade",
    image: "/tours-river.jpg",
    duration: "120 Min",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    description: "Um passeio calmo, perfeito para quem procura natureza, biodiversidade e silêncio. Aqui o tempo abranda e a ligação ao lugar acontece naturalmente."
  },
  {
    title: "Sunrise & Sunset",
    image: "/tours-sunset.jpg",
    duration: "120 Min",
    rating: 5,
    capacity: "Por passageiro",
    priceTotal: "40€",
    description: "Ao nascer ou ao pôr do sol, a luz transforma tudo. As cores, o mar e a atmosfera criam um momento íntimo e memorável, daqueles que se guardam."
  },
  {
    title: "Passeios Privados",
    image: "/private-tour.jpg",
    duration: "Flexível",
    rating: 5,
    capacity: "Até 17 pessoas",
    priceTotal: "550€",
    description: "Uma experiência feita à sua medida, no seu ritmo. Navegue com quem escolhe, descubra a costa com calma e desfrute de uma bebida de boas-vindas a bordo."
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

        const mapped: Tour[] = sorted.map((entry: any) => ({
          title: entry.content?.title || entry.title || '',
          description: entry.content?.description || entry.excerpt || '',
          duration: entry.content?.duration || '',
          rating: entry.content?.rating || 5,
          capacity: entry.content?.capacity || '',
          priceTotal: entry.content?.price || '',
          image: entry.content?.image || entry.featured_image || '',
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
