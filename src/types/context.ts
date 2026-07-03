import { ReactNode } from "react";
import { ColorScheme } from "./common";

// Theme Context
export interface ThemeContextValue {
  isDark: boolean;
  colors: ColorScheme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

// Modal Context
export interface ConfirmOptions {
  titulo?: string;
  mensagem?: string;
  textoBotaoConfirmar?: string;
  textoBotaoCancelar?: string;
  tipo?: "info" | "alert" | "excluir";
  onConfirm: () => void;
}

export interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
}

export interface ModalContextValue {
  showConfirm: (options: ConfirmOptions) => void;
  closeModal: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}
