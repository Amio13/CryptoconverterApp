import { createContext } from "react";
import type { ThemeContextInterface } from "../base/interfaces/ThemeContextInterface";



export const ThemeContext = createContext<ThemeContextInterface>({
  theme: "light",
  toggleTheme: () => {}
});
