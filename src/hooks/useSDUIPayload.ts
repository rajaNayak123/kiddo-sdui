import { useState, useEffect, useCallback } from 'react';
import { HomepagePayload, AnyBlock } from '../types';
import { homepagePayload } from '../data/homepagePayload';

interface UseSDUIPayloadResult {
  payload: HomepagePayload | null;
  blocks: AnyBlock[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useSDUIPayload(): UseSDUIPayloadResult {
  const [payload, setPayload] = useState<HomepagePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((r) => setTimeout(r, 400));
      if (!homepagePayload || !Array.isArray(homepagePayload.blocks)) {
        throw new Error('Invalid payload: missing blocks array');
      }

      setPayload(homepagePayload);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('[useSDUIPayload] Failed to load payload:', msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    payload,
    blocks: payload?.blocks ?? [],
    isLoading,
    error,
    refresh: load,
  };
}
