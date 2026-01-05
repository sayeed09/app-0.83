import {
  ConfirmSubscriptionRazorPayRequest,
  ConfirmSubscriptionRazorPayResponse,
  InitiateSubscriptionPayment,
  InitiateSubscriptionPaymentData,
  SubscriptionPaymentResponse,
} from 'models/product-details/subscription-plan-response';
import {
  CheckoutState,
  IncentiveAmountPayload,
  IncentiveValue,
} from 'models/shop/checkout';
import { getWhiteListHeaders } from 'utils/common';
import {
  checkoutEndpoint,
  codDisabledCodes,
  PLATFORM_HEADERS,
  RAZORPAY_API_URL,
  RAZORPAY_LIVE_KEY,
  subscriptionPaymentInitiateEndpoint,
} from 'utils/constants';
import { axiosClient } from './axios';
import { IValidateUPIId } from 'models/payment';
import { Buffer } from 'buffer';

export const checkForCodDisabledVariants = (discount_code = '') =>
  codDisabledCodes.includes(discount_code);

export const createSubscription = async (
  paymentData: string,
): Promise<InitiateSubscriptionPayment | undefined> => {
  try {
    const response = await fetch(
      `${subscriptionPaymentInitiateEndpoint}/v2/subscription`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json, text/plain, */*',
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded',
          'X-Channel': PLATFORM_HEADERS.channel,
          'App-Version': PLATFORM_HEADERS.appVersion,
          ...getWhiteListHeaders()
        },
        body: paymentData,
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getSubscriptionPaymentCallback = async (
  data: InitiateSubscriptionPaymentData,
): Promise<SubscriptionPaymentResponse | undefined> => {
  try {
    const response = await fetch(
      `${subscriptionPaymentInitiateEndpoint}/app/cod/callback`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'X-Channel': PLATFORM_HEADERS.channel,
          'App-Version': PLATFORM_HEADERS.appVersion,
          ...getWhiteListHeaders()
        },
        body: JSON.stringify(data),
        method: 'POST',
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const confirmSubscriptionRazorPayOrder = async (
  data: ConfirmSubscriptionRazorPayRequest,
): Promise<ConfirmSubscriptionRazorPayResponse | undefined> => {
  try {
    const response = await fetch(
      `${subscriptionPaymentInitiateEndpoint}/app/callback`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'X-Channel': PLATFORM_HEADERS.channel,
          'App-Version': PLATFORM_HEADERS.appVersion,
          ...getWhiteListHeaders()
        },
        body: JSON.stringify(data),
        method: 'POST',
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const incentiveAmountService = async (checkoutId: string | undefined, payload: IncentiveAmountPayload) => {
  try {
    const { data } = await axiosClient.post<IncentiveValue>(`${checkoutEndpoint}/radium/paymentMethod/${checkoutId}`, payload);
    return data;
  } catch (error) {
    console.log("Error while getting incentive amount : ", error);
    throw error;
  }
};
export const getAvailableBanks = async () => {
  try {
    const response = await fetch(`${RAZORPAY_API_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${RAZORPAY_LIVE_KEY}:`,
        ).toString('base64')}`,
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('Error : ', error);
  }
};

export const createUserCheckoutService = async (payload) => {
  try {
    const { data } = await axiosClient.post<CheckoutState>(`${checkoutEndpoint}/checkout/checkout/user?v=v2`, payload)
    return data;
  } catch (error) {
    console.log("Error while creating checkout : ", error);
    return error;
  }
};

export const fetchCheckoutByIdService = async (checkoutId) => {
  try {
    const { data } = await axiosClient.get(`${checkoutEndpoint}/checkout/${checkoutId}`);
    return data;
  } catch (error) {
    console.log("Error while fetching checkout : ", error);
    throw error;
  }
};

export const patchAddressService = async (checkoutId, customerAddressPayload) => {
  let apiHeader: any = {
    Accept: "API-Version/1", // this is done for additional validation of pincode servicable
  };
  try {
    const { data } = await axiosClient.post(`${checkoutEndpoint}/checkout/${checkoutId}`, customerAddressPayload,
      {
        headers: {
          ...apiHeader
        }
      }
    );
    return data;
  } catch (error) {
    console.log("Error while updating address : ", error);
    throw error;
  }
};

export const createRazorpayOrderService = async (checkoutId, paymentMethod) => {
  try {
    const { data } = await axiosClient.post(`${checkoutEndpoint}/checkout/updatePayment/${checkoutId}`, paymentMethod);
    return data;
  } catch (error) {
    console.log("Error while creating razor pay order : ", error);
    throw error;
  }
};

export const validateUPIId = async (UPIId: string) => {
  const { data } = await axiosClient
    .get<IValidateUPIId>(`${checkoutEndpoint}/checkout/vpa/validate?vpa=${UPIId}`)
    .then((response) => {
      return response;
    });
  return data;
};

export const postPaymentStatus = async (paymentId: string) => {
  const { data } = await axiosClient
    .get(`${checkoutEndpoint}/checkout/post-payment-status/${paymentId}`)
    .then((response) => {
      return response;
    });
  return data;
};
