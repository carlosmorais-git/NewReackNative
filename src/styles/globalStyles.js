// Cores padrão (mantido para compatibilidade)
export const COLORS = {
  primary: "#6C63FF",
  secondary: "#FF6584",
  success: "#2ECC71",
  danger: "#E74C3C",
  warning: "#F39C12",
  info: "#3498DB",

  white: "#FFFFFF",
  black: "#000000",
  gray: "#95A5A6",
  darkGray: "#2C3E50",
  lightGray: "#ECF0F1",

  background: "#F8F9FA",
  text: "#1A1A1A",
  textMuted: "#6C757D",
  divider: "#DEE2E6",
};

// Espaçamento
export const SPACING = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  xxxlarge: 64,
};

// Tipografia
export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
};

// Sombras
export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Border Radius
export const RADIUS = {
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  round: 999,
};

// Tamanhos de ícones
export const ICON_SIZES = {
  small: 20,
  medium: 24,
  large: 32,
  xlarge: 48,
};

// Componentes reutilizáveis
export const BUTTON_STYLES = {
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.medium - 2,
    paddingHorizontal: SPACING.large - 2,
    borderRadius: RADIUS.medium,
    alignItems: "center",
    justifyContent: "center",
  },
};

export const CARD_STYLES = {
  container: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    padding: SPACING.large,
    ...SHADOWS.medium,
  },
};
