import {
  ProductCatalogResponse,
  VariantAdditionalResponse,
} from 'models/product-details/product';
import { FetchSubscriptionsModel } from 'models/product-details/subscription-plan-response';
import { checkoutEndpoint, configEndpoint } from 'utils/constants';
import { axiosClient } from './axios';
import { FetchAllProductResponse } from 'models/product';

export const fetchProducts = async (payload: string[]) => {
  try {
    const variables = {
      ids: payload,
    };
    const { data } = await axiosClient.post<FetchAllProductResponse>(`${configEndpoint}/config/product`, variables);
    return data;
  } catch (error) {
    console.log("Error while fetching products : ", error);
    throw error;
  }
}

export const fetchProductById = async (
  productId: string,
  expand = ""
): Promise<ProductCatalogResponse> => {
  // topOfFunnel - majorly used on web to have different variant of PDP
  // inStock - get variants with inventory>0
  const { data } = await axiosClient
    .get(
      `${checkoutEndpoint}/catalog/product/details/v2/${productId}?topOfFunnel=false&inStock=true&expand=${expand}&pageSource=pdp`,
    )
    .then(response => {
      return response;
    });
  return data;
};

export const fetchVariantAdditionalDetail = async (
  variantId: string,
): Promise<VariantAdditionalResponse> => {
  const { data } = await axiosClient
    .get(`${checkoutEndpoint}/catalog/product/variant/${variantId}`)
    .then(response => {
      return response;
    });
  return data;
};

export const fetchVariantSubscriptionDetail = async (
  variantId: string,
): Promise<FetchSubscriptionsModel> => {
  const { data } = await axiosClient
    .get(`${checkoutEndpoint}/subscription/variant/${variantId}`)
    .then(response => {
      return response;
    });
  return data;
};