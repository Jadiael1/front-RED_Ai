import api from "../axios";
import { IApiResponseBase } from "../../types";
import { AxiosError } from "axios";
import { TTransactionData } from "./transactions";

export type TWithdrawalData = {
  amount: number;
};

export const withdrawal = async (
  data: TWithdrawalData
): Promise<IApiResponseBase<TTransactionData>> => {
  try {
    const response = await api.post<IApiResponseBase<TTransactionData>>(
      `/wallet/transactions/withdraw`,
      data
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const newResponse = axiosError.response
        .data as IApiResponseBase<TTransactionData>;
      return newResponse;
    }
    return {
      status: "error",
      status_code: 500,
      message: "Internal Server Error",
      data: {},
      errors: null,
    } as IApiResponseBase<TTransactionData>;
  }
};
