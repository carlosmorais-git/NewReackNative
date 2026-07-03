// API Types

// Feature (Home Screen)
export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  descricao?: string; // Compatibilidade com banco de dados
  color: string;
  active: boolean;
}

// Contact (Contato Screen)
export interface Contact {
  id: number;
  icon: string;
  type: string;
  title: string;
  value: string;
  action: string;
  available: boolean;
}

export interface SocialNetwork {
  id: number;
  name: string;
  icon: string;
  url: string;
  followers: string;
}

export interface ContactsResponse {
  contacts: Contact[];
  socials: SocialNetwork[];
}

// Search (Busca Screen)
export interface SearchItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
}

// Generic API Response
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  total?: number;
}

// Legacy types (manter para compatibilidade)
export interface ModuloData {
  id: number;
  nome: string;
  descricao?: string;
}

export interface GerarModularPayload {
  [key: string]: any;
}
