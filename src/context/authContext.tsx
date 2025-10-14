'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLoggedUser, getToken, logout as logoutStorage } from '../services/auth';

interface AuthContextType {
  user: any | null;
  token: string | null;
  loginUser: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loginUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loggedUser = getLoggedUser();
    const storedToken = getToken();
    setUser(loggedUser);
    setToken(storedToken);
  }, []);

  const loginUser = (userData: any, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    logoutStorage();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
