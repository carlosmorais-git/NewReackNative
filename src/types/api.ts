// API Types

// SocialNetwork e Feature vivem em ./common (fonte única de verdade).
import type { SocialNetwork } from "./common";

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

// Usuário (autenticação)
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  address?: string;
  criado_em?: string;
  tipo_usuario?: string;
}

export interface LoginResponse {
  status: "sucesso" | "erro";
  mensagem: string;
  token: string;
  usuario: Usuario;
}

export interface UsuarioLogadoResponse {
  status: "sucesso" | "erro";
  mensagem: string;
  usuario: Usuario;
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
