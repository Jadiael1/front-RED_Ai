import api from "../axios";
import { IApiResponseBase, IUser } from "../../types";

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  invite_code: string;
}

export const signUp = async (
  credentials: SignUpCredentials
): Promise<IApiResponseBase<IUser>> => {
  const response = await api.post<IApiResponseBase<IUser>>(
    "/auth/signup",
    credentials
  );
  return response.data;
};
