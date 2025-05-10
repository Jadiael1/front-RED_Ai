import api from "../axios";
import { IApiResponseBase, IApiResponseBasePaginate, IUser } from "../../types";

export const getUsers = async (): Promise<
  IApiResponseBase<IApiResponseBasePaginate<IUser[]>>
> => {
  const response = await api.get<
    IApiResponseBase<IApiResponseBasePaginate<IUser[]>>
  >("/users");
  return response.data;
};
