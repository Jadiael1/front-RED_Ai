import api from "../axios";
import { IApiResponseBase } from "../../types";
import { AxiosError } from "axios";

export type TPurchaseProductParam = {
  product_id: number;
};

export type TPurchaseProduct = {
  id: number;
  user_id: number;
  product_id: number;
  purchase_date: string;
  last_income_at: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const purchaseProduct = async (
  param: TPurchaseProductParam
): Promise<IApiResponseBase<TPurchaseProduct>> => {
  try {
    const response = await api.post<IApiResponseBase<TPurchaseProduct>>(
      `/user-products/purchase`,
      param
    );
    return response.data;
  } catch (error) {
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
  }
};
