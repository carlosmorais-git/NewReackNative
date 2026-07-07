import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./apiConfig";

/**
 * Chaves para armazenar o token e o tipo de usuário no SecureStore
 * (Keychain no iOS / Keystore no Android — dados sensíveis ficam criptografados em disco)
 */
export const TOKEN_KEY = "app_token";
export const TIPO_USUARIO_KEY = "app_tipo_usuario";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o Authorization Header
api.interceptors.request.use(
  async (config) => {
    /**
     * Recupera o token e o tipo de usuário do SecureStore e adiciona aos headers da requisição
     */
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const tipoUsuario = await SecureStore.getItemAsync(TIPO_USUARIO_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (tipoUsuario) {
      config.headers["X-Tipo-Usuario"] = tipoUsuario;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, config } = error.response;

      // Se o erro 401 ocorreu na requisição de login, apenas retorna o erro sem limpar sessão
      if (status === 401 && config.url.includes("/usuarios/login")) {
        return Promise.reject(error);
      }

      // Se o erro 401 ocorreu em outra requisição, o token expirou/é inválido
      if (status === 401) {
        await Promise.all([
          SecureStore.deleteItemAsync(TOKEN_KEY),
          SecureStore.deleteItemAsync(TIPO_USUARIO_KEY),
        ]);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
