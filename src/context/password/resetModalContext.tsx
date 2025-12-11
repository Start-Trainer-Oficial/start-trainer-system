"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ResetPasswordContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ResetPasswordContext = createContext<ResetPasswordContextType | undefined>(undefined);

export const ResetPasswordProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ResetPasswordContext.Provider value={{
      isOpen,
      openModal: () => setIsOpen(true),
      closeModal: () => setIsOpen(false)
    }}>
      {children}
    </ResetPasswordContext.Provider>
  );
};

export const useResetPasswordModal = () => {
  const ctx = useContext(ResetPasswordContext);
  if (!ctx) throw new Error("useResetPasswordModal must be used inside provider");
  return ctx;
};
