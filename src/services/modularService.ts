import { API_BASE_URL } from "../apiApp/apiConfig";
import { ModuloData, GerarModularPayload, ApiResponse } from "../types/api";

// ===== MODULAR ENDPOINTS =====

export const carregarModulos = async (): Promise<ModuloData[] | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modular/modulos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro módulos:", error);
    return null;
  }
};

export const gerarModulares = async (
  payload: GerarModularPayload,
): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modular/gerar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<any> = await response.json();
    if (data.success) {
      return data.resultado;
    }
    return null;
  } catch (error) {
    console.error("Erro ao gerar modulares:", error);
    return null;
  }
};
