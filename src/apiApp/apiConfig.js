// Configuração da URL do backend.
// No Expo SDK 54 só variáveis com prefixo EXPO_PUBLIC_ chegam ao código do app.
// Via cabo USB (adb reverse tcp:3003) o celular alcança o backend por localhost.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3003";
