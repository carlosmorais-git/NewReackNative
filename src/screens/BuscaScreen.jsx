import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from "../styles/globalStyles";

const BuscaScreen = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  const searchResults = [
    { id: 1, title: "React Native", subtitle: "Framework mobile" },
    { id: 2, title: "JavaScript", subtitle: "Linguagem de programação" },
    { id: 3, title: "TypeScript", subtitle: "JavaScript tipado" },
  ].filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[styles.searchContainer, { backgroundColor: colors.surface }]}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={colors.textMuted}
        />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar..."
          placeholderTextColor={colors.placeholder}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.results}>
        {searchResults.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.resultCard, { backgroundColor: colors.surface }]}
          >
            <MaterialCommunityIcons
              name="file-document"
              size={32}
              color={colors.primary}
            />
            <View style={styles.resultContent}>
              <Text style={[styles.resultTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text
                style={[styles.resultSubtitle, { color: colors.textSecondary }]}
              >
                {item.subtitle}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        ))}
        {searchResults.length === 0 && searchText.length > 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="magnify-close"
              size={64}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Nenhum resultado encontrado
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: RADIUS.large,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.small,
    ...TYPOGRAPHY.body,
  },
  results: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.medium,
    borderRadius: RADIUS.medium,
    marginBottom: SPACING.small,
    ...SHADOWS.small,
  },
  resultContent: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  resultTitle: {
    ...TYPOGRAPHY.h4,
  },
  resultSubtitle: {
    ...TYPOGRAPHY.small,
    marginTop: SPACING.xs,
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
});

export default BuscaScreen;
