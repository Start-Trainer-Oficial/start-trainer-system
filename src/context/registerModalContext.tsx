"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RegisterModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const RegisterModalContext = createContext<RegisterModalContextType | undefined>(undefined);

export const RegisterModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <RegisterModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </RegisterModalContext.Provider>
  );
};

export const useRegisterModal = () => {
  const context = useContext(RegisterModalContext);
  if (!context) throw new Error("useRegisterModal must be used within a RegisterModalProvider");
  return context;
};
