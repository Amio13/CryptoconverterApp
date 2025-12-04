// import { useState, useEffect } from 'react';
// import type { CoinListItem } from '../interfaces/CoinListItem';

// /**
//  * Fetches the entire list of supported CoinGecko assets (coins + fiat)
//  * and returns a cleaned, normalized list for searchable dropdowns.
//  */
// export const useCoinGeckoSearch = () => {
//     const [list, setList] = useState<CoinListItem[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const API_URL =
//             'https://api.coingecko.com/api/v3/coins/list?include_platform=false';

//         const fetchList = async () => {
//             setIsLoading(true);
//             setError(null);

//             try {
//                 const response = await fetch(API_URL);

//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch CoinGecko list: ${response.status}`);
//                 }

//                 const rawData: unknown = await response.json();

//                 if (!Array.isArray(rawData)) {
//                     throw new Error('Invalid response format from CoinGecko.');
//                 }

//                 const data = rawData as CoinListItem[];

//                 // --- Manually injected fiat currencies ---
//                 const fiatCurrencies: CoinListItem[] = [
//                     { id: 'united-states-dollar', symbol: 'usd', name: 'US Dollar' },
//                     { id: 'euro', symbol: 'eur', name: 'Euro' },
//                     { id: 'british-pound', symbol: 'gbp', name: 'British Pound' },
//                     { id: 'japanese-yen', symbol: 'jpy', name: 'Japanese Yen' },
//                 ];

//                 // --- Normalize, clean, and combine lists ---
//                 const normalized = data
//                     .map(item => ({
//                         id: item.id?.trim() || '',
//                         symbol: item.symbol?.trim().toLowerCase() || '',
//                         name: item.name?.trim() || '',
//                     }))
//                     .filter(item => item.id && item.symbol);

//                 const combined = [...normalized, ...fiatCurrencies];

//                 // --- Deduplicate by symbol (or id depending on preference) ---
//                 const dedupMap = new Map<string, CoinListItem>();
//                 combined.forEach(item => {
//                     if (!dedupMap.has(item.symbol)) {
//                         dedupMap.set(item.symbol, item);
//                     }
//                 });

//                 const cleanedList = Array.from(dedupMap.values()).sort((a, b) =>
//                     a.symbol.localeCompare(b.symbol)
//                 );

//                 setList(cleanedList);
//             } catch (err: any) {
//                 console.error('CoinGecko List Fetch Error:', err);
//                 setError(err?.message || 'Unknown error occurred.');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchList();
//     }, []); // run once

// //      const useCoinList = () =>
// //   useQuery({
// //     queryKey: ['coinList'],
// //     queryFn: fetchCoinList,
// //     staleTime: Infinity, // never refetch unless manually invalidated
// //     cacheTime: Infinity, // keep in cache forever
// //   });

//     return { coinList: list, isLoadingList: isLoading, listError: error };
// };













import { useQuery } from '@tanstack/react-query';
import type { CoinListItem } from '../interfaces/CoinListItem';

export const useCoinGeckoSearch = () => {
  return useQuery<CoinListItem[], Error>({
    queryKey: ['coinList'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
      );
      if (!response.ok) throw new Error('Failed to fetch CoinGecko list');
      const data = (await response.json()) as CoinListItem[];

      const fiatCurrencies: CoinListItem[] = [
        { id: 'united-states-dollar', symbol: 'usd', name: 'US Dollar' },
        { id: 'euro', symbol: 'eur', name: 'Euro' },
        { id: 'british-pound', symbol: 'gbp', name: 'British Pound' },
        { id: 'japanese-yen', symbol: 'jpy', name: 'Japanese Yen' },
      ];

      const normalized = data
        .map((item) => ({
          id: item.id?.trim() || '',
          symbol: item.symbol?.trim().toLowerCase() || '',
          name: item.name?.trim() || '',
        }))
        .filter((item) => item.id && item.symbol);

      const combined = [...normalized, ...fiatCurrencies];

      const dedupMap = new Map<string, CoinListItem>();
      combined.forEach((item) => {
        if (!dedupMap.has(item.symbol)) dedupMap.set(item.symbol, item);
      });

      return Array.from(dedupMap.values()).sort((a, b) =>
        a.symbol.localeCompare(b.symbol)
      );
    },
    staleTime: Infinity, // never refetch unless invalidated
  
  });
};
