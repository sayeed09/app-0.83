export interface User {
  phone: string | undefined;
  authToken: string;
  refreshToken: string | undefined;
}

export interface UserDetails {
  email: string;
  acceptsMarketing?: any;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  gender: string;
}

export interface UserProfileUpdateResponse {
  status: boolean;
}

export interface Urls {
  chatline: string;
}

export interface Wallet {
  oziva_cash_earnings: number;
  oziva_cash_redeemed: number;
  prime_savings: number;
  oziva_cash_balance: number;
}

export interface Height {
  feet: string;
  inches: string;
}

export interface Weight {
  unit: string;
  weight: string;
}

export interface Product {
  name: string;
  size: string;
  flavour: string;
}

export interface DietDetails {
  bmi: number;
  bmr: number;
  dob: string;
  tee: number;
  diet: string;
  food: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  height: Height;
  weight: Weight;
  medical: string;
  activity: string;
  exercise: string;
  products: Product[];
  preference: string;
  exercise_time: string;
}

export interface Prime {
  id: number;
  phone: string;
  created_at: Date;
  updated_at: Date;
  diet_details: DietDetails;
  gender?: any;
  haptik_user_details?: any;
  name?: any;
  last_message_sent?: any;
  expire_at: string;
  membership_type: string;
  activation_date?: any;
  current_status: string;
}

export interface NotificationSettings {
  notification: {
    newOffers: boolean;
    orderStatus: boolean;
    ozivaCommunity: boolean;
    recommendationsByOziva: boolean;
  };
}

export interface UserResponse {
  userDetails: UserDetails;
  urls: Urls;
  wallet: Wallet;
  prime: Prime;
}
