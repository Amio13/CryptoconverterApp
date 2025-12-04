
import { useMemo, useCallback } from "react";
import { useCoinGeckoSearch } from "../base/hooks/useCoinGeckoSearch";
import CurrencySelect from "./CurrencySelect";
import { useCoinGeckoRates } from "../base/hooks/useCoingeckoRates";
import {useConversion} from "../base/hooks/useConversion"
import { useConverter } from "../Context/ConverterContext";

export default function App() {
  
const { data: coinList = [], isLoading: isLoadingList, error: listError } = useCoinGeckoSearch();
  

//context to persist 
 const { amount, setAmount, fromCurrency, setFromCurrency, toCurrency, setToCurrency } = useConverter();

  // Selected IDs for rates 
  const selectedIDs = useMemo(() => [fromCurrency, toCurrency], [fromCurrency, toCurrency]);

  //  Fetch rates only if user has entered an amount 
  const { usdRates, isLoadingRates, ratesError } = useCoinGeckoRates(selectedIDs,);

  // Calculate conversion using your custom hook 
  const convertedAmount = useConversion(amount, fromCurrency, toCurrency, usdRates);

  


  //  Swap currencies 
  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  
const displayRate = useMemo(() => {
  if (isLoadingRates || Object.keys(usdRates).length < 2) return '0.00000000';
  
  const rate = useConversion(1, fromCurrency, toCurrency, usdRates);
  return rate.toFixed(8).replace(/\.?0+$/, '');
}, [fromCurrency, toCurrency, usdRates, isLoadingRates]);


  // Combined state checks 
  const isReady = !isLoadingList && !isLoadingRates && !listError && !ratesError;
  const errorState = listError || ratesError;

  // Display symbols 
  const fromSymbol = coinList.find(c => c.id === fromCurrency)?.symbol.toUpperCase() || fromCurrency.toUpperCase();
  const toSymbol = coinList.find(c => c.id === toCurrency)?.symbol.toUpperCase() || toCurrency.toUpperCase();

  return (
    <div className="min-h-screen w-full bg-yellow-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">CryptoConverter App</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time data from CoinGecko. Search any coin!
          </p>
        </header>

        
        {(isLoadingList || isLoadingRates) && (
          <div className="text-center p-4 bg-yellow-100 dark:bg-gray-700 rounded-xl mb-6 text-yellow-700 dark:text-yellow-400 font-medium">
            Fetching live data...
          </div>
        )}
        {errorState && (
          <div className="text-center p-4 bg-red-100 dark:bg-red-700 rounded-xl mb-6 text-red-700 dark:text-red-300 font-medium">
            Error fetching data: {String(errorState)}
          </div>
        )}

        <div className="space-y-6">
          
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Amount to Convert
            </label>
            <input
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="w-full p-4 text-2xl font-mono text-slate-900 dark:text-white bg-white dark:bg-gray-700 border-2 border-yellow-200 dark:border-gray-600 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 ease-in-out"
              min="0"
            />
          </div>

         
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 relative">
            <CurrencySelect
              label="From"
              id={fromCurrency}
              setID={setFromCurrency}
              coinList={coinList}
              isLoading={isLoadingList}
            />

            <button
              onClick={handleSwap}
              className="p-3 bg-yellow-500 dark:bg-yellow-400 cursor-pointer hover:bg-yellow-300 dark:hover:bg-yellow-300 text-white dark:text-gray-900 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 border-4 border-white dark:border-gray-800 self-center md:self-auto"
              aria-label="Swap Currencies"
            >
              ⇆
            </button>

            <CurrencySelect
              label="To"
              id={toCurrency}
              setID={setToCurrency}
              coinList={coinList}
              isLoading={isLoadingList}
            />
          </div>
        </div>

        
        {isReady && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">Converted Result</h2>
            <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-2xl border border-yellow-200 dark:border-gray-600">
              <div className="text-lg text-gray-600 dark:text-gray-300">
                {amount ?? 0} {fromSymbol} equals:
              </div>
              <div className="mt-2 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-yellow-800 dark:text-yellow-400 font-mono">
                  {convertedAmount.toFixed(8).replace(/\.?0+$/, "")}
                </span>
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{toSymbol}</span>
                    </div>
                   <p className="text-xs text-yellow-500 dark:text-yellow-300 mt-2">
                        Exchange Rate: 1 {fromSymbol} ≈ {displayRate} {toSymbol}                     </p>
               </div>
            </div>
         )}
    </div> </div>



    );
}




























