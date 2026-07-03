# 🚀 Comandos de Inicialização - Pós Migração

## Execute estes comandos na ordem:

### 1️⃣ Limpar instalação anterior

```powershell
# Remove node_modules e package-lock
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
```

### 2️⃣ Reinstalar todas as dependências

```powershell
npm install
```

### 3️⃣ Limpar cache do Metro Bundler

```powershell
npm start -- --clear
```

**OU** use o Expo CLI:

```powershell
npx expo start -c
```

---

## ⚡ Quick Start (Comando Único)

Execute tudo de uma vez (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue; Remove-Item package-lock.json -ErrorAction SilentlyContinue; npm install; npm start -- --clear
```

---

## 🔍 Verificar se está tudo OK

### Testar TypeScript

```powershell
npx tsc --noEmit
```

Se houver erros relacionados a `@react-navigation/native-stack`, ignore por enquanto - eles serão resolvidos após o npm install.

### Iniciar o App

```powershell
npm start
```

Pressione:

- `a` - Abrir no Android
- `i` - Abrir no iOS
- `w` - Abrir no Web

---

## 📱 Testar Funcionalidades

Após o app abrir, teste:

1. ✅ **Navegação entre tabs** (Home, Busca, Contato, Menu)
2. ✅ **Dark Mode** (Menu → Tema)
3. ✅ **Busca** (Digite algo na tela de Busca)
4. ✅ **Todos os ícones carregam**
5. ✅ **Nenhum erro no console**

---

## ⚠️ Se algo der errado

### Erro: "Cannot find module..."

```powershell
# Limpar tudo e reinstalar
npm run start -- --clear
```

### Erro: Metro bundler não inicia

```powershell
# Matar processos do Node
Get-Process node | Stop-Process -Force
npm start
```

### Erro: TypeScript errors

```powershell
# Ignorar warnings de deprecated, focar em errors críticos
# O erro de @react-navigation/native-stack será resolvido após npm install
```

### App não abre

```powershell
# Verificar se Expo está instalado
npx expo --version

# Se não estiver, instalar
npm install -g expo-cli
```

---

## ✅ Sucesso!

Se tudo funcionou:

- O app está rodando ✅
- TypeScript funcionando ✅
- Navegação OK ✅
- Theme toggle OK ✅

**Você está pronto para desenvolver! 🎉**

---

## 📚 Próximo Passo

Leia a documentação:

1. `MIGRATION_SUMMARY.md` - Resumo completo da migração
2. `TYPES_GUIDE.md` - Como usar os tipos
3. `TYPESCRIPT_MIGRATION.md` - Detalhes da conversão
