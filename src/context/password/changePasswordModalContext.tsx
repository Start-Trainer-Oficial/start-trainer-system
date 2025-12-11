"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChangePasswordModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ChangePasswordModalContext = createContext<ChangePasswordModalContextType | undefined>(undefined);

export const ChangePasswordModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ChangePasswordModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ChangePasswordModalContext.Provider>
  );
};

export const useChangePasswordModal = () => {
  const context = useContext(ChangePasswordModalContext);
  if (!context) throw new Error("useChangePasswordModal must be used within a ChangePasswordModalProvider");
  return context;
};
