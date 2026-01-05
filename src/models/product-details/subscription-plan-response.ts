export interface Plan {
  plan_id: string;
  subscription_frequency: string;
  subscription_interval: number;
  base_price: number;
  compare_at_price: number;
  savings: string;
}

export interface SubscriptionPlanResponseModel {
  variant_id: string;
  discount_range: string;
  plans: Plan[];
  subscribable: boolean;
}

export interface GetCustomerDetailResponse {
  customerDetails: CustomerDetailData;
}

export interface CustomerDetailData {
  data: CustomerDetailDataResponse;
}

export interface CustomerDetailDataResponse {
  customerID: number;
  paymentMethodToShow: string[];
}
export interface TentativeDates {
  from_date: string;
  to_date: string;
}

export interface InitiateSubscriptionPaymentData {
  id: string;
  hash: string;
  tentative_dates: TentativeDates;
  next_order: string;
}

export interface InitiateSubscriptionPayment {
  data: InitiateSubscriptionPaymentData;
  message: string;
}

export interface SubscriptionPaymentResponse {
  data: ConfirmDataResponse;
  message: string;
}

export interface ConfirmSubscriptionRazorPayRequest {
  razorpayPaymentId: string;
  razorpaySubscriptionId: string;
  razorpaySignature: TentativeDates;
}

export interface ConfirmDataResponse {
  variant_id: string;
  order_number: number;
}

export interface ConfirmSubscriptionRazorPayResponse {
  data?: ConfirmDataResponse;
  error?: any;
}
export interface BillingAddress {
  zip: string;
  city: string;
  province: string;
  country: string;
  address1: string;
  address2: string;
  phone: string;
}

export interface ShippingAddress {
  address1: string;
  address2: string;
  phone: string;
  city: string;
  province: string;
  country: string;
  zip: string;
}

export interface CustomParameter {
  billing_address: BillingAddress;
  shipping_address: ShippingAddress;
  variant_id: string;
  target_url?: string;
}

export interface SubscriptionPlan {
  totalCount: number;
  planId: string;
}

export interface CreateSubscriptionBody {
  customer_id: string;
  first_name: string;
  last_name: string;
  subscriber_mobile: string;
  product_info: string;
  amount: number;
  accept_marketing: boolean;
  custom_parameter: CustomParameter;
  subscription_plans: SubscriptionPlan[];
  realPrice: number;
  discountedPrice: number;
  payment_mode: string;
  channel?: string;
  deviceId?: string;
}

export interface RazorypayOptions {
  description: string;
  currency: string;
  key_id: string;
  amount: number;
  email: string;
  contact: string;
  method: string;
  subscription_id: string;
}

export interface FetchSubscriptionsModel {
  data: SubscriptionPlanResponseModel;
  message: string;
}
