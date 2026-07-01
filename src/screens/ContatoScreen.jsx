import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from "../styles/globalStyles";

const ContatoScreen = () => {
  const { colors } = useTheme();

  const contacts = [
    {
      id: 1,
      icon: "email",
      title: "Email",
      value: "contato@exemplo.com",
      action: () => Linking.openURL("mailto:contato@exemplo.com"),
    },
    {
      id: 2,
      icon: "phone",
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      action: () => Linking.openURL("tel:+5511999999999"),
    },
    {
      id: 3,
      icon: "whatsapp",
      title: "WhatsApp",
      value: "+55 (11) 99999-9999",
      action: () => Linking.openURL("https://wa.me/5511999999999"),
    },
    {
      id: 4,
      icon: "web",
      title: "Website",
      value: "www.exemplo.com",
      action: () => Linking.openURL("https://www.exemplo.com"),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.contactList}>
        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactCard, { backgroundColor: colors.surface }]}
            onPress={contact.action}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialCommunityIcons
                name={contact.icon}
                size={28}
                color={colors.primary}
              />
            </View>
            <View style={styles.contactContent}>
              <Text
                style={[styles.contactTitle, { color: colors.textSecondary }]}
              >
                {contact.title}
              </Text>
              <Text style={[styles.contactValue, { color: colors.text }]}>
                {contact.value}
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[styles.socialContainer, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.socialTitle, { color: colors.text }]}>
          Redes Sociais
        </Text>
        <View style={styles.socialButtons}>
          {["instagram", "facebook", "twitter", "linkedin"].map((social) => (
            <TouchableOpacity
              key={social}
              style={[
                styles.socialButton,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialCommunityIcons
                name={social}
                size={28}
                color={colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactList: {
    paddingTop: SPACING.xlarge,
    paddingHorizontal: SPACING.medium,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.medium,
    borderRadius: RADIUS.large,
    marginBottom: SPACING.medium,
    ...SHADOWS.small,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
  },
  contactContent: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  contactTitle: {
    ...TYPOGRAPHY.small,
  },
  contactValue: {
    ...TYPOGRAPHY.h4,
    marginTop: SPACING.xs,
  },
  socialContainer: {
    margin: SPACING.medium,
    padding: SPACING.large,
    borderRadius: RADIUS.large,
    ...SHADOWS.medium,
  },
  socialTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.medium,
    textAlign: "center",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.round,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContatoScreen;
