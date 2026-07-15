# Guia: rodar Expo no celular via cabo USB (celular em outra rede)

Este guia configura um app **Expo** para rodar num **celular físico Android** conectado por
**cabo USB**, mesmo quando o celular está em **outra rede** que o PC. Serve para quando o
backend também roda **local no PC** em uma porta separada.

> **Por que USB e não Wi-Fi?** O modo `LAN` padrão do Expo exige celular e PC na mesma rede.
> Com o celular em outra rede (4G, outro Wi-Fi), usamos `adb reverse`: o celular acessa o
> `localhost` do próprio PC pelo cabo. Alternativa sem cabo: `npx expo start --tunnel`
> (funciona de qualquer rede, mas é mais lento).

---

## O que este setup entrega

- App carrega no celular pelo cabo (porta do **Metro = 8081**)
- Backend/login funciona pelo cabo (porta da **API**, ex.: `3003`)
- Independe da rede do celular
- Um único comando pra subir tudo: `npm run android_usb`

---

## ⚡ Info que o Claude precisa pra configurar (resumo)

Quando pedir "configura esse projeto igual ao outro", me passe:

1. **Porta do backend/API** (ex.: `3003`) — descubro sozinho se o backend estiver rodando.
2. **Marca/modelo do celular** (ex.: Xiaomi Redmi Note 13) — pra dicas específicas da depuração USB.
3. Se o **adb já está instalado** (eu verifico).

O resto (env, script, `adb reverse`, PATH) eu configuro.

---

## Passo a passo (do zero)

### 1. Localizar / instalar o `adb`

O `adb` vem no **platform-tools** do Android SDK. Caminho comum no Windows:

```
C:\Users\<USUARIO>\AppData\Local\Android\Sdk\platform-tools\adb.exe
```

Se **não tiver**, baixe o "SDK Platform-Tools" do site do Android e extraia numa pasta.

### 2. Colocar o `adb` no PATH (permanente, por usuário)

No PowerShell:

```powershell
$tools = "C:\Users\<USUARIO>\AppData\Local\Android\Sdk\platform-tools"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$tools*") {
  [Environment]::SetEnvironmentVariable("Path", ($userPath.TrimEnd(';')) + ";" + $tools, "User")
}
```

> ⚠️ A mudança de PATH só vale em **terminais novos**. No VSCode, **feche e reabra o VSCode**
> por completo (ele guarda o ambiente de quando abriu). Solução imediata sem reabrir:
> `set PATH=%PATH%;C:\...\platform-tools` no cmd atual.

### 3. Preparar o celular (Android)

1. **Ativar Opções do desenvolvedor:** Configurações → Sobre o telefone → toque **7×** em
   "Número da versão".
2. Dentro de **Opções do desenvolvedor**, ative **Depuração USB**.
3. Conecte o cabo USB.
4. **Modo USB = Transferência de arquivos (MTP)** — puxe a notificação de USB e troque
   (se ficar em "Somente carregamento", o adb não enxerga o aparelho).
5. Aceite o pop-up **"Permitir depuração USB?"** no celular (marque "sempre permitir").

**Específico Xiaomi / MIUI / HyperOS:**
- Se a "Depuração USB" não gerar o pop-up: desligue e ligue de novo o toggle e aceite o aviso.
- "Revogar autorizações de depuração USB" força o pop-up a reaparecer.
- Alguns modelos exigem **conta Mi + SIM** para liberar as opções de segurança USB.
- Muitos cabos são **só de carga** (sem fios de dados) — teste com o cabo original.

### 4. Confirmar que o celular foi reconhecido

```bash
adb kill-server
adb devices -l
```

Deve listar algo como `cb0065ef  device  model:...`. Diagnóstico:
- **Lista vazia** → problema de cabo ou modo USB (não é autorização ainda).
- **`unauthorized`** → falta aceitar o pop-up no celular.
- No Windows, dá pra checar se o aparelho aparece: `Get-PnpDevice` (classe `WPD` = MTP OK).

### 5. Apontar a API para `localhost` (com prefixo `EXPO_PUBLIC_`)

No **Expo SDK 49+**, só variáveis com prefixo **`EXPO_PUBLIC_`** chegam ao código do app.
Sem o prefixo, a var é ignorada no bundle e o código cai no valor fixo (fallback).

**`.env`:**
```env
# Via cabo USB (adb reverse): use localhost.
# Mesma rede Wi-Fi: troque pelo IP do PC, ex http://10.0.0.208:3003
EXPO_PUBLIC_API_BASE_URL=http://localhost:3003
```

**No código (ex.: `src/apiApp/apiConfig.js`):**
```js
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3003";
```

> Troque `3003` pela porta real do backend do projeto.

### 6. Redirecionar as portas com `adb reverse`

`adb reverse` faz o `localhost:<porta>` **do celular** apontar para o `localhost:<porta>` **do PC**:

```bash
adb reverse tcp:8081 tcp:8081   # Metro (bundle)
adb reverse tcp:3003 tcp:3003   # Backend/API
adb reverse --list              # confere os ativos
```

> Cai ao **desconectar o cabo** ou **reiniciar o Metro** — basta rodar de novo.

### 7. Script único no `package.json`

```json
"scripts": {
  "android_usb": "adb reverse tcp:8081 tcp:8081 && adb reverse tcp:3003 tcp:3003 && expo start --localhost"
}
```

### 8. Rodar

Com o cabo plugado:

```bash
npm run android_usb
```

Abra no **Expo Go** (ou aperte `a` no terminal). Se a API não atualizar de primeira
(valor antigo em cache), limpe o cache uma vez: `npx expo start --localhost -c`.

---

## Fluxo do dia a dia

1. Plugar o cabo USB no celular
2. `npm run android_usb`
3. Desenvolver (hot reload + login funcionando)

---

## Troubleshooting rápido

| Sintoma | Causa provável | Solução |
|---|---|---|
| `'adb' não é reconhecido` | PATH não recarregado | Reabrir terminal / reiniciar VSCode; ou `set PATH=...` |
| `adb devices` vazio | Cabo só-carga ou modo "somente carregamento" | Trocar cabo; USB → Transferência de arquivos (MTP) |
| `adb devices` = `unauthorized` | Pop-up não aceito | Aceitar "Permitir depuração USB?" no celular |
| App abre mas **login falha** | Backend em outra porta não redirecionada | `adb reverse tcp:<porta> tcp:<porta>` + API em `localhost` |
| API pega valor antigo | Var sem prefixo `EXPO_PUBLIC_` ou cache | Usar `EXPO_PUBLIC_`, reiniciar Metro com `-c` |
| Conexão cai sozinha | Cabo desconectado / Metro reiniciado | Rodar `npm run android_usb` de novo |

---

## Alternativa sem cabo (qualquer rede)

```bash
npm install --save-dev @expo/ngrok
npx expo start --tunnel
```

Funciona por Wi-Fi/4G de qualquer rede (útil pra iPhone ou quando não dá pra usar cabo),
mas o hot reload é mais lento por passar por um servidor externo. Nesse caso a API precisa
estar acessível publicamente (ou também via túnel), então o `localhost` **não** vale — use
uma URL alcançável pela internet.
