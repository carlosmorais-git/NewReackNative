import { ReactNode } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

// Button Component
export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Modal Component
export type ModalType = "info" | "alert" | "excluir";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo?: string;
  mensagem?: string;
  textoBotaoConfirmar?: string;
  textoBotaoCancelar?: string;
  tipo?: ModalType;
}

export interface ModalTypeConfig {
  iconName: string;
  iconBg: string;
  iconColor: string;
  btnColor: string;
}
