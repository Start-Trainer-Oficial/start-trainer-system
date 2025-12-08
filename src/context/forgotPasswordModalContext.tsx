"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ForgotPasswordContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ForgotPasswordContext = createContext<ForgotPasswordContextType | undefined>(undefined);

export const ForgotPasswordProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ForgotPasswordContext.Provider value={{
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false)
    }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPasswordModal = () => {
  const ctx = useContext(ForgotPasswordContext);
  if (!ctx) throw new Error("useForgotPasswordModal must be used inside provider");
  return ctx;
};
