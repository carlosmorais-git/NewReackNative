import React, { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/userService";
import { Usuario } from "../types/api";
import { AuthContextValue, AuthProviderProps } from "../types/context";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const authenticated = await userService.isAuthenticated();
        if (authenticated) {
          const usuario = await userService.getUsuarioLogado();
          setUser(usuario);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const signIn = async (email: string, senha: string): Promise<void> => {
    const usuario = await userService.login(email, senha);
    setUser(usuario);
  };

  const signOut = async (): Promise<void> => {
    await userService.logout();
    setUser(null);
  };

  const value: AuthContextValue = { user, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
