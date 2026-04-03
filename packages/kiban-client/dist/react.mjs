// src/react.ts
import { useState, useEffect } from "react";
function useEntries(client, collectionSlug, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const entries = await client.getEntries(collectionSlug, options);
      setData(entries);
    } catch (err) {
      setError(err.message || "Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [collectionSlug, JSON.stringify(options)]);
  return { data, loading, error, refetch: fetchData };
}
function useEntry(client, collectionSlug, entrySlug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const entry = await client.getEntry(collectionSlug, entrySlug);
      setData(entry);
    } catch (err) {
      setError(err.message || "Failed to fetch entry");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [collectionSlug, entrySlug]);
  return { data, loading, error, refetch: fetchData };
}
function useCollections(client) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const collections = await client.getCollections();
      setData(collections);
    } catch (err) {
      setError(err.message || "Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error, refetch: fetchData };
}
function useCollection(client, slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const collection = await client.getCollection(slug);
      setData(collection);
    } catch (err) {
      setError(err.message || "Failed to fetch collection");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [slug]);
  return { data, loading, error, refetch: fetchData };
}
export {
  useCollection,
  useCollections,
  useEntries,
  useEntry
};
