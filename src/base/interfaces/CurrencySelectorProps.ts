import type { CurrencyID, SetIDFunction } from "../types/types";
import type { CoinListItem } from "./CoinListItem";


export interface CurrencySelectProps {
    label: string;
    id: CurrencyID;
    setID: SetIDFunction;
    coinList: CoinListItem[];
    isLoading: boolean;
    className?: string;
}