import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SHADOWS } from "../styles/globalStyles";
import { MainTabsParamList } from "../types/navigation";
import {
  BuscaScreen,
  ContatoScreen,
  HomeScreen,
  MenuScreen,
} from "../navigation";

const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs: React.FC = () => {
  const { colors } = useTheme();

  const option = {
    headerShown: false,
    tabBarActiveTintColor: colors.tabBarActive,
    tabBarInactiveTintColor: colors.tabBarInactive,
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: "600" as const,
      marginBottom: 4,
    },
    tabBarIconStyle: {
      marginTop: 4,
    },
    tabBarStyle: {
      backgroundColor: colors.tabBarBackground,
      borderTopWidth: 1,
      borderTopColor: colors.divider,
      height: 70,
      paddingTop: 8,
      paddingBottom: 8,
      ...SHADOWS.large,
    },
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={option}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Busca"
        component={BuscaScreen}
        options={{
          title: "Busca",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Contato"
        component={ContatoScreen}
        options={{
          title: "Contato",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="phone" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
