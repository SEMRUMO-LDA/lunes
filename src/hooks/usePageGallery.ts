import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  order: number;
}

/**
 * Hook para carregar a galeria de uma página a partir do KibanCMS,
 * com fallback estático.
 *
 * Coleção esperada no CMS: "galerias"
 * Campos no content JSON: { page, image, alt, caption, order }
 */
export function usePageGallery(page: string, fallback: string[] = []) {
  const fallbackImages: GalleryImage[] = fallback.map((src, i) => ({
    src,
    alt: '',
    caption: '',
    order: i + 1,
  }));

  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [isFromCMS, setIsFromCMS] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        const entries = (await kibanService.getEntries('galerias', {
          status: 'published',
        })) as any[];

        if (cancelled || !entries || entries.length === 0) {
          setLoading(false);
          return;
        }

        const isImageUrl = (v: any) =>
          typeof v === 'string' &&
          (/\.(webp|png|jpe?g|gif|svg|avif)(\?.*)?$/i.test(v) ||
            /\/(media|storage)\//.test(v));

        const filtered = entries.filter((entry: any) => {
          const c = entry.content || {};
          if (c.page === page) return true;
          // Fallback: no explicit page, but slug starts with the page id
          if (!c.page && typeof entry.slug === 'string' && entry.slug.startsWith(`${page}-`)) {
            return true;
          }
          return false;
        });

        if (filtered.length === 0) {
          setLoading(false);
          return;
        }

        const mapped: GalleryImage[] = filtered
          .map((entry: any): GalleryImage | null => {
            const c = entry.content || {};

            // Find the image: prefer c.image, otherwise scan field-* values for an image URL
            let src: string = c.image || entry.featured_image || '';
            if (!src) {
              const fieldValues = Object.keys(c)
                .filter((k) => k.startsWith('field-'))
                .sort()
                .map((k) => c[k]);
              src = fieldValues.find(isImageUrl) || '';
            }
            if (!src) return null;

            const order = typeof c.order === 'number' ? c.order : 999;
            return {
              src,
              alt: c.alt || entry.title || '',
              caption: c.caption || '',
              order,
            };
          })
          .filter((x): x is GalleryImage => x !== null)
          .sort((a, b) => a.order - b.order);

        if (!cancelled && mapped.length > 0) {
          console.info(
            `[Kiban CMS] Loaded ${mapped.length} gallery images for page "${page}".`,
          );
          setImages(mapped);
          setIsFromCMS(true);
        }
      } catch (err) {
        console.warn(
          `[Kiban CMS] Failed to fetch gallery for "${page}", using static fallback:`,
          err,
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGallery();
    return () => {
      cancelled = true;
    };
  }, [page]);

  return { images, isFromCMS, loading };
}
