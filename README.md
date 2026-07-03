# 🚀 React Native Base Template

Template pronto para iniciar projetos React Native com configurações essenciais.

## ⚡ Como usar

### Clonar o template

```bash
git clone https://github.com/seuusuario/react-native-base-template.git meu-app
cd meu-app
```

### Instalar dependências (escolha um)

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

### Rodar o app

```bash
# Android
npm run android

# iOS (Mac)
npm run ios

# Iniciar Metro
npm start
```

---

## 📦 Dependências inclusas

- ✅ React Navigation (Stack)
- ✅ Gesture Handler
- ✅ Safe Area Context
- ✅ React Native Screens
- ✅ Vector Icons
- ✅ Axios
- ✅ Async Storage
- ✅ ESLint + Prettier configurados
- ✅ VS Code settings prontos

---

## 📁 Estrutura

```
src/
├── components/  # Componentes reutilizáveis
├── screens/     # Telas do app
├── navigation/  # Configuração de rotas
├── styles/      # Estilos globais
└── utils/       # Funções auxiliares
```

---

## 🛠️ Scripts úteis

| Comando                           | Descrição                     |
| --------------------------------- | ----------------------------- |
| `npm start`                       | Inicia o Metro Bundler        |
| `npm run android`                 | Roda no Android               |
| `npm run ios`                     | Roda no iOS (Mac)             |
| `npm run lint`                    | Verifica o código com ESLint  |
| `npm run format`                  | Formata o código com Prettier |
| `npm run clean`                   | Limpa o build do Android      |
| `npm run create NomeDoComponente` | Gera um novo componente       |

---

## 📱 Pré-requisitos

- Node.js 18+
- JDK 17
- Android Studio (para Android)
- Xcode (para iOS — apenas Mac)

---

## 🎯 Criar um novo projeto a partir deste template

```bash
git clone https://github.com/seuusuario/react-native-base-template.git meu-novo-app
cd meu-novo-app
rm -rf .git   # Remove o histórico do template
git init      # Inicia um novo repositório
pnpm install  # Instala as dependências
```

---

## ✨ Geradores de código

### Criar novo componente

```bash
pnpm run create MeuComponente
```

Isso cria automaticamente:

```
src/components/MeuComponente/
├── MeuComponente.js   # Componente React Native
└── styles.js          # Estilos separados
```

---
