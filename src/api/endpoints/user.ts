import api from "../axios";
import { IApiResponseBase, IUser } from "../../types";

export const getUser = async (): Promise<IApiResponseBase<IUser>> => {
  const response = await api.get<IApiResponseBase<IUser>>("/auth/user");
  return response.data;
};
