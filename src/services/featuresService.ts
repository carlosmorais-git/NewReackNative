import { API_BASE_URL } from "./apiConfig";
import { Feature, ApiResponse } from "../types/api";

/**
 * Service para buscar features da API
 */
export const getFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/features`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse<Feature[]> = await response.json();

    if (data.status === "success") {
      // Mapeia 'descricao' para 'description' se necessário
      return data.data.map((feature) => ({
        ...feature,
        description: feature.description || feature.descricao || "",
      }));
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar features:", error);

    // Retorna dados mock como fallback
    return [
      {
        id: 1,
        icon: "rocket-launch",
        title: "Início Rápido",
        description: "Comece seu projeto em minutos",
        color: "#6C63FF",
        active: true,
      },
      {
        id: 2,
        icon: "palette",
        title: "Temas",
        description: "Dark mode e light mode",
        color: "#FF6584",
        active: true,
      },
      {
        id: 3,
        icon: "code-tags",
        title: "Código Limpo",
        description: "Estrutura organizada",
        color: "#2ECC71",
        active: true,
      },
      {
        id: 4,
        icon: "gesture-swipe",
        title: "Navegação",
        description: "Tabs e Stack prontos",
        color: "#F39C12",
        active: true,
      },
    ];
  }
};
