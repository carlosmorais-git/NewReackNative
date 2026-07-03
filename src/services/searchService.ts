import { API_BASE_URL } from "../apiApp/apiConfig";
import { SearchItem, ApiResponse } from "../types/api";

/**
 * Service para buscar TODOS os frameworks da API
 * O filtro é feito no frontend
 */
export const searchItems = async (): Promise<SearchItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<SearchItem[]> = await response.json();

    if (result.status === "success") {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar frameworks:", error);

    // Retorna dados mock como fallback
    return [
      {
        id: 1,
        title: "React Native",
        subtitle: "Framework mobile",
        category: "tecnologia",
        tags: ["mobile", "react"],
      },
      {
        id: 2,
        title: "TypeScript",
        subtitle: "JavaScript tipado",
        category: "tecnologia",
        tags: ["typescript", "javascript"],
      },
      {
        id: 3,
        title: "Node.js",
        subtitle: "Runtime JavaScript",
        category: "backend",
        tags: ["nodejs", "backend"],
      },
    ];
  }
};

/**
 * Service para buscar categorias disponíveis
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/search/categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<string[]> = await response.json();

    if (result.status === "success") {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return ["tecnologia", "backend", "ferramentas"];
  }
};
