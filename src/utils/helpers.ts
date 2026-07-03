/**
 * Formata uma data para o padrão brasileiro (dd/mm/aaaa)
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
};

/**
 * Trunca um texto ao número máximo de caracteres
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Verifica se um valor é nulo ou indefinido
 */
export const isNullOrUndefined = (value: any): boolean =>
  value === null || value === undefined;

/**
 * Gera um ID único simples
 */
export const generateId = (): string =>
  Math.random().toString(36).substring(2, 9);
