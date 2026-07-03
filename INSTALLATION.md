# 📋 Guia de Instalação Pós-Migração

## 🚀 Passos para Completar a Migração

### 1. Limpar instalação anterior

```bash
# Windows (PowerShell)
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

### 2. Reinstalar dependências

```bash
npm install
```

### 3. Instalar tipos TypeScript faltantes (se necessário)

```bash
npm install --save-dev @types/react-native
```

### 4. Limpar cache do Metro bundler

```bash
npm start -- --clear
# ou
npx expo start -c
```

### 5. Verificar erros de tipo

```bash
npx tsc --noEmit
```

## ⚠️ Possíveis Problemas

### Erro: "Cannot find module '@react-navigation/native-stack'"

Os tipos para React Navigation já devem estar incluídos nas versões recentes. Se o erro persistir:

1. Verifique se o pacote está instalado:

   ```bash
   npm list @react-navigation/stack @react-navigation/native @react-navigation/bottom-tabs
   ```

2. Se não estiver, instale:
   ```bash
   npm install @react-navigation/stack @react-navigation/native @react-navigation/bottom-tabs
   ```

### Erro de baseUrl deprecated

Este é apenas um warning do TypeScript 7.0. O projeto continuará funcionando normalmente. Se quiser silenciar o warning, ele já está configurado com `"ignoreDeprecations": "6.0"` no tsconfig.json.

## 🧹 Limpeza (Opcional)

Após confirmar que tudo está funcionando, você pode remover os arquivos JavaScript antigos:

```bash
# ATENÇÃO: Faça backup antes de executar!

# Remover arquivos .js antigos
Remove-Item -Recurse -Include "*.js" -Exclude "babel.config.js","metro.config.js","index.js" -Path src

# Remover arquivos .jsx antigos
Remove-Item -Recurse -Include "*.jsx" -Path src
```

**IMPORTANTE**: Mantenha os seguintes arquivos .js:

- `index.js` (entrada do app)
- `babel.config.js` (configuração do Babel)
- `metro.config.js` (se existir)
- Qualquer outro arquivo de configuração na raiz

## ✅ Checklist

- [ ] node_modules reinstalado
- [ ] Cache do Metro limpo
- [ ] App inicia sem erros
- [ ] Navegação funcionando
- [ ] Temas (dark/light) funcionando
- [ ] Todos os componentes renderizando corretamente
- [ ] TypeScript sem erros críticos

## 🎯 Estrutura Final

```
NewReactNative/
├── App.tsx (✅ convertido)
├── index.js (mantido - entrada do app)
├── tsconfig.json (✅ criado)
├── package.json (mantido)
├── src/
│   ├── api/ (✅ todos .ts)
│   ├── components/ (✅ todos .tsx)
│   ├── context/ (✅ todos .tsx)
│   ├── hook/ (✅ todos .tsx)
│   ├── navigation/ (✅ todos .tsx/.ts)
│   ├── screens/ (✅ todos .tsx)
│   ├── services/ (✅ todos .ts)
│   ├── stacks/ (✅ todos .tsx)
│   ├── styles/ (✅ todos .ts)
│   ├── themes/ (✅ todos .ts)
│   ├── types/ (✅ nova pasta!)
│   │   ├── index.ts
│   │   ├── common.ts
│   │   ├── components.ts
│   │   ├── screens.ts
│   │   ├── navigation.ts
│   │   ├── context.ts
│   │   ├── hooks.ts
│   │   └── api.ts
│   └── utils/ (✅ todos .ts)
└── TYPESCRIPT_MIGRATION.md (✅ documentação)
```

## 🆘 Suporte

Se encontrar problemas:

1. Verifique a documentação em `TYPESCRIPT_MIGRATION.md`
2. Confirme que todas as dependências estão instaladas
3. Limpe o cache e reinstale node_modules
4. Verifique os logs de erro no terminal

---

**Migração concluída com sucesso! 🎉**
