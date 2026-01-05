import { checkoutEndpoint } from 'utils/constants';
import { axiosClient } from './axios';
import { OrderDetailResponseModel } from 'models/order/order-response';

const getOrderDetails = async (orderId: string) => {
  const { data } = await axiosClient
    .get<OrderDetailResponseModel>(
      `${checkoutEndpoint}/nitro/user/order/v2/order-details/${orderId}`,
    )
    .then(response => {
      return response;
    });
  return data;
};

export const OrderService = {
  getOrderDetails,
};
