import * as SecureStore from "expo-secure-store";
import api, { TOKEN_KEY, TIPO_USUARIO_KEY } from "../apiApp/axios";

/**
 * Faz login na API, salva o token (e o tipo de usuário) no dispositivo
 * e retorna os dados do usuário autenticado.
 */
export const login = async (email, senha) => {
  const response = await api.post("/usuarios/login", { email, senha });
  const { token, usuario } = response.data;

  await SecureStore.setItemAsync(TOKEN_KEY, token);

  if (usuario?.tipo_usuario) {
    await SecureStore.setItemAsync(TIPO_USUARIO_KEY, usuario.tipo_usuario);
  }

  return usuario;
};

/**
 * Busca os dados do usuário logado usando o token salvo no dispositivo.
 */
export const getUsuarioLogado = async () => {
  const response = await api.get("/usuarios/usuario-logado");
  return response.data.usuario;
};

/**
 * Remove o token e os dados de sessão do dispositivo.
 */
export const logout = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(TIPO_USUARIO_KEY),
  ]);
};

/**
 * Verifica se existe um token salvo no dispositivo.
 */
export const isAuthenticated = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return !!token;
};
