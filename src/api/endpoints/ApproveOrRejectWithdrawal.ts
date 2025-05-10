import api from "../axios";
import { IApiResponseBase } from "../../types";

export type TApproveOrRejectWithdrawalResp = {
  id: number;
  wallet_id: number;
  type: string;
  amount: string;
  method: string;
  receipt: null | string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type TApproveOrRejectWithdrawalParam = {
  transaction_id: number;
  status: "approved" | "rejected";
};

export const ApproveOrRejectWithdrawal = async (
  param: TApproveOrRejectWithdrawalParam
): Promise<IApiResponseBase<TApproveOrRejectWithdrawalResp>> => {
  const { transaction_id, status } = param;
  const response = await api.put<
    IApiResponseBase<TApproveOrRejectWithdrawalResp>
  >(`/wallet/transactions/withdrawals/${transaction_id}`, {
    status: status,
  });
  return response.data;
};
