"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react.ts
var react_exports = {};
__export(react_exports, {
  useCollection: () => useCollection,
  useCollections: () => useCollections,
  useEntries: () => useEntries,
  useEntry: () => useEntry
});
module.exports = __toCommonJS(react_exports);
var import_react = require("react");
function useEntries(client, collectionSlug, options) {
  const [data, setData] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
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
  (0, import_react.useEffect)(() => {
    fetchData();
  }, [collectionSlug, JSON.stringify(options)]);
  return { data, loading, error, refetch: fetchData };
}
function useEntry(client, collectionSlug, entrySlug) {
  const [data, setData] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
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
  (0, import_react.useEffect)(() => {
    fetchData();
  }, [collectionSlug, entrySlug]);
  return { data, loading, error, refetch: fetchData };
}
function useCollections(client) {
  const [data, setData] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
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
  (0, import_react.useEffect)(() => {
    fetchData();
  }, []);
  return { data, loading, error, refetch: fetchData };
}
function useCollection(client, slug) {
  const [data, setData] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
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
  (0, import_react.useEffect)(() => {
    fetchData();
  }, [slug]);
  return { data, loading, error, refetch: fetchData };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCollection,
  useCollections,
  useEntries,
  useEntry
});
