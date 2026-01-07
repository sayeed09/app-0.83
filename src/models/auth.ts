import { User, UserResponse } from './user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setOTPError: string | null;
  userData: UserResponse;
  shipRocketOtpToken?: string;
  shipRocketImportToken?: string;
  shipRocketLogin?: boolean;
  maxLoginAttemptsErr: boolean;
  shiprocketEnabled: boolean;
  redirectToCheckout?: boolean;
}

export enum AuthActionTypes {
  SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED',
  SET_USER = 'SET_USER',
  INIT_AUTH = 'INIT_AUTH',
  SET_OTP_ERROR = 'SET_OTP_ERROR',
  SET_USER_DATA = 'SET_USER_DATA',
  SET_SHIPROCKET_LOGIN = 'SET_SHIPROCKET_LOGIN',
  SET_SHIPROCKET_OTP_TOKEN = 'SET_SHIPROCKET_OTP_TOKEN',
  SET_SHIPROCKET_IMPORT_TOKEN = 'SET_SHIPROCKET_IMPORT_TOKEN',
  SET_LOGIN_MAX_LIMIT_ERR = 'SET_LOGIN_MAX_LIMIT_ERR',
  SET_SHIPROCKET_LOGIN_ENABLED = 'SET_SHIPROCKET_LOGIN_ENABLED',
  SET_REDIRECT_TO_CHECKOUT = 'SET_REDIRECT_TO_CHECKOUT'
}

export type AuthActions =
  | {
    type: AuthActionTypes.SET_USER_AUTHENTICATED;
    payload: boolean;
  }
  | {
    type: AuthActionTypes.INIT_AUTH;
    payload: AuthState;
  }
  | {
    type: AuthActionTypes.SET_USER;
    payload: User | null;
  }
  | {
    type: AuthActionTypes.SET_USER_DATA;
    payload: UserResponse;
  }
  | {
    type: AuthActionTypes.SET_OTP_ERROR;
    payload: string | null;
  }
  | {
    type: AuthActionTypes.SET_SHIPROCKET_LOGIN;
    payload: boolean;
  }
  | {
    type: AuthActionTypes.SET_SHIPROCKET_IMPORT_TOKEN;
    payload: string;
  }
  | {
    type: AuthActionTypes.SET_SHIPROCKET_OTP_TOKEN;
    payload: string;
  }
  | {
    type: AuthActionTypes.SET_LOGIN_MAX_LIMIT_ERR;
    payload: boolean;
  }
  | {
    type: AuthActionTypes.SET_SHIPROCKET_LOGIN_ENABLED;
    payload: boolean;
  } | {
    type: AuthActionTypes.SET_REDIRECT_TO_CHECKOUT;
    payload: boolean;
  };
export type AuthReducerType = (
  state: AuthState,
  action: AuthActions,
) => AuthState;

export type AuthDispatch = React.Dispatch<AuthActions>;

export interface UserDetails {
  email: string;
  acceptsMarketing: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: any;
  gender?: any;
  referralCode: string;
  referralShare: string;
  orderCount: number;
  customerId: string;
}

export interface Urls {
  chatline: string;
  preAuthChatline: string;
  miniPreAuthChatline: string;
}

export interface Wallet {
  oziva_cash_earnings: number;
  oziva_cash_redeemed: number;
  oziva_cash_balance: number;
  prime_savings: number;
}

export interface Prime {
  id: number;
  phone: string;
  created_at?: any;
  updated_at: Date;
  diet_details: any;
  gender?: any;
  haptik_user_details?: any;
  name?: any;
  last_message_sent?: any;
  expire_at: Date;
  membership_type: string;
  activation_date?: any;
  current_status: string;
}

export interface UserProfileResponseModel {
  userDetails: UserDetails;
  urls: Urls;
  wallet: Wallet;
  prime: Prime;
  identityHash: string;
  chatlineAccess?: boolean;
}

export interface IExpiredAccessToken {
  expired: string | undefined;
}

export interface LoginResponsePayload {
  status: string;
  message: string;
  shiprocketOtpToken?: string;
}

export interface VerifyOTPRequestPayload {
  phone: string;
  OTP: string;
  source: string;
  type: string;
}

export interface PrivacyAndTerms {
  body: string;
  title: string;
}

export interface OTPResponsePayload {
  message: string;
  hash: string;
  tokens: {
    refreshToken: string;
    accessToken: string;
  }
  addressImportToken?: string;
}

export interface LoginData {
  phone: string;
  source: string;
  type: string;
  consentForAddressUse?: boolean;
}

export interface AddressFetchProgressResponse {
  data: AddressFetchProgress;
}

export interface AddressFetchProgress {
  phone: string
  token: string
  status: string
}
