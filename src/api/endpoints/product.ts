import api from "../axios";
import { IApiResponseBase, IApiResponseBasePaginate } from "../../types";

export type TGetProductParam = {
  phone: string;
  total_invested: string;
};

export type TProduct = {
  id: number;
  name: string;
  price: string;
  daily_income: string;
  duration_days: number;
  total_income: string;
  limit: number;
  description: string;
  created_at: string;
  updated_at: string;
  remaining_limit: number | null;
};

export const getProducts = async (): Promise<
  IApiResponseBase<IApiResponseBasePaginate<TProduct[]>>
> => {
  const response = await api.get<
    IApiResponseBase<IApiResponseBasePaginate<TProduct[]>>
  >(`/products?sort_by=id&sort_order=asc&per_page=20`);
  return response.data;
};
