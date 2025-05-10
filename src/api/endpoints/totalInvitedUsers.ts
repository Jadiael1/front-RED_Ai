import api from "../axios";
import { IApiResponseBase } from "../../types";

export type TTotalInvitedUsers = {
  total_invited: number;
};

export const getTotalInvitedUsers = async (): Promise<
  IApiResponseBase<TTotalInvitedUsers>
> => {
  const response = await api.get<IApiResponseBase<TTotalInvitedUsers>>(
    "/users/invites/total"
  );
  return response.data;
};
