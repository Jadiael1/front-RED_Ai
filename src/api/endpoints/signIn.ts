import api from "../axios";
import { IApiResponseBase, ISigninData } from "../../types";

export interface SignInCredentials {
  email: string;
  password: string;
}

export const signIn = async (credentials: SignInCredentials): Promise<IApiResponseBase<ISigninData>> => {
  const response = await api.post<IApiResponseBase<ISigninData>>(
    "/auth/signin",
    credentials
  );
  return response.data;
};
