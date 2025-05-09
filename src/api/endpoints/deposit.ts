import api from "../axios";
import { IApiResponseBase } from "../../types";

export interface IDeposit {
  amount: string;
  method: string;
  receipt: File;
  description: string;
}

export interface IRespDeposit {
  amount: string;
  created_at: string;
  description: string;
  id: number;
  method: string;
  receipt: string;
  status: string;
  type: string;
  updated_at: string;
  wallet_id: number;
}

export const deposit = async (
  deposit: IDeposit
): Promise<IApiResponseBase<IRespDeposit>> => {
  const { amount, method, receipt, description } = deposit;
  const formData = new FormData();
  formData.append("amount", amount);
  formData.append("method", method);
  formData.append("receipt", receipt);
  formData.append("description", description);
  const response = await api.post<IApiResponseBase<IRespDeposit>>(
    "/wallet/transactions/deposit",
    deposit,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
