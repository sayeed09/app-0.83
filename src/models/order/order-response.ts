export interface OrdersResponseModel {
  data: OrdersData;
  error: Error;
}

export interface OrdersData {
  orders: Order[];
}

export interface Order {
  orderNumber: string;
  orderDate: string;
  packages: Package[];
  productCount: number;
}

export interface OrderDetailResponseModel {
  data: IOrderDetail;
  error: Error;
}

export interface IOrderDetail {
  orderNumber: string;
  orderDate: string;
  total: number;
  subtotal: number;
  totalDiscount: number;
  paymentMode: string;
  shippingAddress: Address;
  billingAddress: Address;
  lineItems: LineItem[];
  packages: Package[];
}

export interface Address {
  name: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
}

export interface LineItem {
  variantId: string;
  quantity: number;
  productId: string;
  price: number;
  discount: number;
  name: string;
  variantTitle: string;
  image: string;
  handle: string;
  inStock: boolean;
  hideBuyAgain: boolean;
}

export interface Package {
  awb: string;
  aggregator?: string;
  track?: Track[];
  status?: string;
  updatedAt?: string;
}

export interface Track {
  status: string;
  eventTimeStamp?: string;
  location: string;
}
