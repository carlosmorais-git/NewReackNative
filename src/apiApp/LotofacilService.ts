/**
Usei o useCallback pra evitar que as funções sejam recriadas a cada renderização,
o que pode causar re-renderizações desnecessárias em componentes filhos que dependem dessas funções. 
*/

import { useState, useCallback } from "react";
import * as ModularService from "../services/modularService";
import { ModuloData, GerarModularPayload } from "../types/api";

interface UseLotofacilApi {
  loading: boolean;
  carregarModulos: () => Promise<ModuloData[] | null>;
  gerarModulares: (payload: GerarModularPayload) => Promise<any | null>;
}

/**
 * Hook principal que gerencia o estado e integra todos os serviços da API
 */
export const useLotofacilApi = (): UseLotofacilApi => {
  const [loading, setLoading] = useState<boolean>(false);

  // ===== MODULAR =====

  const carregarModulos = useCallback(async (): Promise<
    ModuloData[] | null
  > => {
    setLoading(true);
    try {
      return await ModularService.carregarModulos();
    } finally {
      setLoading(false);
    }
  }, []);

  const gerarModulares = useCallback(
    async (payload: GerarModularPayload): Promise<any | null> => {
      setLoading(true);
      try {
        return await ModularService.gerarModulares(payload);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    carregarModulos,
    gerarModulares,
  };
};
