import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

const QRScannerScreen: React.FC<RootStackScreenProps<"QRScanner">> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  // Evita que o callback dispare várias vezes com o mesmo código.
  const jaLeuRef = useRef(false);

  // Rota de destino que vai receber o texto lido (padrão: ConfigStack).
  // const returnTo = route.params?.returnTo ?? "ConfigStack";
  const returnTo = "ConfigStack";
  // console.log("QRScannerScreen: returnTo =", returnTo);

  // Pede a permissão assim que a tela abre.
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const aoLerCodigo = (scan: BarcodeScanningResult) => {
    if (jaLeuRef.current) return;
    jaLeuRef.current = true;
    // Volta para a rota escolhida enviando o texto lido nos params.
    navigation.navigate(returnTo, { qrData: scan.data });
  };

  // --- Enquanto o status da permissão carrega ---
  if (!permission) {
    return (
      <View
        style={[styles.stateContainer, { backgroundColor: colors.background }]}
      />
    );
  }

  // --- Permissão negada ---
  if (!permission.granted) {
    return (
      <View
        style={[styles.stateContainer, { backgroundColor: colors.background }]}
      >
        <MaterialCommunityIcons
          name="camera-off"
          size={48}
          color={colors.textMuted}
        />
        <Text style={[styles.stateText, { color: colors.text }]}>
          Precisamos da câmera para ler o QR Code.
        </Text>
        {permission.canAskAgain ? (
          <TouchableOpacity
            style={[styles.botao, { backgroundColor: colors.primary }]}
            onPress={requestPermission}
            activeOpacity={0.85}
          >
            <Text style={[styles.botaoText, { color: colors.textInverse }]}>
              Permitir câmera
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.aviso, { color: colors.danger }]}>
            Permissão negada. Habilite a câmera nas configurações do
            dispositivo.
          </Text>
        )}
      </View>
    );
  }

  // --- Câmera em tela cheia ---
  return (
    <View style={styles.scannerContainer}>
      {/* Instruções */}

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
          Processo automático, posicione o QR Code dentro da mira.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.cancelarBtn, { backgroundColor: colors.danger }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons name="close" size={20} color="#FFFFFF" />
        <Text style={styles.cancelarBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estados de permissão (carregando / negada)
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.large,
  },
  stateText: {
    ...TYPOGRAPHY.body,
    textAlign: "center",
    marginTop: SPACING.medium,
    marginBottom: SPACING.large,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: RADIUS.large,
    ...SHADOWS.small,
  },
  botaoText: {
    ...TYPOGRAPHY.button,
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

export default QRScannerScreen;
