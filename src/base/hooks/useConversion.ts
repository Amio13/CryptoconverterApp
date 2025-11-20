import { MOCK_RATES } from "../mockData/mockdata";


 export type CurrencyCode = keyof typeof MOCK_RATES;

export const calculateConversion = (amount: number | undefined, fromCode : CurrencyCode, toCode: CurrencyCode) : number => {
    if (!amount || fromCode === toCode) return amount || 0;

    const fromRate = MOCK_RATES[fromCode];
    const toRate = MOCK_RATES[toCode];

    if (!fromRate || !toRate) return 0;

    // Convert source amount to the base reference (e.g., USD value)
    const baseValue = amount * fromRate;
    
    // Convert base value to target currency amount
    return baseValue / toRate;
};
