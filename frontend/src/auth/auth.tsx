import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  accountType: string;
  role: string;
  avatarUrl: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  passwordHash: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Firgun:token");
    const user = localStorage.getItem("@Firgun:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem("@Firgun:token");
    localStorage.removeItem("@Firgun:user");
    localStorage.removeItem("persist:root");

    setData({} as AuthState);
  }, []);

  const signIn = useCallback(async ({ email, passwordHash }) => {
    const response = await api.post("sessions", {
      email,
      passwordHash,
    });

    const { token, user } = response.data;

    localStorage.setItem("@Firgun:token", token);
    localStorage.setItem("@Firgun:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@Firgun:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an authProvider");
  }

  return context;
}
