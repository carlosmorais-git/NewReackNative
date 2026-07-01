import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

const AppContent = () => {
  const { isDark, colors } = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.surface }]}
      >
        <StatusBar style={isDark ? "light" : "dark"} />
        <AppNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
