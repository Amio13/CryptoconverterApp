import { useEffect, useMemo, useState } from 'react';
import type { CurrencyID } from '../types/types';
import type { RatesData } from '../interfaces/RatesData';


export const useCoinGeckoRates = (selectedIDs: CurrencyID[]) => {
  const [rates, setRates] = useState<RatesData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a stable, deduped list of IDs and a comma-separated string for dependencies.
  const uniqueIDs = useMemo(
    () => Array.from(new Set((selectedIDs || []).filter(Boolean).map(id => String(id).trim()).filter(Boolean))),
    [selectedIDs]
  );
  const idsString = useMemo(() => uniqueIDs.join(','), [uniqueIDs]);

  useEffect(() => {
    
    if (!idsString) {
      setRates({});
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);

      const API_URL = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(idsString)}&vs_currencies=usd`;

      try {
        const res = await fetch(API_URL, { signal });

        // Network-level check
        if (!res.ok) {
          throw new Error(`CoinGecko price fetch failed: ${res.status} ${res.statusText}`);
        }

        // Parse as unknown and validate
        const raw: unknown = await res.json();

        // Basic runtime validation: expect an object (Record<string, { usd: number }>)
        if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
          throw new Error('Unexpected response format from CoinGecko (expected object).');
        }

        const parsed = raw as RatesData;

        //  further validate that each key has a number /usd
        const validated: RatesData = {};
        for (const key of Object.keys(parsed)) {
          const val = (parsed as any)[key];
          if (val && typeof val === 'object' && typeof val.usd === 'number') {
            validated[key] = { usd: val.usd };
          } else {
          
            console.warn(`CoinGecko: unexpected rate shape for "${key}"`, val);
          }
        }

        setRates(validated);
      } catch (err: any) {
        
        if (err?.name === 'AbortError') {
          return;
        }
        console.error('CoinGecko Price Fetch Error:', err);
        setError(err?.message ?? 'Failed to fetch rates.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();

   
    return () => {
      controller.abort();
    };
  }, [idsString]); 

  return { usdRates: rates, isLoadingRates: isLoading, ratesError: error };
};
