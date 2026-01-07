import { ProductOption, SelectedOption } from "models/shop/cart";

export interface CheckoutCartItem {
  variant_id: number;
  title: string;
  quantity: number;
  selectedOptions?: ProductOption[] | SelectedOption[];
  image: string;
  compareAtPrice: number;
  price: number;
}

export interface CreateCheckoutPayload {
  line_items: Array<CheckoutCartItem>;
  order_subtotal: number;
  order_total: number;
  discount_code: string | undefined;
  channel: string;
  deviceId?: string;
}

export interface ISubscriptionObject {
  variantId: any;
  duration: number | undefined;
  planId: string | undefined;
}

