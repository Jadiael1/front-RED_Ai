import api from "../axios";
import { IApiResponseBase } from "../../types";
// import { AxiosError } from "axios";

export type TProductsSummary = {
  daily_income: string;
  investment: number;
  product_name: string;
  remaining_days: number;
  total_earned: number;
};

export const getProductsSummary = async (): Promise<
  IApiResponseBase<TProductsSummary[]>
> => {
  const response = await api.get<IApiResponseBase<TProductsSummary[]>>(
    `/users/products/summary`
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
