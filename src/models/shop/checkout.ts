import { UserAddress } from './address';
import { CartItem } from './cart';

export interface DiscountCode {
  code: string;
  id?: string | number;
}
export interface CheckoutState {
  status?: any;
  updated_at?: any;
  free_shipping?: boolean;
  discount_code?: any;
  show_discount?: boolean;
  customer?: {
    name: string;
    email: string;
    phone: string;
    addresses?: Array<any>;
  };
  line_items: CartItem[];
  order_subtotal: number;
  order_total: number;
  accepts_marketing?: boolean;
  save_address?: boolean;
  financial_status?: string;
  checkout_id?: string;
  created_at?: string;
  currency?: string;
  razorpay_payment_id: string;
  payment_method: string;
  isPaymentProcessing: boolean;
  setPaymentError: string | null;
  address?: UserAddress;
  paymentOptions?: PaymentOption[];
  subscriptionAddress?: UserAddress;
  userAddressList: UserAddress[];
}

export enum CheckoutActionTypes {
  CREATE_CHECKOUT = 'CREATE_CHECKOUT',
  SET_CUSTOMER_DETAILS = 'SET_CUSTOMER_DETAILS',
  SET_RAZORPAY_PAYMENT_ID = 'SET_RAZORPAY_PAYMENT_ID',
  SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD',
  SET_PAYMENT_PROCESSING = 'SET_PAYMENT_PROCESSING',
  SET_DISCOUNT_CODE = 'SET_DISCOUNT_CODE',
  SET_SHOW_DISCOUNT = 'SET_SHOW_DISCOUNT',
  SET_PAYMENT_ERROR = 'SET_PAYMENT_ERROR',
  SET_ADDRESS = 'SET_ADDRESS',
  SET_PAYMENT_METHODS_TO_SHOW = 'SET_PAYMENT_METHODS_TO_SHOW',
  SET_SUBSCRIPTION_ADDRESS = 'SET_SUBSCRIPTION_ADDRESS',
  SET_USER_ADDRESS_LIST = 'SET_USER_ADDRESS_LIST',
}

export type CheckoutActions =
  | {
    type: CheckoutActionTypes.CREATE_CHECKOUT;
    payload: string;
  }
  | {
    type: CheckoutActionTypes.SET_RAZORPAY_PAYMENT_ID;
    payload: string;
  }
  | {
    type: CheckoutActionTypes.SET_PAYMENT_METHOD;
    payload: string;
  }
  | {
    type: CheckoutActionTypes.SET_PAYMENT_PROCESSING;
    payload: boolean;
  }
  | {
    type: CheckoutActionTypes.SET_CUSTOMER_DETAILS;
    payload: {
      name: string;
      email: string;
      phone: string;
    };
  }
  | {
    type: CheckoutActionTypes.SET_DISCOUNT_CODE;
    payload: { code: string; id?: string | number };
  }
  | {
    type: CheckoutActionTypes.SET_SHOW_DISCOUNT;
    payload: boolean;
  }
  | {
    type: CheckoutActionTypes.SET_PAYMENT_ERROR;
    payload: string | null;
  }
  | {
    type: CheckoutActionTypes.SET_ADDRESS;
    payload: UserAddress | null;
  }
  | {
    type: CheckoutActionTypes.SET_SUBSCRIPTION_ADDRESS;
    payload: UserAddress | null;
  }
  | {
    type: CheckoutActionTypes.SET_USER_ADDRESS_LIST;
    payload: UserAddress[] | [];
  }
  | {
    type: CheckoutActionTypes.SET_PAYMENT_METHODS_TO_SHOW;
    payload: string[] | [];
  }

export type CheckoutReducerType = (
  state: CheckoutState,
  action: CheckoutActions,
) => CheckoutState;

export type CheckoutDispatch = React.Dispatch<CheckoutActions>;

export interface CustomerAddressPayload extends UserAddress {
  checkoutId?: any | undefined;
}

export interface RazorpayOrderCreatePayload {
  paymentMethod: 'card' | 'netbanking' | 'wallet' | 'emi' | 'upi' | 'cod';
  checkoutId: any | undefined;
}

export interface RazorpayOrderConfirmPayload {
  razorpaySignature: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  checkoutId: any | undefined;
}

export interface PaymentOption {
  method: string;
  isActive: boolean;
  reason: string;
  provider?: string;
}

export interface IncentiveValue {
  updated_at: any;
  free_shipping: boolean;
  shipping_charges: number;
  discount_code: string;
  discount_value: number;
  incentive_discount: number;
  accepts_marketing: boolean;
  save_address: boolean;
  financial_status: string;
  checkout_id: string;
  created_at: any;
  shipping_name: string;
  order_total: number
  order_subtotal: number;
  customer: Customer,
  currency: string;
  line_items: CartItem[];
  billing_address: UserAddress;
  shipping_address: UserAddress;
  status: string;
  channel: string;
  discountBrief: string;
  checkoutType: string;
  cashbackNonPrime: number;
  cashbackPrime: number;
  orderTotalMrp: number;
  paymentOptions: string[];
  paymentMethodsToShow: string[];
  metaData: MetaData;
};

export interface MetaData {
  ipAddress: string;
  userAgent: string;
  isNewCustomer: boolean;
}
export interface Customer {
  lastOrderId: number;
  phone: number;
  id: number;
}

export interface IncentiveAmountPayload {
  paymentMethod: string;
}