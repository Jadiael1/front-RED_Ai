import api from "../axios";
import { IApiResponseBase } from "../../types";

export type TTLatestInvestorsData = {
  phone: string;
  total_invested: string;
};

// export const transactions = async (): Promise<IApiResponseBase> => {
//   const response = await api.get<IApiResponseBase>(
//     "/wallet/transactions/me?id=7&type=deposit&only_fields=id%2Camount%2Cmethod%2Cstatus&sort_by=created_at&per_page=15"
//   );
//   return response.data;
// };

export const getLatestInvestors = async (): Promise<
  IApiResponseBase<TTLatestInvestorsData[]>
> => {
  const response = await api.get<IApiResponseBase<TTLatestInvestorsData[]>>(
    `/users/latest-investors?limit=5`
  );
  return response.data;
};
