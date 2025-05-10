import api from "../axios";
import { IApiResponseBase, IApiResponseBasePaginate, IUser } from "../../types";

export const getUsers = async (
  params = {}
): Promise<IApiResponseBase<IApiResponseBasePaginate<IUser[]>>> => {
  const response = await api.get<
    IApiResponseBase<IApiResponseBasePaginate<IUser[]>>
  >("/users", { params });
  return response.data;
};

export const updateUserActiveStatus = async (
  id: number,
  active: boolean
): Promise<IApiResponseBase<IUser>> => {
  const response = await api.patch<IApiResponseBase<IUser>>(
    `/users/${id}/active`,
    { active }
  );
  return response.data;
};
