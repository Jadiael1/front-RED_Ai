import { useState, useEffect, ReactNode, useTransition } from "react";
import { signIn } from "../api/endpoints/signIn";
import { signOut } from "../api/endpoints/signOut";
import { getUser } from "../api/endpoints/user";
import { IUser, IApiResponseBase } from "../types/index";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) return;
    startTransition(() => {
      (async () => {
        try {
          const data: IApiResponseBase<IUser> = await getUser();
          if (data.status === "success") {
            setUser(data.data);
          } else {
            logout();
          }
        } catch {
          logout();
        }
      })();
    });
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const bodyData = {
        email,
        password,
      };

      const data = await signIn(bodyData);

      if (data.status === "success") {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem("token", data.data.token);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const mensagemErro =
          error.response?.data?.message || "Erro desconhecido no servidor";
        throw new Error(mensagemErro);
      } else {
        throw new Error("Erro inesperado");
      }
    }
  };

  const logout = () => {
    signOut();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const updateUser = (updatedUser: IUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, isLoading: isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};
