import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";

// Rotas que sabem receber o resultado de uma leitura de QR ({ qrData }).
// Para enviar o scan a outra tela, adicione o nome dela aqui
// (e garanta que ela aceite `qrData` nos params).
export type QRResultRoute = "ConfigStack" | "TesteQRStack";

// Root Stack Navigator
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Base: undefined;
  ConfigStack: { qrData?: string } | undefined;
  TesteQRStack: { id_teste?: string; qrData?: string } | undefined;
  // returnTo: para qual rota o texto lido deve ser enviado.
  QRScanner: { returnTo?: QRResultRoute } | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// Bottom Tab Navigator
export type MainTabsParamList = {
  Home: undefined;
  Busca: undefined;
  Contato: undefined;
  Menu: undefined;
};

export type MainTabsScreenProps<T extends keyof MainTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Config Stack Navigator
export type ConfigStackParamList = {
  MenuScreen: undefined;
};

export type ConfigStackScreenProps<T extends keyof ConfigStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ConfigStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
