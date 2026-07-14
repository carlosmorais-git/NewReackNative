import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { RootStackScreenProps } from "../../types/navigation";

const TesteQRStack: React.FC<RootStackScreenProps<"TesteQRStack">> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  // Parâmetros recebidos na navegação:
  const idTeste = route.params?.id_teste; // veio do Menu
  const qrData = route.params?.qrData; // voltou do scanner

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.logoBox, { backgroundColor: colors.primary }]}>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={48}
          color={colors.textInverse}
        />
      </View>

      <Text style={[styles.titulo, { color: colors.text }]}>
        Leitor de QR Code
      </Text>
      <Text style={[styles.subtitulo, { color: colors.textSecondary }]}>
        Toque no botão abaixo para abrir a câmera. O texto lido volta para esta
        tela pelos parâmetros de navegação.
      </Text>

      {!!idTeste && (
        <Text style={[styles.subtitulo, { color: colors.primary }]}>
          Parâmetro recebido — id_teste: {idTeste}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate("QRScanner", { returnTo: "TesteQRStack" })
        }
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons
          name="camera"
          size={22}
          color={colors.textInverse}
        />
        <Text style={[styles.botaoText, { color: colors.textInverse }]}>
          Escanear QR Code
        </Text>
      </TouchableOpacity>

      {/* Resultado da leitura (chega via route.params.qrData) */}
      <View
        style={[
          styles.resultadoBox,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.resultadoLabel, { color: colors.textMuted }]}>
          Resultado:
        </Text>
        <Text
          style={[
            styles.resultadoText,
            { color: qrData ? colors.text : colors.textMuted },
          ]}
          selectable
        >
          {qrData ?? "Nenhum QR Code lido ainda."}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: SPACING.large,
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.xlarge,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
    ...SHADOWS.medium,
  },
  titulo: {
    ...TYPOGRAPHY.h3,
    textAlign: "center",
  },
  subtitulo: {
    ...TYPOGRAPHY.body,
    textAlign: "center",
    marginTop: SPACING.small,
    marginBottom: SPACING.xlarge,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.large,
    width: "100%",
    ...SHADOWS.small,
  },
  botaoText: {
    ...TYPOGRAPHY.button,
    marginLeft: SPACING.small,
  },
  resultadoBox: {
    width: "100%",
    borderWidth: 1,
    borderRadius: RADIUS.large,
    padding: SPACING.medium,
    marginTop: SPACING.large,
  },
  resultadoLabel: {
    ...TYPOGRAPHY.caption,
    marginBottom: SPACING.xs,
  },
  resultadoText: {
    ...TYPOGRAPHY.body,
  },
});

export default TesteQRStack;
