import { KibanClient } from '@kiban/client';

// Initialize Kiban Client — only if credentials are available
const apiUrl = process.env.NEXT_PUBLIC_KIBAN_API_URL;
const apiKey = process.env.NEXT_PUBLIC_KIBAN_API_KEY;

const kibanClient = apiUrl && apiKey
  ? new KibanClient({ url: apiUrl, apiKey })
  : null;

export default kibanClient;

// Helper to wrap promises with a timeout
const FETCH_TIMEOUT_MS = 2000; // 2 seconds

const wrapWithTimeout = <T>(promise: Promise<T>, operationName: string): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Kiban CMS Timeout: ${operationName} exceeded ${FETCH_TIMEOUT_MS}ms`)), FETCH_TIMEOUT_MS)
    )
  ]);
};

// Type-safe helper functions for common operations
export const kibanService = {
  // Get all published entries from a collection
  async getPublishedEntries(collectionSlug: string) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    try {
      return await wrapWithTimeout(
        kibanClient.getEntries(collectionSlug, { status: 'published' }),
        `getPublishedEntries(${collectionSlug})`
      );
    } catch (error) {
      console.warn(`[Kiban Service] Fallback triggered for ${collectionSlug}:`, error);
      throw error;
    }
  },

  // Get a single entry by slug
  async getEntryBySlug(collectionSlug: string, slug: string) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    try {
      const entries = await wrapWithTimeout(
        kibanClient.getEntries(collectionSlug, { slug }),
        `getEntryBySlug(${collectionSlug}, ${slug})`
      ) as any[];
      return entries[0] || null;
    } catch (error) {
      console.warn(`[Kiban Service] Fallback triggered for ${collectionSlug}/${slug}:`, error);
      throw error;
    }
  },

  // Get entries with custom filters
  async getEntries(collectionSlug: string, filters?: Record<string, any>) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    try {
      return await wrapWithTimeout(
        kibanClient.getEntries(collectionSlug, filters),
        `getEntries(${collectionSlug})`
      );
    } catch (error) {
      console.warn(`[Kiban Service] Fallback triggered for ${collectionSlug}:`, error);
      throw error;
    }
  },

  // Create a new entry
  async createEntry(collectionSlug: string, data: Record<string, any>) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    return await kibanClient.createEntry(collectionSlug, data);
  },

  // Update an entry
  async updateEntry(collectionSlug: string, entryId: string, data: Record<string, any>) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    return await kibanClient.updateEntry(collectionSlug, entryId, data);
  },

  // Delete an entry
  async deleteEntry(collectionSlug: string, entryId: string) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    return await kibanClient.deleteEntry(collectionSlug, entryId);
  },

  // Upload media
  async uploadMedia(file: File) {
    if (!kibanClient) throw new Error('Kiban CMS not configured');
    return await kibanClient.uploadMedia(file);
  },
};
