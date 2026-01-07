import { CartItem } from './shop/cart';

export interface ShippingCharges {
  price: number;
  discount: number;
}

export interface Address {
  zip: string;
  country: string;
  city: string;
  address2: string;
  address1: string;
  latitude: number;
  last_name: string;
  province_code: string;
  country_code: string;
  state: string;
  province: string;
  phone: string;
  name: string;
  company?: any;
  first_name: string;
  longitude: number;
}

export interface Product {
  variant_title: string;
  image: string;
  quantity: string;
  variant_id: string;
  price: string;
  id: string;
  is_available: boolean;
}

export interface Order {
  createdAt: string;
  cancelledAt: string;
  shipping_charges: ShippingCharges;
  confirmationStatus: string;
  cancelled_at: string;
  address: {
    billing_address: Address;
    shipping_address: Address;
  };
  disc_code: string[];
  products: Product[];
  number: string;
  total: string;
  phone: string;
  subtotal: string;
  current_status: string;
  paymentMode: string;
  id: string;
  fulfillment: string;
  total_disc: string;
  tracking_url: string;
  email: string;
  is_cancelled: boolean;
  financialStatus: string;
  lineItems: CartItem[];
  trackingURL: string;
  totalDiscount: number;
  shippingAddress: Address;
  orderNumber: string;
}

export interface OrdersListResponse {
  orders: Order[];
  count: number;
}

export interface AddressListResponse {
  data: Address[];
  message: string;
}

export interface DeliveryDurationResponse {
  pincode: string;
  displayRange: string;
}
