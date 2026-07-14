# Guia: Deep Links com React Navigation (Expo)

## Visão geral

Deep Links permitem abrir uma tela específica do aplicativo através de
uma URL.

Exemplos:

-   Desenvolvimento: `escola://alunos/123`
-   Produção: `https://escola.com/alunos/123`

## 1. Configuração do app

### app.json

``` json
{
  "expo": {
    "scheme": "escola",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "escola.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    }
  }
}
```

-   `scheme` é usado para links como `escola://...`.
-   O domínio é usado em produção com App Links/Universal Links.

## 2. Estrutura sugerida

    src/
     ├── navigation/
     │    ├── AppNavigator.tsx
     │    ├── linking.ts
     │    └── RootStack.tsx

O arquivo `linking.ts` concentra todas as rotas de Deep Link.

## 3. Criando o linking.ts

``` ts
const linking = {
  prefixes: [
    "escola://",
    "https://escola.com"
  ],
  config: {
    screens: {
      Aluno: "alunos/:id",
      Provas: "alunos/:id/provas/:provaId"
    }
  }
};

export default linking;
```

## 4. Registrando no NavigationContainer

``` tsx
<NavigationContainer linking={linking}>
  {/* stacks */}
</NavigationContainer>
```

## 5. Registrando a tela

``` tsx
<Stack.Screen
  name="Provas"
  component={ProvasScreen}
/>
```

Observe que o caminho da pasta não importa. O React Navigation usa o
nome da tela.

## 6. Consumindo parâmetros

URL:

    https://escola.com/alunos/45/provas/8

Na tela:

``` ts
const route = useRoute();

console.log(route.params.id);       // 45
console.log(route.params.provaId);  // 8
```

Cada `:nome` da rota vira um parâmetro em `route.params`.

## 7. Desenvolvimento

Durante os testes você pode abrir:

    escola://alunos/45

ou, dependendo da configuração do Expo Go:

    exp://IP:8081/--/alunos/45

## 8. Produção

Compartilhe apenas links HTTPS:

    https://escola.com/alunos/45

Fluxo:

1.  Usuário clica no link.
2.  Se o app estiver instalado, o sistema abre o aplicativo.
3.  Caso contrário, abre o site.

O backend continua independente. O app recebe o parâmetro (`id`) e faz
sua chamada para a API normalmente.
