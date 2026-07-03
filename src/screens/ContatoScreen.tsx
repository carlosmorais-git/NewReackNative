import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../styles/globalStyles';
import { ContactItem, SocialNetwork } from '../types/common';
import { getContacts } from '../services/contactsService';

const ContatoScreen: React.FC = () => {
  const { colors } = useTheme();
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [socials, setSocials] = useState<SocialNetwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data.contacts);
      setSocials(data.socials);
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleContactPress = (contact: ContactItem) => {
    if (contact.action) {
      Linking.openURL(contact.action);
    }
  };

  const handleSocialPress = (social: SocialNetwork) => {
    if (social.url) {
      Linking.openURL(social.url);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
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
      <View style={styles.contactList}>
        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactCard, { backgroundColor: colors.surface }]}
            onPress={() => handleContactPress(contact)}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primary + "15" },
              ]}
            >
              <MaterialCommunityIcons
                name={contact.icon as any}
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
          {socials.map((social) => (
            <TouchableOpacity
              key={social.id}
              style={[
                styles.socialButton,
                { backgroundColor: colors.primary + '15' },
              ]}
              onPress={() => handleSocialPress(social)}
            >
              <MaterialCommunityIcons
                name={social.icon as any}
                size={28}
                color={colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.medium,
    ...TYPOGRAPHY.body,
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
