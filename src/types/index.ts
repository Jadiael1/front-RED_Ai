export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_admin: boolean;
  invite_code: string;
  phone: string;
  iban: string;
  invited_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface ISigninData {
  user: IUser;
  token: string;
  token_type: string;
  expires_in: string;
}


export interface IApiResponseBase<T = unknown> {
  status: "success" | "error" | string;
  status_code: number;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
}
