import api from "../axios";
import { IApiResponseBase } from "../../types";
// import { AxiosError } from "axios";

export type TNetworkBonus = {
  date: string;
  level: number;
  invitee_name: string;
  investment: number;
  bonus_generated: number;
};

export const getNetworkBonus = async (): Promise<
  IApiResponseBase<TNetworkBonus[]>
> => {
  const response = await api.get<IApiResponseBase<TNetworkBonus[]>>(
    `/users/network/bonus`
  );
  return response.data;

  /*
  try {}
  catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const newResponse = axiosError.response
        .data as IApiResponseBase<TPurchaseProduct>;
      return newResponse;
    }
    return {
      status: "error",
      status_code: 500,
      message: "Internal Server Error",
      data: {},
      errors: null,
    } as IApiResponseBase<TPurchaseProduct>;
  }*/
};
