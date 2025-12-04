// src/Context/ConverterContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { CurrencyID } from "../base/types/types";

type ConverterContextType = {
  amount?: number;
  setAmount: (value?: number) => void;
  fromCurrency: CurrencyID;
  setFromCurrency: (id: CurrencyID) => void;
  toCurrency: CurrencyID;
  setToCurrency: (id: CurrencyID) => void;
};

const ConverterContext = createContext<ConverterContextType | undefined>(undefined);

export const ConverterProvider = ({ children }: { children: ReactNode }) => {
  const [amount, setAmount] = useState<number>();
  const [fromCurrency, setFromCurrency] = useState<CurrencyID>("united-states-dollar");
  const [toCurrency, setToCurrency] = useState<CurrencyID>("bitcoin");

  return (
    <ConverterContext.Provider value={{ amount, setAmount, fromCurrency, setFromCurrency, toCurrency, setToCurrency }}>
      {children}
    </ConverterContext.Provider>
  );
};

export const useConverter = () => {
  const context = useContext(ConverterContext);
  if (!context) throw new Error("useConverter must be used inside ConverterProvider");
  return context;
};
