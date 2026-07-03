import React, { createContext, useContext, useState } from "react";
import ConfirmModal from "../components/Modal";
import {
  ModalContextValue,
  ModalProviderProps,
  ConfirmOptions,
  ConfirmState,
} from "../types/context";

export const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  function showConfirm(options: ConfirmOptions): void {
    setConfirmState({ ...options, isOpen: true });
  }

  function closeModal(): void {
    setConfirmState(null);
  }

  function handleConfirm(): void {
    confirmState?.onConfirm();
    closeModal();
  }

  const value: ModalContextValue = { showConfirm, closeModal };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {confirmState && (
        <ConfirmModal
          isOpen={confirmState.isOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          titulo={confirmState.titulo}
          mensagem={confirmState.mensagem}
          textoBotaoConfirmar={confirmState.textoBotaoConfirmar}
          textoBotaoCancelar={confirmState.textoBotaoCancelar}
          tipo={confirmState.tipo}
        />
      )}
    </ModalContext.Provider>
  );
};
