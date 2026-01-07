export interface IAdjustRequestBody {
  event: string;
  eventParams: IAdjustEventParams;
}

export interface IAdjustEventParams {
  deviceId: string;
  lineItems: string;
  discount: string;
  orderAmount: string;
  checkoutId: string;
  subscriptionId: string;
  phoneNumber: string;
  address: string;
  paymentMode: string;
  orderId: string;
}

export interface ILineItem {
  productName: string;
  quantity: number;
  price: number;
}
