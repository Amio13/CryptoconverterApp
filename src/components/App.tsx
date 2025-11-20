import { useCallback, useMemo, useState } from "react";
import { calculateConversion, type CurrencyCode } from "../base/hooks/useConversion";
import { CURRENCIES } from "../base/mockData/mockdata";
import { CurrencySelect } from "./CurrencySelect";

export default function App() {

  

    // State for the two currencies and the amount
    const [amount, setAmount] = useState<number|undefined>();
    const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
    const [toCurrency, setToCurrency] = useState<CurrencyCode>('BTC');

    // Use useMemo to recalculate the converted result only when dependencies change
    const convertedAmount = useMemo(() => {
        return calculateConversion(amount, fromCurrency, toCurrency);
    }, [amount, fromCurrency, toCurrency]);

    // Format the converted amount to 2 decimal places for fiat or 8 for crypto
    const formattedResult = useMemo(() => {
        if (!convertedAmount) return '0.00';
        const isCrypto = CURRENCIES.find(c => c.code === toCurrency)?.type === 'crypto';
        const decimals = isCrypto ? 8 : 2;
        return convertedAmount.toFixed(decimals).replace(/\.?0+$/, ''); // Remove trailing zeros
    }, [convertedAmount, toCurrency]);

    // Function to swap the source and target currencies
    const handleSwap = useCallback(() => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, [fromCurrency, toCurrency]);
 




    return (
        <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <header className="text-center mb-8">
              
                    <p className="text-sm text-gray-500 mt-1">
                        Real-time calculation using mock rates.
                        Real rate Coming soon....
                    </p>
                </header>

                <div className="space-y-6">
                    {/* Amount Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="amount" className="text-xs font-semibold uppercase text-gray-500">Amount to Convert</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="Enter amount"
                            className="w-full p-4 text-2xl font-mono text-slate-900 border-2 border-yellow-200 rounded-xl focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 ease-in-out"
                            min="0"
                        />
                    </div>

                    {/* Currency Selection and Swap Button */}
                    <div className="flex items-center justify-between space-x-10 relative">
                        {/* FROM Currency */}
                        <div className="flex-1">
                            <CurrencySelect
                                label="From" 
                                code={fromCurrency} 
                                setCode={setFromCurrency} 
                            />
                        </div>

                        {/* Swap Button */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                            <button
                                onClick={handleSwap}
                                className="p-3 bg-yellow-500 hover:bg-yellow-300 text-white rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 border-4 border-white"
                                aria-label="Swap Currencies"
                            >
                                {/* Replaced RefreshCw icon with unicode character */}
                                ⇆
                            </button>
                        </div>

                        {/* TO Currency */}
                        <div className="flex-1 ">
                            <CurrencySelect 
                                label="To" 
                                code={toCurrency} 
                                setCode={setToCurrency} 
                            />
                        </div>
                    </div>
                </div>

                {/* Result Display Card */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-sm font-semibold uppercase text-gray-500 mb-3">Converted Result</h2>
                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                        <div className="text-lg text-gray-600">
                            {amount} {fromCurrency} equals:
                        </div>
                        <div className="mt-2 flex items-baseline space-x-2">
                            <span className="text-4xl font-extrabold text-yellow-800 font-mono">
                                {formattedResult}
                            </span>
                            <span className="text-2xl font-bold text-yellow-600">
                                {toCurrency}
                            </span>
                        </div>
                        <p className="text-xs text-yellow-500 mt-2">
                            Exchange Rate: 1 {fromCurrency} ≈ {calculateConversion(1, fromCurrency, toCurrency).toFixed(8).replace(/\.?0+$/, '')} {toCurrency}
                        </p>
                    </div>
                </div>
            </div>
        
        </div>
        
    );
}