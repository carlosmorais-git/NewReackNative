import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightColors, darkColors } from "../themes/colors";
import { ThemeContextValue, ThemeProviderProps } from "../types/context";

const THEME_KEY = "@app:theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false); // Inicia em light mode

  // Carrega o tema salvo assim que o app abre
  useEffect(() => {
    const loadTheme = async () => {
      const salvo = await AsyncStorage.getItem(THEME_KEY);
      if (salvo !== null) {
        setIsDark(salvo === "dark");
      }
    };

    loadTheme();
  }, []);

  const salvarTema = (valor: boolean): void => {
    AsyncStorage.setItem(THEME_KEY, valor ? "dark" : "light");
  };

  const toggleTheme = (): void => {
    setIsDark((atual) => {
      const novoValor = !atual;
      salvarTema(novoValor);
      return novoValor;
    });
  };

  const setLightTheme = (): void => {
    setIsDark(false);
    salvarTema(false);
  };

  const setDarkTheme = (): void => {
    setIsDark(true);
    salvarTema(true);
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
