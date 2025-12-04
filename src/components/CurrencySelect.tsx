import { useState, useEffect, useMemo } from 'react';
import type { CurrencyID} from '../base/types/types';
import type { CurrencySelectProps } from '../base/interfaces/CurrencySelectorProps';
import { ArrowIcon } from './ui/icons/ArrowIcon';


const getCurrencySymbol = (symbol: string): string => {
 
    const upper = symbol.toUpperCase();
    switch (upper) {
        case 'BTC': return '₿';
        case 'ETH': return 'Ξ';
        case 'USD': return '$';
        default: return upper.length > 3 ? '฿' : upper; 
    }
}

const CurrencySelect = ({ label, id, setID, coinList, isLoading }: CurrencySelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Find the currently selected item based on the ID
    const currentItem = useMemo(() => 
        coinList.find(c => c.id === id) || { id: id, symbol: id, name: id }
    , [id, coinList]);

    // Filter the list based on the search term
    const filteredList = useMemo(() => {
        if (!searchTerm) {
            // Show top 20 popular/fiat items when not searching
            const popularSymbols = ['usd', 'btc', 'eth', 'sol', 'ada', 'doge', 'xrp'];
            return coinList.filter(c => popularSymbols.includes(c.symbol.toLowerCase())).slice(0, 20);
        }
        
        const lowerSearch = searchTerm.toLowerCase();
        
        return coinList
            .filter(item => 
                item.name.toLowerCase().includes(lowerSearch) || 
                item.symbol.toLowerCase().includes(lowerSearch) ||
                item.id.toLowerCase().includes(lowerSearch)
            )
            .slice(0, 50);
    }, [searchTerm, coinList]);

    const handleSelect = (selectedID: CurrencyID) => {
        setID(selectedID);
        setIsOpen(false);
        setSearchTerm(''); 
    };

    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const dropdown = document.getElementById(`select-${label}`);
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [label]);


    if (isLoading) {
        return <div className="text-sm text-center py-4 text-gray-400 dark:text-gray-500">Loading Currency List...</div>;
    }

    return (
//         <div className="flex flex-col space-y-2 relative" id={`select-${label}`}>
//             <label className="text-xs font-semibold uppercase text-gray-500 ">{label}</label>
            

// <button
//     type="button"
//     onClick={() => setIsOpen(!isOpen)}
//     className="w-full h-14 flex items-center pl-4 pr-10 py-3 border border-gray-300 
//                rounded-xl text-gray-800 shadow-sm transition duration-150 ease-in-out
//                bg-white focus:ring-yellow-500 focus:border-yellow-500 relative"
//     aria-expanded={isOpen}
// >
//     <div className="flex-1 flex items-center space-x-0 overflow-hidden">
//         <span className="text-xl text-yellow-500 pr-2 ">
//             {getCurrencySymbol(currentItem.symbol)}
//         </span>

       
//         <span className="font-semibold capitalize truncate overflow-hidden whitespace-nowrap max-w-[120px]">
//             {currentItem.symbol.toUpperCase()} - {currentItem.name}
//         </span>
//     </div>

//     <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

//         <ArrowIcon  className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
//                 isOpen ? "rotate-180" : "rotate-0"}`} />
//     </span>
// </button>

            
//             {isOpen && (
//                 <div className="absolute z-20 top-full mt-1 w-full max-h-80 overflow-y-auto rounded-xl shadow-2xl border border-gray-200 
//                                bg-yellow-400 focus:outline-none ring-1 ring-black ring-opacity-5">
                    
//                     <div className="p-2 sticky top-0 bg-white z-30 border-b dark:border-slate-600">
//                         <input
//                             type="text"
//                             placeholder="Search currency..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full px-3 py-2 border rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
//                         />
//                     </div>

//                     <ul className="divide-y divide-gray-100 ">
//                         {filteredList.length > 0 ? filteredList.map((currencyItem) => (
//                             <li
//                                 key={currencyItem.id}
//                                 onClick={() => handleSelect(currencyItem.id)}
//                                 className={`cursor-pointer p-4 flex items-center space-x-3 transition duration-150 ease-in-out 
//                                             hover:bg-yellow-300
//                                             text-white
//                                             ${currencyItem.id === id ? 'bg-yellow-500  font-semibold' : ''}`}
//                                 aria-selected={currencyItem.id === id}
//                             >
//                                 <span className="text-xl text-white ">{getCurrencySymbol(currencyItem.symbol)}</span>
//                                 <div className="truncate">
//                                     <span className="uppercase font-semibold">{currencyItem.symbol}</span>
//                                     <span className="text-white  ml-2">({currencyItem.name})</span>
//                                 </div>
//                             </li>
//                         )) : (
//                             <li className="p-4 text-center text-white ">No results found.</li>
//                         )}
//                     </ul>
//                 </div>
//             )}
//         </div>
<div className="flex flex-col space-y-2 relative" id={`select-${label}`}>
    <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">{label}</label>

    <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-14 flex items-center pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 
                   rounded-xl text-gray-800 dark:text-white shadow-sm transition duration-150 ease-in-out
                   bg-white dark:bg-gray-700 focus:ring-yellow-500 focus:border-yellow-500 relative"
        aria-expanded={isOpen}
    >
        <div className="flex-1 flex items-center space-x-0 overflow-hidden">
            <span className="text-xl text-yellow-500 pr-2 ">
                {getCurrencySymbol(currentItem.symbol)}
            </span>

            <span className="font-semibold capitalize truncate overflow-hidden whitespace-nowrap max-w-[120px]">
                {currentItem.symbol.toUpperCase()} - {currentItem.name}
            </span>
        </div>

        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ArrowIcon  
                className={`h-5 w-5 text-gray-400 dark:text-gray-300 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                }`} 
            />
        </span>
    </button>

    {isOpen && (
        <div className="absolute z-20 top-full mt-1 w-full max-h-80 overflow-y-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 
                        bg-yellow-400 dark:bg-gray-800 focus:outline-none ring-1 ring-black ring-opacity-5">
            <div className="p-2 sticky top-0 bg-white dark:bg-gray-700 z-30 border-b border-gray-200 dark:border-gray-600">
                <input
                    type="text"
                    placeholder="Search currency..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
                />
            </div>

            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredList.length > 0 ? filteredList.map((currencyItem) => (
                    <li
                        key={currencyItem.id}
                        onClick={() => handleSelect(currencyItem.id)}
                        className={`cursor-pointer p-4 flex items-center space-x-3 transition duration-150 ease-in-out 
                                    hover:bg-yellow-300 dark:hover:bg-yellow-500
                                    text-white dark:text-gray-200
                                    ${currencyItem.id === id ? 'bg-yellow-500 dark:bg-yellow-600 font-semibold' : ''}`}
                        aria-selected={currencyItem.id === id}
                    >
                        <span className="text-xl">{getCurrencySymbol(currencyItem.symbol)}</span>
                        <div className="truncate">
                            <span className="uppercase font-semibold">{currencyItem.symbol}</span>
                            <span className="ml-2">({currencyItem.name})</span>
                        </div>
                    </li>
                )) : (
                    <li className="p-4 text-center text-gray-600 dark:text-gray-300">No results found.</li>
                )}
            </ul>
        </div>
    )}
