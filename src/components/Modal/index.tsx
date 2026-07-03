import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SPACING } from "../../styles/globalStyles";
import {
  ConfirmModalProps,
  ModalType,
  ModalTypeConfig,
} from "../../types/components";

const tipoConfig: Record<ModalType, ModalTypeConfig> = {
  info: {
    iconName: "rocket-launch",
    iconBg: "#3B82F620",
    iconColor: "#60A5FA",
    btnColor: "#3B82F6",
  },
  alert: {
    iconName: "file-alert",
    iconBg: "#F59E0B20",
    iconColor: "#FBBF24",
    btnColor: "#F59E0B",
  },
  excluir: {
    iconName: "trash-can",
    iconBg: "#EF444420",
    iconColor: "#F87171",
    btnColor: "#EF4444",
  },
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  titulo = "Confirmar Ação",
  mensagem = "Tem certeza que deseja continuar?",
  textoBotaoConfirmar = "Confirmar",
  textoBotaoCancelar = "Cancelar",
  tipo = "info",
}) => {
  const config = tipoConfig[tipo] ?? tipoConfig.info;

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View
            style={[styles.iconWrapper, { backgroundColor: config.iconBg }]}
          >
            <MaterialCommunityIcons
              name={config.iconName as any}
              size={24}
              color={config.iconColor}
            />
          </View>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <View style={styles.botoes}>
            <TouchableOpacity
              style={[
                styles.btnConfirmar,
                { backgroundColor: config.btnColor },
              ]}
              onPress={onConfirm}
              activeOpacity={0.85}
            >
              <Text style={styles.btnConfirmarText}>{textoBotaoConfirmar}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.btnCancelarText}>{textoBotaoCancelar}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 28,
    paddingBottom: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  titulo: {
    fontSize: SPACING.large,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  mensagem: {
    fontSize: SPACING.small,
    color: COLORS.textMuted,
    marginBottom: 24,
    lineHeight: 20,
  },
  botoes: {
    flexDirection: "row",
    gap: 12,
  },
  btnConfirmar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnConfirmarText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: SPACING.medium,
  },
  btnCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: COLORS.divider,
  },
  btnCancelarText: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: SPACING.medium,
  },
});

export default ConfirmModal;