// import { useCallback, useMemo, useState } from "react";

// // NEW IMPORTS for dynamic data and logic
// import { useConversion } from "../base/hooks/useConversion";
// import { useCoinGeckoSearch } from "../base/hooks/useCoinGeckoSearch";
// import { useCoinGeckoRates } from "../base/hooks/useCoingeckoRates";
// import type { CurrencyID } from "../base/types/types"; 

// // Update import path for the new searchable component
// import CurrencySelect from "./CurrencySelect"; 
// import type { CoinListItem } from "../base/interfaces/CoinListItem";


// export default function App() {

//     // --- State and Initial IDs (using CoinGecko IDs) ---
//     const [amount, setAmount] = useState<number | undefined>(); // Default to 1 for initial load
//     // State is now the flexible CurrencyID string
//     const [fromCurrency, setFromCurrency] = useState<CurrencyID>('united-states-dollar');
//     const [toCurrency, setToCurrency] = useState<CurrencyID>('bitcoin');

//     // --- Data Fetching ---
    
//     // 1. Fetch the complete list of coins for the dropdowns
//     const { coinList, isLoadingList, listError } = useCoinGeckoSearch();
    
//     // 2. Fetch the rates for the two selected currencies
//     const selectedIDs = useMemo(() => [fromCurrency, toCurrency], [fromCurrency, toCurrency]);
//     const { usdRates, isLoadingRates, ratesError } = useCoinGeckoRates(selectedIDs);

//     // --- Logic & Memoization ---

//     // Function to find currency details (name/symbol) from the full list
//     const findCurrencyDetails = useCallback((id: CurrencyID): CoinListItem | undefined => {
//         return coinList.find(c => c.id === id);
//     }, [coinList]);

//     // Use useMemo to recalculate the converted result only when dependencies change
//     const convertedAmount = useMemo(() => {
//         // Guard clause: Don't calculate if rates are still loading or unavailable
//         if (isLoadingRates || Object.keys(usdRates).length < 2) return 0;

//         return useConversion(amount, fromCurrency, toCurrency, usdRates);
//     }, [amount, fromCurrency, toCurrency, usdRates, isLoadingRates]);

//     // Format the converted amount dynamically
//     const formattedResult = useMemo(() => {
//         if (!convertedAmount) return '0.00';
        
//         // Check if the target is likely crypto by symbol for high precision
//         const toCurrencyDetails = findCurrencyDetails(toCurrency);
//         const cryptoSymbols = ['btc', 'eth', 'ltc', 'ada', 'sol', 'bnb', 'xrp', 'doge'];
//         const isCryptoSymbol = cryptoSymbols.includes(toCurrencyDetails?.symbol.toLowerCase() || '');

//         const decimals = isCryptoSymbol ? 8 : 2;
//         return convertedAmount.toFixed(decimals).replace(/\.?0+$/, ''); // Remove trailing zeros
//     }, [convertedAmount, toCurrency, findCurrencyDetails]);

//     // Calculate the 1-unit exchange rate for display
//     const displayRate = useMemo(() => {
//         if (isLoadingRates || Object.keys(usdRates).length < 2) return '0.00000000';
        
//         const rate = useConversion(1, fromCurrency, toCurrency, usdRates);
//         return rate.toFixed(8).replace(/\.?0+$/, '');
//     }, [fromCurrency, toCurrency, usdRates, isLoadingRates]);


//     // Function to swap the source and target currencies
//     const handleSwap = useCallback(() => {
//         setFromCurrency(toCurrency);
//         setToCurrency(fromCurrency);
//     }, [fromCurrency, toCurrency]);

//     // Combined loading and error state
//     const isReady = !isLoadingList && !isLoadingRates && !listError && !ratesError;
//     const errorState = listError || ratesError;
    
