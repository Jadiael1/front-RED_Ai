import api from "../axios";
import { IApiResponseBase, IApiResponseBasePaginate } from "../../types";

type TTransaction = {
  id: number;
  status: "pending" | "approved" | "rejected";
  sortBy: "created_at";
  sortOrder: "desc";
  perPage: 1 | 99999;
  type:
    | "deposit"
    | "withdrawal"
    | "income"
    | "bonus"
    | "investment"
    | "refund"
    | "";
};

export type TTransactionData = {
  id: number;
  wallet_id: number;
  type: string;
  amount: string;
  method: string;
  receipt?: string | null;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
  gross_value?: number | null;
  user_name?: string | null;
  user_email?: string | null;
};

// export const transactions = async (): Promise<IApiResponseBase> => {
//   const response = await api.get<IApiResponseBase>(
//     "/wallet/transactions/me?id=7&type=deposit&only_fields=id%2Camount%2Cmethod%2Cstatus&sort_by=created_at&per_page=15"
//   );
//   return response.data;
// };

export const getTransactionsAdm = async (
  param: Partial<TTransaction>
): Promise<IApiResponseBase<IApiResponseBasePaginate<TTransactionData[]>>> => {
  param.id = param.id ?? 0;
  param.status = param.status ?? "pending";
  param.sortBy = param.sortBy ?? "created_at";
  param.sortOrder = param.sortOrder ?? "desc";
  param.perPage = param.perPage ?? 1;
  param.type = param.type ?? "";
  const response = await api.get<
    IApiResponseBase<IApiResponseBasePaginate<TTransactionData[]>>
  >(
    `/wallet/transactions?type=${param.type}&status=${param.status}&sort_by=${param.sortBy}&sort_order=${param.sortOrder}&per_page=${param.perPage}`
  );
  return response.data;
};

export const getTransactions = async (
  param: Partial<TTransaction>
): Promise<IApiResponseBase<IApiResponseBasePaginate<TTransactionData[]>>> => {
  param.id = param.id ?? 0;
  param.status = param.status ?? "pending";
  param.sortBy = param.sortBy ?? "created_at";
  param.sortOrder = param.sortOrder ?? "desc";
  param.perPage = param.perPage ?? 1;
  param.type = param.type ?? "";
  const response = await api.get<
    IApiResponseBase<IApiResponseBasePaginate<TTransactionData[]>>
  >(
    `/wallet/transactions/me?id=${param.id}&type=${param.type}&status=${param.status}&sort_by=${param.sortBy}&sort_order=${param.sortOrder}&per_page=${param.perPage}`
  );
  return response.data;
};

export const getTransaction = async (
  param: Partial<TTransaction>
): Promise<IApiResponseBase<TTransactionData>> => {
  param.id = param.id ?? 0;
  param.status = param.status ?? "pending";
  param.sortBy = param.sortBy ?? "created_at";
  param.sortOrder = param.sortOrder ?? "desc";
  param.perPage = param.perPage ?? 1;
  param.type = param.type ?? "";
  const response = await api.get<IApiResponseBase<TTransactionData>>(
    `/wallet/transactions/me?id=${param.id}&type=${param.type}&status=${param.status}&sort_by=${param.sortBy}&sort_order=${param.sortOrder}&per_page=${param.perPage}`
  );
  return response.data;
};
