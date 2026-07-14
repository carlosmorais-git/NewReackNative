import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {
  SPACING,
  TYPOGRAPHY,
  RADIUS,
  SHADOWS,
} from "../../styles/globalStyles";
import { RootStackScreenProps } from "../../types/navigation";

const TesteQRScreen: React.FC<RootStackScreenProps<"TesteQR">> = () => {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();

  const [scannerAberto, setScannerAberto] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);
  // Evita que o callback dispare várias vezes com o mesmo código.
  const jaLeuRef = useRef(false);

  const abrirScanner = async () => {
    // Garante a permissão de câmera antes de abrir.
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) return;
    }
    setResultado(null);
    jaLeuRef.current = false;
    setScannerAberto(true);
  };

  const aoLerCodigo = (scan: BarcodeScanningResult) => {
    if (jaLeuRef.current) return;
    jaLeuRef.current = true;
    setResultado(scan.data);
    setScannerAberto(false);
  };

  // --- Tela do scanner (câmera em tela cheia) ---
  if (scannerAberto) {
    return (
      <View style={styles.scannerContainer}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={aoLerCodigo}
        />

        {/* Moldura de mira */}
        <View style={styles.overlay} pointerEvents="none">
          <View style={styles.mira} />
          <Text style={styles.dicaScanner}>
            Aponte a câmera para o QR Code
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.cancelarBtn, { backgroundColor: colors.danger }]}
          onPress={() => setScannerAberto(false)}
          activeOpacity={0.85}
        >
          <MaterialCommunityIcons name="close" size={20} color="#FFFFFF" />
          <Text style={styles.cancelarBtnText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Tela principal (botão + resultado) ---
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
        Toque no botão abaixo para abrir a câmera e escanear um QR Code. A
        string lida aparece logo abaixo.
      </Text>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: colors.primary }]}
        onPress={abrirScanner}
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

      {/* Resultado da leitura */}
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
            { color: resultado ? colors.text : colors.textMuted },
          ]}
          selectable
        >
          {resultado ?? "Nenhum QR Code lido ainda."}
        </Text>
      </View>

      {permission && !permission.granted && !permission.canAskAgain && (
        <Text style={[styles.aviso, { color: colors.danger }]}>
          Permissão de câmera negada. Habilite a câmera nas configurações do
          dispositivo para usar o scanner.
        </Text>
      )}
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
  aviso: {
    ...TYPOGRAPHY.small,
    textAlign: "center",
    marginTop: SPACING.medium,
  },
  // Scanner em tela cheia
  scannerContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  mira: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: RADIUS.large,
    backgroundColor: "transparent",
  },
  dicaScanner: {
    ...TYPOGRAPHY.body,
    color: "#FFFFFF",
    marginTop: SPACING.large,
    textAlign: "center",
    paddingHorizontal: SPACING.large,
  },
  cancelarBtn: {
    position: "absolute",
    bottom: SPACING.xxlarge,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: RADIUS.round,
    ...SHADOWS.medium,
  },
  cancelarBtnText: {
    ...TYPOGRAPHY.button,
    color: "#FFFFFF",
    marginLeft: SPACING.small,
  },
});

export default TesteQRScreen;
