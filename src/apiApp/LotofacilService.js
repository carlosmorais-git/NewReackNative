/**
Usei o useCallback pra evitar que as funções sejam recriadas a cada renderização,
o que pode causar re-renderizações desnecessárias em componentes filhos que dependem dessas funções. 
*/

import { useState, useEffect, useCallback } from 'react';

import * as ModularService from '../services/modularService';

/**
 * Hook principal que gerencia o estado e integra todos os serviços da API
 */
export const useLotofacilApi = () => {
  const [loading, setLoading] = useState(false);

  // ===== MODULAR =====

  const carregarModulos = useCallback(async () => {
    setLoading(true);
    try {
      return await ModularService.carregarModulos();
    } finally {
      setLoading(false);
    }
  }, []);

  const gerarModulares = useCallback(async payload => {
    setLoading(true);
    try {
      return await ModularService.gerarModulares(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    carregarModulos,
    gerarModulares,
  };
};
