import { createContext } from "react";
import { IUser } from "../types";

export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: IUser) => void;
  isLoading: boolean;
  last_login?: string | null;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
