import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../styles/globalStyles";
import {
  BuscaScreen,
  ContatoScreen,
  HomeScreen,
  MenuScreen,
} from "../navigation";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { colors } = useTheme();

  const option = {
    headerShown: false,
    tabBarActiveTintColor: colors.tabBarActive,
    tabBarInactiveTintColor: colors.tabBarInactive,
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: "600",
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
    <Tab.Navigator initialRouteName="HomeTab" screenOptions={option}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="BuscaTab"
        component={BuscaScreen}
        options={{
          title: "Busca",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="ContatoTab"
        component={ContatoScreen}
        options={{
          title: "Contato",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
