/**
 * Formata uma data para o padrão brasileiro (dd/mm/aaaa)
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

/**
 * Trunca um texto ao número máximo de caracteres
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Verifica se um valor é nulo ou indefinido
 * @param {*} value
 * @returns {boolean}
 */
export const isNullOrUndefined = (value) =>
  value === null || value === undefined;

/**
 * Gera um ID único simples
 * @returns {string}
 */
export const generateId = () =>
  Math.random().toString(36).substring(2, 9);
