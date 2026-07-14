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
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { MenuSection } from "../../types/common";
import { MainTabsScreenProps } from "../../types";

const MenuScreen: React.FC<MainTabsScreenProps<"Menu">> = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const iniciais = (user?.nome || "?")
    .trim()
    .split(/\s+/)
    .map((parte) => parte[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
    {
      title: "Oficina",
      items: [
        {
          icon: "qrcode-scan",
          title: "Teste",
          subtitle: "Ler com QR Code",
          hasArrow: true,
          onPress: () => {
            navigation.navigate("TesteQRStack");
          },
        },
        {
          icon: "qrcode-scan",
          title: "Teste",
          subtitle: "Passando valores nos parametros",
          hasArrow: true,
          onPress: () => {
            navigation.navigate("TesteQRStack", {
              id_teste: Math.random().toString(36).substring(7),
            });
          },
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={[styles.avatarText, { color: colors.textInverse }]}>
            {iniciais}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {user?.nome}
          </Text>
          <Text
            style={[styles.profileEmail, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {user?.email}
          </Text>
          {!!user?.tipo_usuario && (
            <View
              style={[
                styles.profileBadge,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <Text
                style={[styles.profileBadgeText, { color: colors.primary }]}
              >
                {user.tipo_usuario}
              </Text>
            </View>
          )}
        </View>
      </View>

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
        onPress={signOut}
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
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SPACING.medium,
    marginBottom: SPACING.large,
    padding: SPACING.medium,
    borderRadius: RADIUS.large,
    ...SHADOWS.small,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    ...TYPOGRAPHY.h4,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  profileName: {
    ...TYPOGRAPHY.body,
    fontWeight: "700",
  },
  profileEmail: {
    ...TYPOGRAPHY.small,
    marginTop: SPACING.xs / 2,
  },
  profileBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.small,
    paddingVertical: 2,
    borderRadius: RADIUS.small,
    marginTop: SPACING.xs,
  },
  profileBadgeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "700",
    textTransform: "uppercase",
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
