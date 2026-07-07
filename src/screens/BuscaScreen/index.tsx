import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { SearchResult } from "../../types/common";
import { searchItems } from "../../services/searchService";

const BuscaScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState<string>("");
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carrega TODOS os dados uma única vez
  useEffect(() => {
    loadAllData();
  }, []);

  // Filtra localmente conforme o usuário digita
  useEffect(() => {
    filterResults(searchText);
  }, [searchText, allData]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const results = await searchItems();
      setAllData(results);
      setSearchResults(results);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterResults = (query: string) => {
    if (!query || query.trim() === "") {
      setSearchResults(allData);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = allData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.subtitle.toLowerCase().includes(lowerQuery) ||
        (item.tags &&
          item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))),
    );
    setSearchResults(filtered);
  };

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACING.medium,
    ...TYPOGRAPHY.body,
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
