
import  { useState, useEffect } from 'react'; // <-- These imports are necessary!
import type { CurrencyCode } from "../base/hooks/useConversion";
import { CURRENCIES } from "../base/mockData/mockdata";
// import { getIcon } from "./GetIcon"; 

type SetCodeFunction = (code: CurrencyCode) => void; 

// Define the component's props interface
interface CurrencySelectProps {
label: string;
code: CurrencyCode;
setCode: SetCodeFunction;
}

export const CurrencySelect = ({ label, code, setCode } : CurrencySelectProps) => {
    // State for controlling the visibility of the custom dropdown list
    const [isOpen, setIsOpen] = useState(false);
    
    // Find the currently selected currency object
    // This assumes CURRENCIES objects have an 'icon' property.
    const currentCurrency = CURRENCIES.find(c => c.code === code) || CURRENCIES[0];

    // Handle selection and close the dropdown
    const handleSelect = (selectedCode: CurrencyCode) => {
        setCode(selectedCode);
        setIsOpen(false);
    };

    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // Use a unique ID to identify this specific dropdown instance
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
    
    // NOTE: The getIcon function logic is removed for simplicity, using currentCurrency.icon directly.

    return (
        <div className="flex flex-col space-y-2 relative" id={`select-${label}`}>
            {/* Label for the component */}
            <label className="text-xs font-semibold uppercase text-black">{label}</label>
            
            {/* 1. Custom Display Button (Replaces the native <select> box) */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                // Styling for the closed box. Fully controlled with Tailwind.
                className="w-full pl-4 pr-10 py-3 text-left border border-yellow-300 rounded-xl text-gray-500 shadow-sm transition duration-150 ease-in-out cursor-pointer 
                           bg-white focus:ring-yellow-500 focus:border-yellow-500
                          "
                aria-expanded={isOpen}
            >
                <div className="flex items-center space-x-3">
                    <span className="text-xl text-yellow-500">{currentCurrency.icon}</span>
                    <span className="truncate font-semibold">
                        {currentCurrency.code} - {currentCurrency.name}
                    </span>
                </div>
                {/* Custom arrow icon, rotating based on isOpen state */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-yellow-400 transform transition-transform duration-200" 
                         viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            
            {/* 2. Custom Options List (Conditionally rendered <ul>) */}
            {isOpen && (
                <ul className="absolute z-20 top-full mt-1 w-full max-h-60 overflow-y-auto rounded-xl shadow-2xl border border-gray-200 
                               bg-yellow-100 dark:bg-yellow-500 focus:outline-none ring-1 ring-yellow-400 ring-opacity-5">
                    {CURRENCIES.map((currencyItem) => (
                        <li
                            key={currencyItem.code}
                            onClick={() => handleSelect(currencyItem.code as CurrencyCode)}
                            // FULL Dark Mode control here for background/hover
                            className={`cursor-pointer p-4 flex items-center space-x-3 transition duration-150 ease-in-out 
                                        hover:bg-yellow-400
                                        text-white
                                        ${currencyItem.code === code ? 'bg-yellow-300 font-semibold' : ''}`}
                            aria-selected={currencyItem.code === code}
                        >
                            <span className="text-xl text-white">{currencyItem.icon}</span>
                            <span className="truncate">
                                {currencyItem.code} - {currencyItem.name}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};




























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
