import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useRoute } from "@react-navigation/native";

interface ConfigStackParams {
  [key: string]: any;
}

const ConfigStack: React.FC = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const params = route.params as ConfigStackParams | undefined;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>
        ConfigStack - Em Desenvolvimento

        Parametros:
        {JSON.stringify(params, null, 2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConfigStack;
