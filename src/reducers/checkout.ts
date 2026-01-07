import { PaymentMethodType } from 'models/payment';
import {
  CheckoutActionTypes,
  CheckoutReducerType,
  CheckoutState,
} from 'models/shop/checkout';

export const checkoutInitialState: CheckoutState = {
  status: null,
  save_address: false,
  line_items: [],
  order_subtotal: 0,
  order_total: 0,
  customer: {
    name: '',
    email: '',
    phone: '',
    addresses: [],
  },
  accepts_marketing: false,
  checkout_id: null,
  created_at: null,
  currency: null,
  discount_code: { code: '', id: '' },
  show_discount: false,
  financial_status: null,
  free_shipping: false,
  updated_at: null,
  razorpay_payment_id: null,
  payment_method: PaymentMethodType.UPI,
  isPaymentProcessing: false,
  setPaymentError: null,
  paymentOptions: [],
  subscriptionAddress: null,
  userAddressList: [],
};

const checkoutReducer: CheckoutReducerType = (state, action) => {
  switch (action.type) {
    case CheckoutActionTypes.CREATE_CHECKOUT:
      return {
        ...state,
        checkout_id: action.payload,
      };
    case CheckoutActionTypes.SET_RAZORPAY_PAYMENT_ID:
      return {
        ...state,
        razorpay_payment_id: action.payload,
      };
    case CheckoutActionTypes.SET_PAYMENT_METHOD:
      return {
        ...state,
        payment_method: action.payload,
      };
    case CheckoutActionTypes.SET_PAYMENT_PROCESSING:
      return {
        ...state,
        isPaymentProcessing: action.payload,
      };
    case CheckoutActionTypes.SET_DISCOUNT_CODE:
      return {
        ...state,
        discount_code: action.payload,
      };
    case CheckoutActionTypes.SET_SHOW_DISCOUNT:
      return {
        ...state,
        show_discount: action.payload,
      };

    case CheckoutActionTypes.SET_CUSTOMER_DETAILS:
      return {
        ...state,
        customer: {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        },
      };
    case CheckoutActionTypes.SET_PAYMENT_ERROR:
      return {
        ...state,
        setPaymentError: action.payload,
      };
    case CheckoutActionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case CheckoutActionTypes.SET_SUBSCRIPTION_ADDRESS:
      return {
        ...state,
        subscriptionAddress: action.payload,
      };
    case CheckoutActionTypes.SET_USER_ADDRESS_LIST:
      return {
        ...state,
        userAddressList: action.payload,
      };
    case CheckoutActionTypes.SET_PAYMENT_METHODS_TO_SHOW:
      return {
        ...state,
        paymentOptions: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
