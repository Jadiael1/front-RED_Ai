import api from "../axios";
import { IApiResponseBase } from "../../types";

export type TApproveOrRejectDepositResp = {
  id: number;
  wallet_id: number;
  type: string;
  amount: string;
  method: string;
  receipt: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type TApproveOrRejectDepositParam = {
  transaction_id: number;
  status: "approved" | "rejected";
};

export const approveOrRejectDeposit = async (
  param: TApproveOrRejectDepositParam
): Promise<IApiResponseBase<TApproveOrRejectDepositResp>> => {
  const { transaction_id, status } = param;
  const response = await api.put<IApiResponseBase<TApproveOrRejectDepositResp>>(
    `/wallet/transactions/deposits/${transaction_id}`,
    {
      status: status,
    }
  );
  return response.data;
};
