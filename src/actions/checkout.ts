import { makeActionCreator } from 'actions';
import { UserAddress } from 'models/shop/address';
import { CheckoutActionTypes } from 'models/shop/checkout';

const createCheckoutAction = makeActionCreator<
  CheckoutActionTypes.CREATE_CHECKOUT,
  string
>(CheckoutActionTypes.CREATE_CHECKOUT);

const setRazorpayPaymentId = makeActionCreator<
  CheckoutActionTypes.SET_RAZORPAY_PAYMENT_ID,
  string
>(CheckoutActionTypes.SET_RAZORPAY_PAYMENT_ID);

const setIsPaymentProcessing = makeActionCreator<
  CheckoutActionTypes.SET_PAYMENT_PROCESSING,
  boolean
>(CheckoutActionTypes.SET_PAYMENT_PROCESSING);

const setPaymentMethod = makeActionCreator<
  CheckoutActionTypes.SET_PAYMENT_METHOD,
  string
>(CheckoutActionTypes.SET_PAYMENT_METHOD);

const setDiscountCode = makeActionCreator<
  CheckoutActionTypes.SET_DISCOUNT_CODE,
  { code: string; id?: string | number }
>(CheckoutActionTypes.SET_DISCOUNT_CODE);

const setShowDiscount = makeActionCreator<
  CheckoutActionTypes.SET_SHOW_DISCOUNT,
  boolean
>(CheckoutActionTypes.SET_SHOW_DISCOUNT);

const setCustomerDetails = makeActionCreator<
  CheckoutActionTypes.SET_CUSTOMER_DETAILS,
  { name: string; email: string; phone: string }
>(CheckoutActionTypes.SET_CUSTOMER_DETAILS);

const setPaymentError = makeActionCreator<
  CheckoutActionTypes.SET_PAYMENT_ERROR,
  string | null
>(CheckoutActionTypes.SET_PAYMENT_ERROR);

const updateAddress = makeActionCreator<
  CheckoutActionTypes.SET_ADDRESS,
  UserAddress | null
>(CheckoutActionTypes.SET_ADDRESS);

const setPaymentMethodsToShow = makeActionCreator<
  CheckoutActionTypes.SET_PAYMENT_METHODS_TO_SHOW,
  string[] | []
>(CheckoutActionTypes.SET_PAYMENT_METHODS_TO_SHOW);

const setSubscriptionAddress = makeActionCreator<
  CheckoutActionTypes.SET_SUBSCRIPTION_ADDRESS,
  UserAddress | null
>(CheckoutActionTypes.SET_SUBSCRIPTION_ADDRESS);


const setUserAddressList = makeActionCreator<
  CheckoutActionTypes.SET_USER_ADDRESS_LIST,
  UserAddress[] | []
>(CheckoutActionTypes.SET_USER_ADDRESS_LIST);

export {
  createCheckoutAction,
  setRazorpayPaymentId,
  setIsPaymentProcessing,
  setPaymentMethod,
  setDiscountCode,
  setCustomerDetails,
  setShowDiscount,
  setPaymentError,
  updateAddress,
  setPaymentMethodsToShow,
  setSubscriptionAddress,
  setUserAddressList,
};
