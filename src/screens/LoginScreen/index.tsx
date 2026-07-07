import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { SPACING, TYPOGRAPHY, RADIUS } from "../../styles/globalStyles";
import { RootStackScreenProps } from "../../types/navigation";

const LoginScreen: React.FC<RootStackScreenProps<"Login">> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const avisarEmBreve = (recurso: string) => {
    Alert.alert("Em breve", `${recurso} ainda não está disponível.`);
  };

  const handleEntrar = async () => {
    if (!email || !senha) {
      setErro("Preencha e-mail e senha para continuar.");
      return;
    }

    setErro("");
    setLoading(true);
    try {
      await signIn(email.trim(), senha);
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.mensagem ||
        "Não foi possível entrar. Tente novamente.";
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={32}
          color={colors.text}
        />
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: colors.text }]}>Entrar</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Acesse sua conta para continuar.
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>E-mail</Text>
        <View
          style={[styles.inputWrapper, { backgroundColor: colors.surface }]}
        >
          <View
            style={[
              styles.inputIcon,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={18}
              color={colors.primary}
            />
          </View>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="seu.email@exemplo.com"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
        <View
          style={[styles.inputWrapper, { backgroundColor: colors.surface }]}
        >
          <View
            style={[
              styles.inputIcon,
              { backgroundColor: colors.primary + "15" },
            ]}
          >
            <MaterialCommunityIcons
              name="lock-outline"
              size={18}
              color={colors.primary}
            />
          </View>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="••••••••"
            placeholderTextColor={colors.placeholder}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <MaterialCommunityIcons
              name={senhaVisivel ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => avisarEmBreve("A recuperação de senha")}
        >
          <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        {!!erro && (
          <Text style={[styles.error, { color: colors.danger }]}>{erro}</Text>
        )}

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleEntrar}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={colors.textInverse} />
          ) : (
            <Text
              style={[styles.submitButtonText, { color: colors.textInverse }]}
            >
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.divider }]}
          />
          <Text style={[styles.dividerText, { color: colors.textMuted }]}>
            ou
          </Text>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.divider }]}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.googleButton,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
          onPress={() => avisarEmBreve("O login com Google")}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="google" size={20} color={colors.text} />
          <Text style={[styles.googleButtonText, { color: colors.text }]}>
            Entrar com Google
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Não tem uma conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => avisarEmBreve("A criação de conta")}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.large,
    paddingBottom: SPACING.xxlarge,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginTop: SPACING.large,
    marginLeft: SPACING.large,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontWeight: "bold",
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.xs,
    marginBottom: SPACING.large,
  },
  label: {
    ...TYPOGRAPHY.small,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACING.small,
    marginBottom: SPACING.medium,
  },
  inputIcon: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.medium,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.small,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    paddingVertical: SPACING.medium,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: SPACING.large,
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.small,
    fontWeight: "600",
  },
  error: {
    ...TYPOGRAPHY.small,
    marginBottom: SPACING.medium,
  },
  submitButton: {
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.large,
    alignItems: "center",
  },
  submitButtonText: {
    ...TYPOGRAPHY.button,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.large,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    ...TYPOGRAPHY.small,
    marginHorizontal: SPACING.medium,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: SPACING.medium,
    borderRadius: RADIUS.large,
  },
  googleButtonText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.small,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.large,
  },
  footerText: {
    ...TYPOGRAPHY.small,
  },
  footerLink: {
    ...TYPOGRAPHY.small,
    fontWeight: "700",
  },
});

export default LoginScreen;
