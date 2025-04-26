import api from "../axios";
import { IApiResponseBase } from "../../types";

export interface IEmailVerifyCredentials {
  id: string;
  expires: string;
  signature: string;
}

export const emailVerify = async (
  credentials: IEmailVerifyCredentials
): Promise<IApiResponseBase<null>> => {
  const { id, expires, signature } = credentials;
  const response = await api.get<IApiResponseBase<null>>(
    `/auth/email/verify/${id}?expires=${expires}&signature=${signature}`
  );
  return response.data;
};
