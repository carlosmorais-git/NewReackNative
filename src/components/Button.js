import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../styles/globalStyles';

/**
 * Componente de botão reutilizável
 * @param {string} title - Texto do botão
 * @param {function} onPress - Função chamada ao pressionar
 * @param {string} variant - 'primary' | 'secondary' | 'outline'
 * @param {boolean} loading - Exibe indicador de carregamento
 * @param {boolean} disabled - Desabilita o botão
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) => {
  const buttonStyle = [styles.base, styles[variant], disabled && styles.disabled, style];

  const textStyle = [styles.text, variant === 'outline' ? styles.textOutline : styles.textDefault];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : COLORS.white} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.xlarge,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...TYPOGRAPHY.button,
  },
  textDefault: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
});

export default Button;
