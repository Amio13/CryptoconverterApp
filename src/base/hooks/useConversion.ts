import type { RatesData } from '../interfaces/RatesData';
import type { CurrencyID } from '../types/types';


export const useConversion = (
    amount: number | undefined, 
    from: CurrencyID, 
    to: CurrencyID, 
    usdRates: RatesData
): number => {
    const safeAmount = amount ?? 0; 
    if (safeAmount <= 0) return 0;
    
    // Get the USD equivalent rate for both 'from' and 'to' currencies
   
    const rateFromUSD = usdRates[from]?.usd;
    const rateToUSD = usdRates[to]?.usd; 

    if (!rateFromUSD || !rateToUSD || rateFromUSD === 0) {
        
        return 0; 
    }

   //conersion maths
    const amountInUSD = safeAmount * rateFromUSD; 

  
    const convertedAmount = amountInUSD / rateToUSD; 

    return convertedAmount;
};





































// import { MOCK_RATES } from "../mockData/mockdata";


//  export type CurrencyCode = keyof typeof MOCK_RATES;

// export const calculateConversion = (amount: number | undefined, fromCode : CurrencyCode, toCode: CurrencyCode) : number => {
//     if (!amount || fromCode === toCode) return amount || 0;

//     const fromRate = MOCK_RATES[fromCode];
//     const toRate = MOCK_RATES[toCode];

//     if (!fromRate || !toRate) return 0;

//     // Convert source amount to the base reference (e.g., USD value)
//     const baseValue = amount * fromRate;
    
//     // Convert base value to target currency amount
//     return baseValue / toRate;
// };


// Assuming this logic is in 'base/hooks/useConversion'
// export const calculateConversion = (
//     amount: number, 
//     from: CurrencyCode, 
//     to: CurrencyCode, 
//     usdRates: RatesInUSD // <-- NEW PARAMETER
// ): number => {
//     // 1. Get the USD equivalent rate for both 'from' and 'to' currencies
//     const rateFromUSD = usdRates[from];
//     const rateToUSD = usdRates[to]; 

//     if (!rateFromUSD || !rateToUSD || rateToUSD === 0) {
//         return 0; // Guard against missing rates or division by zero
//     }

//     // 2. Convert the 'from' amount into USD
//     const amountInUSD = amount / rateFromUSD; // Example: 1 EUR / 1.08 = 0.92 USD

//     // 3. Convert the USD amount into the 'to' currency
//     const convertedAmount = amountInUSD * rateToUSD; // Example: 0.92 USD * 67000 (BTC rate) = 61640 BTC

//     return convertedAmount;
// };
