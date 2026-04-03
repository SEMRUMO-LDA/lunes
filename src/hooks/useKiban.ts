import { useState, useEffect } from 'react';
import { kibanService } from '../services/kibanClient';

interface UseKibanOptions {
  collectionSlug: string;
  filters?: Record<string, any>;
  autoFetch?: boolean;
}

interface UseKibanResult<T = any> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * React hook for fetching data from Kiban CMS
 *
 * @example
 * ```tsx
 * function BlogList() {
 *   const { data: posts, loading, error } = useKiban({
 *     collectionSlug: 'blog',
 *     filters: { status: 'published' }
 *   });
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {posts?.map(post => (
 *         <article key={post.id}>
 *           <h2>{post.title}</h2>
 *           <p>{post.excerpt}</p>
 *         </article>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useKiban<T = any>({
  collectionSlug,
  filters,
  autoFetch = true,
}: UseKibanOptions): UseKibanResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const entries = await kibanService.getEntries(collectionSlug, filters);
      setData(entries as T[]);
    } catch (err) {
      console.warn(`[Kiban CMS] useKiban failed for ${collectionSlug}:`, err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [collectionSlug, JSON.stringify(filters), autoFetch]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching a single entry by slug
 *
 * @example
 * ```tsx
 * function BlogPost({ slug }: { slug: string }) {
 *   const { data: post, loading, error } = useKibanEntry({
 *     collectionSlug: 'blog',
 *     slug
 *   });
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!post) return <div>Post not found</div>;
 *
 *   return (
 *     <article>
 *       <h1>{post.title}</h1>
 *       <div dangerouslySetInnerHTML={{ __html: post.content }} />
 *     </article>
 *   );
 * }
 * ```
 */
export function useKibanEntry<T = any>(options: {
  collectionSlug: string;
  slug: string;
  autoFetch?: boolean;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(options.autoFetch !== false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const entry = await kibanService.getEntryBySlug(options.collectionSlug, options.slug);
      setData(entry as T);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [options.collectionSlug, options.slug, options.autoFetch]);

  return { data, loading, error, refetch: fetchData };
}
