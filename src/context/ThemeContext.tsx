import React, { createContext, useContext, useState } from "react";
import { lightColors, darkColors } from "../themes/colors";
import { ThemeContextValue, ThemeProviderProps } from "../types/context";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false); // Inicia em light mode

  const toggleTheme = (): void => {
    setIsDark(!isDark);
  };

  const setLightTheme = (): void => {
    setIsDark(false);
  };

  const setDarkTheme = (): void => {
    setIsDark(true);
  };

  const colors = isDark ? darkColors : lightColors;

  const theme: ThemeContextValue = {
    isDark,
    colors,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
