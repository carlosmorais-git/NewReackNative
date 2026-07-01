import { API_BASE_URL } from '../api/apiConfig';

// ===== MODULAR ENDPOINTS =====

export const carregarModulos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/modular/modulos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro módulos:', error);
    return null;
  }
};

export const gerarModulares = async payload => {
  try {
    const response = await fetch(`${API_BASE_URL}/modular/gerar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.success) {
      return data.resultado;
    }
    return null;
  } catch (error) {
    console.error('Erro ao gerar modulares:', error);
    return null;
  }
};
