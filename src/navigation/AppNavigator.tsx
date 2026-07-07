import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, ActivityIndicator } from "react-native";
import MainTabs from "./MainTabs";
import appJson from "../../app.json";
import { ConfigStack, WelcomeScreen, LoginScreen } from "../navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { colors } = useTheme();
  const { user, loading } = useAuth();

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
      fontWeight: "bold" as const,
      color: colors.text,
    },
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={user ? "Base" : "Welcome"}
      >
        {user ? (
          <>
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
                      Template Base React Native
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
            <Stack.Screen
              name="ConfigStack"
              component={ConfigStack}
              options={{ title: "Configurações" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
