import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from "../styles/globalStyles";
import { MenuSection } from "../types/common";

const MenuScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  const menuSections: MenuSection[] = [
    {
      title: "Preferências",
      items: [
        {
          icon: "theme-light-dark",
          title: "Tema",
          subtitle: isDark ? "Modo escuro" : "Modo claro",
          hasSwitch: true,
          value: isDark,
          onPress: toggleTheme,
        },
        {
          icon: "bell",
          title: "Notificações",
          subtitle: "Gerenciar notificações",
          hasArrow: true,
        },
        {
          icon: "translate",
          title: "Idioma",
          subtitle: "Português (Brasil)",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Conta",
      items: [
        {
          icon: "account",
          title: "Perfil",
          subtitle: "Ver e editar perfil",
          hasArrow: true,
        },
        {
          icon: "shield-account",
          title: "Privacidade",
          subtitle: "Configurações de privacidade",
          hasArrow: true,
        },
        {
          icon: "lock",
          title: "Segurança",
          subtitle: "Senha e autenticação",
          hasArrow: true,
        },
      ],
    },
    {
      title: "Suporte",
      items: [
        {
          icon: "help-circle",
          title: "Ajuda",
          subtitle: "Central de ajuda",
          hasArrow: true,
        },
        {
          icon: "information",
          title: "Sobre",
          subtitle: "Versão 1.0.0",
          hasArrow: true,
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
            {section.title}
          </Text>
          <View
            style={[styles.sectionContent, { backgroundColor: colors.surface }]}
          >
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex < section.items.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                  },
                ]}
                onPress={item.onPress}
              >
                <View
                  style={[
                    styles.menuIconContainer,
                    { backgroundColor: colors.primary + "15" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.menuContent}>
                  <Text style={[styles.menuTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.menuSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                {item.hasSwitch && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onPress}
                    trackColor={{
                      false: colors.disabled,
                      true: colors.primary + "40",
                    }}
                    thumbColor={item.value ? colors.primary : colors.surface}
                  />
                )}
                {item.hasArrow && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={colors.textMuted}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.danger + "15" }]}
      >
        <MaterialCommunityIcons name="logout" size={24} color={colors.danger} />
        <Text style={[styles.logoutText, { color: colors.danger }]}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACING.large,
  },
  section: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    ...TYPOGRAPHY.small,
    fontWeight: "600",
    textTransform: "uppercase",
    marginLeft: SPACING.large,
    marginBottom: SPACING.small,
  },
  sectionContent: {
    marginHorizontal: SPACING.medium,
    borderRadius: RADIUS.large,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.medium,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  menuTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
  },
  menuSubtitle: {
    ...TYPOGRAPHY.small,
    marginTop: SPACING.xs / 2,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: SPACING.large,
    marginBottom: SPACING.xxlarge,
    padding: SPACING.medium,
    borderRadius: RADIUS.large,
  },
  logoutText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.small,
  },
});

export default MenuScreen;
