import { API_BASE_URL } from "../apiApp/apiConfig";
import { SearchItem, ApiResponse } from "../types/api";

/**
 * Service para buscar itens na API
 */
export const searchItems = async (
  query: string,
  category?: string,
): Promise<SearchItem[]> => {
  try {
    let url = `${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`;

    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<SearchItem[]> & { total: number; query: string } =
      await response.json();

    if (result.status === "success") {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar:", error);

    // Retorna dados mock como fallback
    const mockData: SearchItem[] = [
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

    // Filtrar localmente se houver query
    if (query && query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      return mockData.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.subtitle.toLowerCase().includes(lowerQuery),
      );
    }

    return mockData;
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
