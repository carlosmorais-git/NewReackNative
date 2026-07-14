import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { RootStackScreenProps } from "../../types/navigation";
import appJson from "../../../app.json";

const WelcomeScreen: React.FC<RootStackScreenProps<"Welcome">> = ({
  navigation,
}) => {
  const { colors } = useTheme();

  const avisarEmBreve = (recurso: string) => {
    Alert.alert("Em breve", `${recurso} ainda não está disponível.`);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View
          style={[
            styles.circleTopRight,
            { backgroundColor: colors.primaryDark },
          ]}
        />
        <View
          style={[
            styles.circleBottomLeft,
            { backgroundColor: colors.primaryDark },
          ]}
        />

        <View style={[styles.logoBox, { backgroundColor: colors.textInverse }]}>
          <MaterialCommunityIcons
            name="rocket-launch"
            size={56}
            color={colors.primary}
          />
        </View>
        <Text style={[styles.appName, { color: colors.textInverse }]}>
          {appJson.expo.name}
        </Text>
        <Text style={[styles.tagline, { color: colors.textInverse }]}>
          Tudo pronto para começar seu projeto
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => avisarEmBreve("A criação de conta")}
          activeOpacity={0.85}
        >
          <Text
            style={[styles.primaryButtonText, { color: colors.textInverse }]}
          >
            Criar conta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          onPress={() => avisarEmBreve("O login com Google")}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="google" size={20} color={colors.text} />
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Entrar com Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tertiaryButton, { backgroundColor: colors.divider }]}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.85}
        >
          <Text style={[styles.tertiaryButtonText, { color: colors.primary }]}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: colors.border, backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate("TesteQR")}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={20}
            color={colors.text}
          />
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Testar Scanner QR
          </Text>
        </TouchableOpacity>

        <Text style={[styles.terms, { color: colors.textMuted }]}>
          Ao continuar, você aceita os Termos de Uso{"\n"}e a Política de
          Privacidade.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    flexGrow: 1.1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.large,
    overflow: "hidden",
  },
  circleTopRight: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 160,
    height: 160,
    borderRadius: RADIUS.round,
    opacity: 0.6,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -70,
    left: -70,
    width: 180,
    height: 180,
    borderRadius: RADIUS.round,
    opacity: 0.6,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.xlarge,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.large,
    ...SHADOWS.medium,
  },
  appName: {
    ...TYPOGRAPHY.h2,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    ...TYPOGRAPHY.body,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  actions: {
    paddingHorizontal: SPACING.large,
    padding: SPACING.xlarge,
  },
  primaryButton: {
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.large,
    alignItems: "center",
    ...SHADOWS.small,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.button,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.large,
    marginTop: SPACING.medium,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.small,
  },
  tertiaryButton: {
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.large,
    alignItems: "center",
    marginTop: SPACING.medium,
  },
  tertiaryButtonText: {
    ...TYPOGRAPHY.button,
  },
  terms: {
    ...TYPOGRAPHY.caption,
    textAlign: "center",
    marginTop: SPACING.large,
    lineHeight: 18,
  },
});

export default WelcomeScreen;
