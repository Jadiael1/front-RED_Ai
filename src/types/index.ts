export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_admin: boolean;
  invite_code: string;
  phone: string;
  iban: string | null;
  inviter_id: number | null;
  created_at: string;
  updated_at: string;
  wallet?: IWallet | null;
  active: boolean;
}

export interface IApiResponseBasePaginate<T = unknown> {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ISigninData {
  user: IUser;
  token: string;
  token_type: string;
  expires_in: string;
}

export interface IWallet {
  id: number;
  balance: string;
  blocked: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface IApiResponseBase<T = unknown> {
  status: "success" | "error" | string;
  status_code: number;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}
