import {
  FetchCartRequestModel,
  FetchCartResponseModel,
} from 'models/cart/fetchcart';
import { ISubscriptionObject } from 'rest/checkout/mutations/create-checkout';
import { checkoutEndpoint, subscriptionEndpoint, walletRedeemEndpoint } from 'utils/constants';

import { getUser } from './auth';
import { axiosClient } from './axios';
import { OffersListResponse } from 'models/offers';
import { ICodeVisibility } from 'models/shop/cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCartFromServer = async (
  requestModel: FetchCartRequestModel,
): Promise<FetchCartResponseModel> => {
  const user = await getUser();
  const endpoint = user?.authToken ? 'radium/cart/user' : 'radium/cart/';
  const { data } = await axiosClient
    .post(`${checkoutEndpoint}/${endpoint}`, requestModel)
    .then(response => response);
  return data;
};

const proceedToCheckoutWithSubsriptionItem = (
  subscriptionObject: ISubscriptionObject,
) => {
  try {
    const data = axiosClient
      .post<any>(`${subscriptionEndpoint}`, subscriptionObject)
      .then(response => response);
    return data;
  } catch (error) {
    console.log('Error : ', error);
  }
};

const fetchOffersService = (payload: ICodeVisibility) => {
  try {
    const data = axiosClient
      .post<OffersListResponse>(`${checkoutEndpoint}/radium/visibility`, payload)
      .then((response) => {
        return response;
      });
    return data;
  } catch (error) {
    console.log("Error while fetching an offers : ", error);
    throw error;
  }
}

export const ozivaCashValueService = async (payload) => {
  try {
    const {data} =  await axiosClient.get(`${walletRedeemEndpoint}/users/${payload.phone}/cash?cart_value=${payload.cartValue}`); 
    return data;
  } catch (error) {
    throw error;
  }
}

export const cartUpsellService = async (variantIds) => {
  try {
    const { data } = await axiosClient.get(`${checkoutEndpoint}/catalog/product/variants/upsell?ids=${variantIds}`);
    return data;
  } catch (error) {
    console.log("Error in the upsell service : ", error);
  }
}

export const getGoogleReviewsJsonDataService = async () => {
  const { data } = await axiosClient
    .get(`https://cdn.shopify.com/s/files/1/2393/2199/files/brand-review.json?v=1730878344`)
    .then((response) => {
      return response;
    });
  return data;
}

export const setUpgradedProductId = async (upgradedProducts) => {
  await AsyncStorage.setItem('UpgradedProductIds', JSON.stringify(upgradedProducts));
};

export const getUpgradedProductId = async () => {
  const upgradedProducts = await AsyncStorage.getItem('UpgradedProductIds');
  return upgradedProducts ? JSON.parse(upgradedProducts) : [];
};

export const cartService = {
  getCartFromServer,
  proceedToCheckoutWithSubsriptionItem,
  fetchOffersService,
  ozivaCashValueService,
  cartUpsellService,
  getGoogleReviewsJsonDataService,
  getUpgradedProductId,
  setUpgradedProductId
};
