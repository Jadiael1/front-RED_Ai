import api from "../axios";
import { IApiResponseBase } from "../../types";

export const inviteRequired = async (): Promise<IApiResponseBase<null>> => {
  const response = await api.get<IApiResponseBase<null>>(
    "/auth/invite-required"
  );
  return response.data;
};
// Registration without invite is allowed.