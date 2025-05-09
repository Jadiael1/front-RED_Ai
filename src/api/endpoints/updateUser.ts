import api from "../axios";
import { IApiResponseBase, IUser } from "../../types";

export type TTLatestInvestorsData = {
  phone: string;
  total_invested: string;
};

export const updateUser = async (
  userData: Partial<
    IUser & {
      current_password?: string;
      new_password?: string;
      new_password_confirmation?: string;
    }
  >
): Promise<IApiResponseBase<IUser>> => {
  const response = await api.patch<IApiResponseBase<IUser>>(
    `/users/profile`,
    userData
  );
  return response.data;
};
