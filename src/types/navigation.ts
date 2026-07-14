import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";

// Root Stack Navigator
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Base: undefined;
  ConfigStack: undefined;
  TesteQR: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

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
    NativeStackScreenProps<ConfigStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
