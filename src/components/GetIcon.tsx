import { CURRENCIES } from "../base/mockData/mockdata";


 export const getIcon = (code: string) => {
    return CURRENCIES.find(c => c.code === code)?.icon || '$';
};
