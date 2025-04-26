import api from "../axios";
import { IApiResponseBase } from "../../types";

export interface IPasswordResetCredentials {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const passwordReset = async (
  credentials: IPasswordResetCredentials
): Promise<IApiResponseBase<null>> => {
  const response = await api.post<IApiResponseBase<null>>(
    "/auth/password/reset",
    credentials
  );
  return response.data;
};