</div>



    );
};

export default CurrencySelect;










































































// import  { useState, useEffect } from 'react'; // <-- These imports are necessary!
// import type { CurrencyCode } from "../base/hooks/useConversion";
// import { CURRENCIES } from "../base/mockData/mockdata";
// // import { getIcon } from "./GetIcon"; 

// type SetCodeFunction = (code: CurrencyCode) => void; 

// // Define the component's props interface
// interface CurrencySelectProps {
// label: string;
// code: CurrencyCode;
// setCode: SetCodeFunction;
// }

// export const CurrencySelect = ({ label, code, setCode } : CurrencySelectProps) => {
//     // State for controlling the visibility of the custom dropdown list
//     const [isOpen, setIsOpen] = useState(false);
    
//     // Find the currently selected currency object
//     // This assumes CURRENCIES objects have an 'icon' property.
//     const currentCurrency = CURRENCIES.find(c => c.code === code) || CURRENCIES[0];

//     // Handle selection and close the dropdown
//     const handleSelect = (selectedCode: CurrencyCode) => {
//         setCode(selectedCode);
//         setIsOpen(false);
//     };

//     // Close dropdown if user clicks outside
//     useEffect(() => {
//         const handleOutsideClick = (event: MouseEvent) => {
//             // Use a unique ID to identify this specific dropdown instance
//             const dropdown = document.getElementById(`select-${label}`);
//             if (dropdown && !dropdown.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleOutsideClick);
//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick);
//         };
//     }, [label]);
    
