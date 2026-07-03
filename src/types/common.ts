// Common types used across the application

export type ThemeMode = "light" | "dark";

export interface ColorScheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  divider: string;
  tabBarActive: string;
  tabBarInactive: string;
  tabBarBackground: string;
  overlay: string;
  disabled: string;
  placeholder: string;
  white: string;
  black: string;
}

export interface Spacing {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  xxxlarge: number;
}

export interface Typography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  body: TextStyle;
  bodyLarge: TextStyle;
  caption: TextStyle;
  button: TextStyle;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  active?: boolean;
}

export interface SearchResult {
  id: number;
  title: string;
  subtitle: string;
  category?: string;
  tags?: string[];
}

export interface ContactItem {
  id: number;
  icon: string;
  type?: string;
  title: string;
  value: string;
  action: string;
  available?: boolean;
}

export interface SocialNetwork {
  id?: number;
  name: string;
  icon: string;
  url?: string;
  followers?: string;
}

export interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  hasArrow?: boolean;
  value?: boolean;
  onPress?: () => void;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}
