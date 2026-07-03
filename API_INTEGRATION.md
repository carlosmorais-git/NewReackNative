# API Integration v2.0 🚀

## Visão Geral

Este projeto agora está integrado com uma API Express.js que fornece dados mock para as telas principais do aplicativo. A integração foi implementada com foco em escalabilidade, tratamento de erros e experiência do usuário.

## Endpoints da API

### Base URL

```
http://10.0.0.208:8000/api
```

### Features (Home Screen)

```
GET /api/features
```

Retorna lista de features para exibição na tela Home.

**Resposta:**

```json
{
  "status": "success",
  "message": "Features carregadas com sucesso",
  "data": [
    {
      "id": 1,
      "icon": "rocket-launch",
      "title": "Início Rápido",
      "description": "Comece seu projeto em minutos",
      "color": "#6C63FF",
      "active": true
    }
  ],
  "total": 6
}
```

### Contacts (Contato Screen)

```
GET /api/contacts
```

Retorna informações de contato e redes sociais.

**Resposta:**

```json
{
  "status": "success",
  "message": "Contatos carregados com sucesso",
  "data": {
    "contacts": [
      {
        "id": 1,
        "icon": "email",
        "type": "email",
        "title": "Email",
        "value": "contato@meuapp.com.br",
        "action": "mailto:contato@meuapp.com.br",
        "available": true
      }
    ],
    "socials": [
      {
        "id": 1,
        "name": "instagram",
        "icon": "instagram",
        "url": "https://instagram.com/meuapp",
        "followers": "10.5k"
      }
    ]
  }
}
```

### Search (Busca Screen)

```
GET /api/search?q={query}&category={category}
```

Busca itens com suporte a query string e filtro por categoria.

**Parâmetros:**

- `q` (opcional): Texto da busca
- `category` (opcional): Filtrar por categoria

**Resposta:**

```json
{
  "status": "success",
  "message": "Resultados encontrados",
  "data": [
    {
      "id": 1,
      "title": "React Native",
      "subtitle": "Framework mobile multiplataforma",
      "category": "tecnologia",
      "tags": ["mobile", "javascript", "react"]
    }
  ],
  "total": 8,
  "query": "react",
  "category": "all"
}
```

## Arquitetura

### Camadas do Sistema

```
┌─────────────────────────────────────────┐
│         UI Components (Screens)         │
│   HomeScreen, BuscaScreen, ContatoScreen│
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│            Service Layer                │
│  featuresService, searchService,        │
│  contactsService                        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          API Configuration              │
│         apiConfig.ts                    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Express.js Backend API            │
│    /api/features, /api/contacts,        │
│    /api/search                          │
└─────────────────────────────────────────┘
```

### Services

Cada tela possui seu próprio service que:

- Faz requisições HTTP para a API
- Trata erros e fallbacks
- Retorna dados tipados (TypeScript)
- Fornece dados mock como fallback

**Exemplo:**

```typescript
// src/services/featuresService.ts
export const getFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/features`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    // Retorna dados mock como fallback
    return mockFeatures;
  }
};
```

## Features Implementadas

### ✅ Loading States

Todas as telas exibem um indicador de carregamento durante as requisições.

### ✅ Pull to Refresh

Telas Home e Contato suportam pull-to-refresh para atualizar dados.

### ✅ Error Handling

Sistema de fallback: se a API falhar, dados mock são exibidos.

### ✅ Debounce na Busca

A tela de busca implementa debounce de 300ms para otimizar requisições.

### ✅ TypeScript Completo

Todos os tipos de dados da API estão definidos em `src/types/api.ts`.

## Executando o Projeto

### 1. Iniciar o Backend

```bash
cd api
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:3003`

### 2. Iniciar o App React Native

```bash
npm install
npm start
```

### 3. Configurar a URL da API

Edite `src/api/apiConfig.ts` se necessário:

```typescript
export const API_BASE_URL =
  process.env.API_BASE_URL || "http://10.0.0.208:8000/api";
```

## Estrutura de Arquivos

```
src/
├── api/
│   └── apiConfig.ts          # Configuração da API
├── services/
│   ├── featuresService.ts    # Service de features (Home)
│   ├── contactsService.ts    # Service de contatos
│   └── searchService.ts      # Service de busca
├── types/
│   ├── api.ts               # Tipos da API
│   └── common.ts            # Tipos compartilhados
└── screens/
    ├── HomeScreen.tsx        # ✅ Integrado com API
    ├── BuscaScreen.tsx       # ✅ Integrado com API
    └── ContatoScreen.tsx     # ✅ Integrado com API

api/
├── src/
│   ├── routes/
│   │   ├── features.js       # Endpoints de features
│   │   ├── contacts.js       # Endpoints de contatos
│   │   └── search.js         # Endpoints de busca
│   └── server.js             # Configuração do Express
└── package.json
```

## Próximos Passos

### Melhorias Sugeridas

1. **Cache de Dados**
   - Implementar AsyncStorage para cache local
   - Reduzir requisições desnecessárias

2. **Offline First**
   - Detectar conexão de rede
   - Modo offline completo com dados em cache

3. **Paginação**
   - Implementar infinite scroll na busca
   - Carregar dados sob demanda

4. **Real Backend**
   - Substituir dados mock por dados reais
   - Integrar com PostgreSQL de verdade

5. **Autenticação**
   - JWT tokens
   - Login/Registro de usuários

## Troubleshooting

### API não conecta

1. Verifique se o servidor Express está rodando
2. Confirme a URL em `apiConfig.ts`
3. No Android Emulator, use `10.0.2.2:3003`
4. No iOS Simulator, use `localhost:3003`

### Dados mock aparecem sempre

- Verifique o console para erros de rede
- Teste o endpoint diretamente no navegador
- Confirme que o CORS está configurado no backend

## Tecnologias Utilizadas

### Frontend

- React Native 0.81.5
- TypeScript 5.3.3
- Expo SDK ~54.0.0
- React Navigation

### Backend

- Express.js 5.2.1
- CORS 2.8.6
- PostgreSQL (pg 8.22.0)
- Node.js

## Contribuindo

Para adicionar novos endpoints:

1. Crie o arquivo de rota em `api/src/routes/`
2. Registre a rota em `api/src/server.js`
3. Crie o service correspondente em `src/services/`
4. Atualize os tipos em `src/types/api.ts`
5. Integre na tela correspondente

---

**Versão:** 2.0  
**Data:** 2025  
**Status:** ✅ Produção
