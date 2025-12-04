import type { CurrencyID } from "../types/types";

export interface RatesData {
    [key: CurrencyID]: {
        usd?: number;
    };
}