//     // NOTE: The getIcon function logic is removed for simplicity, using currentCurrency.icon directly.

//     return (
//         <div className="flex flex-col space-y-2 relative" id={`select-${label}`}>
//             {/* Label for the component */}
//             <label className="text-xs font-semibold uppercase text-black">{label}</label>
            
//             {/* 1. Custom Display Button (Replaces the native <select> box) */}
//             <button
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 // Styling for the closed box. Fully controlled with Tailwind.
//                 className="w-full pl-4 pr-10 py-3 text-left border border-yellow-300 rounded-xl text-gray-500 shadow-sm transition duration-150 ease-in-out cursor-pointer 
//                            bg-white focus:ring-yellow-500 focus:border-yellow-500
//                           "
//                 aria-expanded={isOpen}
//             >
//                 <div className="flex items-center space-x-3">
//                     <span className="text-xl text-yellow-500">{currentCurrency.icon}</span>
//                     <span className="truncate font-semibold">
//                         {currentCurrency.code} - {currentCurrency.name}
//                     </span>
//                 </div>
//                 {/* Custom arrow icon, rotating based on isOpen state */}
//                 <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <svg className="h-5 w-5 text-yellow-400 transform transition-transform duration-200" 
//                          viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
//                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//                     </svg>
//                 </span>
//             </button>
            
//             {/* 2. Custom Options List (Conditionally rendered <ul>) */}
//             {isOpen && (
//                 <ul className="absolute z-20 top-full mt-1 w-full max-h-60 overflow-y-auto rounded-xl shadow-2xl border border-gray-200 
//                                bg-yellow-100 dark:bg-yellow-500 focus:outline-none ring-1 ring-yellow-400 ring-opacity-5">
//                     {CURRENCIES.map((currencyItem) => (
//                         <li
//                             key={currencyItem.code}
//                             onClick={() => handleSelect(currencyItem.code as CurrencyCode)}
//                             // FULL Dark Mode control here for background/hover
//                             className={`cursor-pointer p-4 flex items-center space-x-3 transition duration-150 ease-in-out 
//                                         hover:bg-yellow-400
//                                         text-white
//                                         ${currencyItem.code === code ? 'bg-yellow-300 font-semibold' : ''}`}
//                             aria-selected={currencyItem.code === code}
//                         >
//                             <span className="text-xl text-white">{currencyItem.icon}</span>
//                             <span className="truncate">
//                                 {currencyItem.code} - {currencyItem.name}
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };




























// import type { CurrencyCode } from "../base/hooks/useConversion";
// import { CURRENCIES } from "../base/mockData/mockdata";
// import { getIcon } from "./GetIcon";

// type SetCodeFunction = (code: CurrencyCode) => void; 

// // Define the component's props interface
// interface CurrencySelectProps {
//     label: string;
//     code: CurrencyCode; // <-- Use the specific type here
//     setCode: SetCodeFunction; // <-- Use the specific setter type here
// }




//  export const CurrencySelect = ({ label, code, setCode } : CurrencySelectProps) => {
//         const icon = getIcon(code);
//         return (
//             <div className="flex flex-col space-y-2">
//                 <label className="text-xs font-semibold uppercase text-gray-500">{label}</label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                         <span className="text-xl text-yellow-400">{icon}</span>
//                     </div>
//                     <select
//                         value={code}
//                         onChange={(e) => setCode(e.target.value as CurrencyCode)}
//                         className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm transition duration-150 ease-in-out cursor-pointer appearance-none"
//                     >
//                         {CURRENCIES.map((currency) => (
//                             <option key={currency.code} value={currency.code}>
//                                 {currency.code} - {currency.name}
//                             </option>
//                         ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                       
//                         <span className="text-yellow-400">▼</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
