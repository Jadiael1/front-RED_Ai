import api from "../axios";
import { IApiResponseBase } from "../../types";

export interface IForgotPasswordCredentials {
  email: string;
  phone?: string | null;
}

export const forgotPassword = async (
  credentials: IForgotPasswordCredentials
): Promise<IApiResponseBase<null>> => {
  const response = await api.post<IApiResponseBase<null>>(
    "/auth/password/email",
    credentials
  );
  return response.data;
};
