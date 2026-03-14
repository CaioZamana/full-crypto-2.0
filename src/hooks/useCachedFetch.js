import { useState, useEffect, useRef } from 'react';

// Module-level map deduplicates in-flight requests across all component instances.
// If two components call useCachedFetch with the same key simultaneously, only one
// HTTP request is made; both await the same Promise.
const pendingRequests = {};

/**
 * Fetches data with localStorage caching and stale-while-revalidate semantics.
 *
 * @param {string}   cacheKey  - localStorage key (timestamp stored at `${cacheKey}_ts`)
 * @param {Function} fetcher   - async function that returns the data to cache
 * @param {number}   ttl       - cache lifetime in ms (default: 10 minutes)
 */
export function useCachedFetch(cacheKey, fetcher, ttl = 10 * 60 * 1000) {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(cacheKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep fetcher ref fresh so the effect dep array doesn't need to include it.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // --- Read current cache state ---
      let cached = null;
      try {
        const raw = localStorage.getItem(cacheKey);
        cached = raw ? JSON.parse(raw) : null;
      } catch { /* ignore */ }

      const ts = parseInt(localStorage.getItem(`${cacheKey}_ts`) || '0', 10);
      const isValid = Boolean(ts) && Date.now() - ts < ttl;

      // Cache is fresh — serve it and stop.
      if (cached !== null && isValid) {
        if (!cancelled) setData(cached);
        return;
      }

      // Stale cache — show it immediately while revalidating in the background.
      if (cached !== null && !cancelled) setData(cached);

      // --- Deduplicated fetch ---
      if (!pendingRequests[cacheKey]) {
        pendingRequests[cacheKey] = fetcherRef
          .current()
          .then((result) => {
            try {
              localStorage.setItem(cacheKey, JSON.stringify(result));
              localStorage.setItem(`${cacheKey}_ts`, Date.now().toString());
            } catch { /* quota exceeded — silently skip */ }
            delete pendingRequests[cacheKey];
            return result;
          })
          .catch((err) => {
            delete pendingRequests[cacheKey];
            throw err;
          });
      }

      if (!cancelled) setLoading(true);
      try {
        const result = await pendingRequests[cacheKey];
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [cacheKey, ttl]); // fetcher intentionally omitted — tracked via ref

  return { data, loading, error };
}
