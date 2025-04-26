import api from "../axios";
import { IApiResponseBase } from "../../types";


export const signOut = async (): Promise<IApiResponseBase<null>> => {
  const response = await api.post<IApiResponseBase<null>>("/auth/signout");
  return response.data;
};
