# 🗂️ Guia de Tipos - TypeScript

## 📚 Visão Geral

Este guia explica a organização e uso dos tipos TypeScript no projeto.

## 🏗️ Estrutura de Types

```
src/types/
├── index.ts           # Hub central - exporta todos os tipos
├── common.ts          # Tipos compartilhados entre módulos
├── components.ts      # Props e tipos de componentes
├── screens.ts         # Props de telas (se necessário)
├── navigation.ts      # Tipos de navegação e rotas
├── context.ts         # Tipos de contextos React
├── hooks.ts           # Tipos de hooks customizados
└── api.ts             # Tipos de API e serviços
```

## 📖 Guia de Uso por Arquivo

### `common.ts` - Tipos Compartilhados

Tipos usados em vários lugares do app:

```typescript
// Tema e cores
export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  // ... mais cores
}

// Features da home
export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

// Resultados de busca
export interface SearchResult {
  id: number;
  title: string;
  subtitle: string;
}

// Items de menu
export interface MenuItem {
  icon: string;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  hasArrow?: boolean;
  value?: boolean;
  onPress?: () => void;
}
```

**Quando usar**: Para tipos que aparecem em múltiplos componentes ou telas.

---

### `components.ts` - Props de Componentes

Define as props que cada componente aceita:

```typescript
// Button
export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

// Modal
export type ModalType = "info" | "alert" | "excluir";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo?: string;
  mensagem?: string;
  // ... mais props
}
```

**Uso no componente**:

```typescript
import { ButtonProps } from "../types/components";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
}) => {
  // implementação
};
```

---

### `navigation.ts` - Navegação Tipada

Define as rotas e parâmetros de navegação:

```typescript
// Stack principal
export type RootStackParamList = {
  Base: undefined; // Sem parâmetros
  ConfigStack: undefined;
};

// Tabs do app
export type MainTabsParamList = {
  Home: undefined;
  Busca: undefined;
  Contato: undefined;
  Menu: undefined;
};

// Props tipadas para screens
export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;
```

**Uso na tela**:

```typescript
import { MainTabsScreenProps } from "../types/navigation";

const HomeScreen: React.FC<MainTabsScreenProps<"Home">> = ({ navigation }) => {
  // navigation.navigate('Busca') <- autocomplete funciona!
};
```

---

### `context.ts` - Contextos

Define os valores e props de contextos:

```typescript
// ThemeContext
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

// ModalContext
export interface ModalContextValue {
  showConfirm: (options: ConfirmOptions) => void;
  closeModal: () => void;
}
```

**Uso no contexto**:

```typescript
import { ThemeContextValue, ThemeProviderProps } from "../types/context";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // implementação
};
```

---

### `api.ts` - APIs e Serviços

Define tipos para dados de API:

```typescript
export interface ModuloData {
  id: number;
  nome: string;
  descricao?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  resultado?: T;
  data?: T;
  error?: string;
}

export interface GerarModularPayload {
  [key: string]: any;
}
```

**Uso no serviço**:

```typescript
import { ModuloData, ApiResponse } from "../types/api";

export const carregarModulos = async (): Promise<ModuloData[] | null> => {
  const response = await fetch(`${API_BASE_URL}/modulos`);
  const data: ApiResponse<ModuloData[]> = await response.json();
  return data.resultado || null;
};
```

---

## 🎯 Boas Práticas

### 1. Use `interface` para objetos

```typescript
// ✅ Bom
interface UserData {
  name: string;
  age: number;
}

// ❌ Evite para objetos simples
type UserData = {
  name: string;
  age: number;
};
```

### 2. Use `type` para unions e primitivos

```typescript
// ✅ Bom
type ButtonVariant = "primary" | "secondary" | "outline";
type ID = string | number;

// ❌ Menos ideal
interface ButtonVariant {
  // não funciona para unions
}
```

### 3. Props opcionais com `?`

```typescript
interface Props {
  required: string; // obrigatório
  optional?: string; // opcional
}
```

### 4. Valores padrão com `= 'valor'`

```typescript
const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary", // valor padrão
  disabled = false,
}) => {
  // ...
};
```

### 5. Genéricos para flexibilidade

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

// Uso:
const response: ApiResponse<UserData> = await fetchUser();
```

## 📝 Exemplos Práticos

### Componente com Props Tipadas

```typescript
// src/components/Card.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    {children}
  </View>
);

export default Card;
```

### Hook com Tipos

```typescript
// src/hooks/useCounter.tsx
import { useState } from "react";

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounter = (initialValue: number = 0): UseCounterReturn => {
  const [count, setCount] = useState(initialValue);

  return {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
    reset: () => setCount(initialValue),
  };
};
```

### Serviço com API Tipada

```typescript
// src/services/userService.ts
import { API_BASE_URL } from "../api/apiConfig";

interface User {
  id: number;
  name: string;
  email: string;
}

export const getUser = async (id: number): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};
```

## 🔍 Troubleshooting

### Erro: "Type 'X' is not assignable to type 'Y'"

**Solução**: Verifique se os tipos estão corretos. Use `as` para type assertion se necessário:

```typescript
const data = response.data as UserData;
```

### Erro: "Property 'X' does not exist"

**Solução**: Adicione a propriedade na interface ou use optional chaining:

```typescript
const value = obj?.property;
```

### Warning: "Implicit any"

**Solução**: Sempre defina tipos explicitamente:

```typescript
// ❌ Evite
const handleClick = (e) => {};

// ✅ Correto
const handleClick = (e: MouseEvent) => {};
```

---

**Consulte este guia sempre que tiver dúvidas sobre tipos!** 📚
