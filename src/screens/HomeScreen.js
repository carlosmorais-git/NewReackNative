import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from "../styles/globalStyles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const features = [
    {
      id: 1,
      icon: "rocket-launch",
      title: "Início Rápido",
      description: "Comece seu projeto em minutos",
      color: "#6C63FF",
    },
    {
      id: 2,
      icon: "palette",
      title: "Temas",
      description: "Dark mode e light mode",
      color: "#FF6584",
    },
    {
      id: 3,
      icon: "code-tags",
      title: "Código Limpo",
      description: "Estrutura organizada",
      color: "#2ECC71",
    },
    {
      id: 4,
      icon: "gesture-swipe",
      title: "Navegação",
      description: "Tabs e Stack prontos",
      color: "#F39C12",
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.hero}>
        <View
          style={[styles.heroIcon, { backgroundColor: colors.primary + "15" }]}
        >
          <MaterialCommunityIcons
            name="rocket-launch"
            size={64}
            color={colors.primary}
          />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          React Native Base
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Tudo pronto para começar seu projeto!
        </Text>
      </View>

      <View style={styles.featuresGrid}>
        {features.map((feature) => (
          <View
            key={feature.id}
            style={[styles.featureCard, { backgroundColor: colors.surface }]}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: feature.color + "15" },
              ]}
            >
              <MaterialCommunityIcons
                name={feature.icon}
                size={32}
                color={feature.color}
              />
            </View>
            <Text style={[styles.featureTitle, { color: colors.text }]}>
              {feature.title}
            </Text>
            <Text
              style={[
                styles.featureDescription,
                { color: colors.textSecondary },
              ]}
            >
              {feature.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    alignItems: "center",
    paddingVertical: SPACING.xlarge,
    paddingHorizontal: SPACING.large,
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.large,
  },
  heroTitle: {
    ...TYPOGRAPHY.h2,
    textAlign: "center",
    marginBottom: SPACING.small,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.bodyLarge,
    textAlign: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.small,
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    padding: SPACING.medium,
    borderRadius: RADIUS.large,
    marginBottom: SPACING.medium,
    alignItems: "center",
    ...SHADOWS.small,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.medium,
  },
  featureTitle: {
    ...TYPOGRAPHY.h4,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    ...TYPOGRAPHY.small,
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING.large,
    marginTop: SPACING.medium,
    padding: SPACING.medium,
    borderRadius: RADIUS.large,
    ...SHADOWS.medium,
  },
  modalButtonText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.small,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING.large,
    marginTop: SPACING.medium,
    padding: SPACING.large,
    borderRadius: RADIUS.large,
    ...SHADOWS.large,
  },
  startButtonText: {
    ...TYPOGRAPHY.h3,
    marginRight: SPACING.small,
  },
  footer: {
    alignItems: "center",
    paddingVertical: SPACING.xlarge,
  },
  footerText: {
    ...TYPOGRAPHY.small,
  },
});

export default HomeScreen;
