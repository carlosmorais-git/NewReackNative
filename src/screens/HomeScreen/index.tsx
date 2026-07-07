import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { Feature } from "../../types/common";
import { getFeatures } from "../../services/featuresService";

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await getFeatures();
      setFeatures(data);
    } catch (error) {
      console.error("Erro ao carregar features:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeatures();
    setRefreshing(false);
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
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
          React Native Base v2.0
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
                name={feature.icon as any}
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

      {features.length === 0 && (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="information-outline"
            size={64}
            color={colors.textMuted}
          />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Nenhuma feature disponível
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACING.medium,
    ...TYPOGRAPHY.body,
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
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxxlarge,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.medium,
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
