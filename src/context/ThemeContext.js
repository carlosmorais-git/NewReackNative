import React, { createContext, useContext, useState } from "react";
import { lightColors, darkColors } from "../themes/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Inicia em light mode

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setLightTheme = () => {
    setIsDark(false);
  };

  const setDarkTheme = () => {
    setIsDark(true);
  };

  const colors = isDark ? darkColors : lightColors;

  const theme = {
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
