import React, { createContext, useContext, useState } from 'react';
import ConfirmModal from '../components/Modal';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState(null);

  function showConfirm(options) {
    setConfirmState({ ...options, isOpen: true });
  }

  function closeModal() {
    setConfirmState(null);
  }

  function handleConfirm() {
    confirmState?.onConfirm();
    closeModal();
  }

  const value = { showConfirm, closeModal };

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
