import { API_BASE_URL } from "../apiApp/apiConfig";
import {
  Contact,
  SocialNetwork,
  ContactsResponse,
  ApiResponse,
} from "../types/api";

/**
 * Service para buscar contatos da API
 */
export const getContacts = async (): Promise<ContactsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contacts`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ContactsResponse> = await response.json();

    if (result.status === "success") {
      return result.data;
    }

    return { contacts: [], socials: [] };
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);

    // Retorna dados mock como fallback
    return {
      contacts: [
        {
          id: 1,
          icon: "email",
          type: "email",
          title: "Email",
          value: "contato@exemplo.com",
          action: "mailto:contato@exemplo.com",
          available: true,
        },
        {
          id: 2,
          icon: "phone",
          type: "phone",
          title: "Telefone",
          value: "+55 (11) 99999-9999",
          action: "tel:+5511999999999",
          available: true,
        },
        {
          id: 3,
          icon: "whatsapp",
          type: "whatsapp",
          title: "WhatsApp",
          value: "+55 (11) 99999-9999",
          action: "https://wa.me/5511999999999",
          available: true,
        },
        {
          id: 4,
          icon: "web",
          type: "website",
          title: "Website",
          value: "www.exemplo.com",
          action: "https://www.exemplo.com",
          available: true,
        },
      ],
      socials: [
        { id: 1, name: "instagram", icon: "instagram", url: "", followers: "" },
        { id: 2, name: "facebook", icon: "facebook", url: "", followers: "" },
        { id: 3, name: "twitter", icon: "twitter", url: "", followers: "" },
        { id: 4, name: "linkedin", icon: "linkedin", url: "", followers: "" },
      ],
    };
  }
};

/**
 * Service para buscar apenas redes sociais
 */
export const getSocialNetworks = async (): Promise<SocialNetwork[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contacts/socials`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<SocialNetwork[]> = await response.json();

    if (result.status === "success") {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar redes sociais:", error);
    return [];
  }
};