//     // Get display symbols using the full coin list
//     const fromSymbol = findCurrencyDetails(fromCurrency)?.symbol.toUpperCase() || fromCurrency.toUpperCase();
//     const toSymbol = findCurrencyDetails(toCurrency)?.symbol.toUpperCase() || toCurrency.toUpperCase();


//     //Dark mode

    

//     return (
      
    
//        <div className="min-h-screen w-full bg-yellow-50 dark:bg-gray-900 flex items-center justify-center p-4">
//     <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
//         <header className="text-center mb-8">
//             <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center">
//                  CryptoConverter App
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 Real-time data from CoinGecko. Search any coin!
//             </p>
//         </header>
        
//         {/* Global Loading/Error State */}
//         {(isLoadingList || isLoadingRates) && (
//             <div className="text-center p-4 bg-yellow-100 dark:bg-gray-700 rounded-xl mb-6 text-yellow-700 dark:text-yellow-400 font-medium">
//                 Fetching live data...
//             </div>
//         )}
//         {errorState && (
//             <div className="text-center p-4 bg-red-100 dark:bg-red-700 rounded-xl mb-6 text-red-700 dark:text-red-300 font-medium">
//                 Error fetching data: {errorState}
//             </div>
//         )}

//         <div className="space-y-6">
//             {/* Amount Input */}
//             <div className="flex flex-col space-y-2">
//                 <label htmlFor="amount" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
//                     Amount to Convert
//                 </label>
//                 <input
//                     id="amount"
//                     type="number"
//                     value={amount ?? ''}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                     placeholder="Enter amount"
//                     className="w-full p-4 text-2xl font-mono text-slate-900 dark:text-white bg-white dark:bg-gray-700 border-2 border-yellow-200 dark:border-gray-600 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 ease-in-out"
//                     min="0"
//                 />
//             </div>

//             {/* Currency Selection and Swap Button */}
//             <div className="flex items-center justify-between space-x-4 relative">
//                 {/* FROM Currency */}
//                 <div className="flex-1">
//                     <CurrencySelect
//                         label="From" 
//                         id={fromCurrency} 
//                         setID={setFromCurrency} 
//                         coinList={coinList}
//                         isLoading={isLoadingList}
//                     />
//                 </div>

//                 {/* Swap Button */}
//                 <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
//                     <button
//                         onClick={handleSwap}
//                         className="p-3 bg-yellow-500 dark:bg-yellow-400 cursor-pointer hover:bg-yellow-300 dark:hover:bg-yellow-300 text-white dark:text-gray-900 rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 border-4 border-white dark:border-gray-800"
//                         aria-label="Swap Currencies"
//                     >
//                         ⇆
//                     </button>
//                 </div>

//                 {/* TO Currency */}
//                 <div className="flex-1">
//                     <CurrencySelect 
//                         label="To" 
//                         id={toCurrency} 
//                         setID={setToCurrency} 
//                         coinList={coinList}
//                         isLoading={isLoadingList}
//                     />
//                 </div>
//             </div>
//         </div>

//         {/* Result Display Card */}
//         {isReady && (
//             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
//                 <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400 mb-3">Converted Result</h2>
//                 <div className="bg-yellow-50 dark:bg-gray-700 p-6 rounded-2xl border border-yellow-200 dark:border-gray-600">
//                     <div className="text-lg text-gray-600 dark:text-gray-300">
//                         {amount ?? 0} {fromSymbol} equals:
//                     </div>
//                     <div className="mt-2 flex items-baseline space-x-2">
//                         <span className="text-4xl font-extrabold text-yellow-800 dark:text-yellow-400 font-mono">
//                             {formattedResult}
//                         </span>
//                         <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
//                             {toSymbol}
//                         </span>
//                     </div>
//                     <p className="text-xs text-yellow-500 dark:text-yellow-300 mt-2">
//                         Exchange Rate: 1 {fromSymbol} ≈ {displayRate} {toSymbol}
//                     </p>
//                 </div>
//             </div>
//         )}
//     </div>
// </div>



//     );
// }



