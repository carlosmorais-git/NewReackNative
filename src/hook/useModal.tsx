import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { ModalContextValue } from "../types/context";

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
