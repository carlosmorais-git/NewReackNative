import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import MainTabs from "./MainTabs";
import appJson from "../../app.json";
import { ConfigStack } from "../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SPACING } from "../styles/globalStyles";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { colors } = useTheme();

  const screenOptions = {
    headerShown: true,
    cardStyle: { backgroundColor: colors.background },
    headerStyle: {
      backgroundColor: colors.surface,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      height: 80,
    },
    headerTintColor: colors.primary,
    headerTitleStyle: {
      fontWeight: "bold",
      color: colors.text,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Base">
        <Stack.Screen
          name="Base"
          component={MainTabs}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => (
              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {appJson.expo.name}
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 12,
                  }}
                >
                  {appJson.expo.description}
                </Text>
              </View>
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                name="rocket-launch-outline"
                size={28}
                color={colors.primary}
                style={{ marginLeft: 16, transform: [{ rotate: "-20deg" }] }}
              />
            ),
          })}
        />
        {/* Menu */}
        <Stack.Screen
          name="ConfigStack"
          component={ConfigStack}
          options={{ title: "Configurações" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
