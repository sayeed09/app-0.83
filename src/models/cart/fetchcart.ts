export interface FetchCartRequestModel {
  variants: VariantRequestModel[];
  discountCode?: string;
  cashApply?: boolean;
}

interface VariantRequestModel {
  id: number;
  quantity: number;
}

export interface FetchCartResponseModel {
  discount_brief: any;
  discount_code: string;
  free_shipping: boolean;
  line_items: LineItem[];
  order_subtotal: number;
  order_total: number;
  shipping_charges: number;
  shipping_name: string;
  total_discount: number;
  order_total_mrp: number;
  cashback_non_prime: number;
  cashback_prime: number;
}

export interface LineItem {
  variant_id: any;
  product_id: any;
  image: string;
  title: string;
  variant_title: string;
  price: number;
  compare_at_price: number;
  discounted_price: number;
  quantity: number;
  line_price: number;
  total_discount: number;
  option_1: string;
  option_2: string;
  option_3?: any;
  max_qty_allowed?: any;
  id: number;
}

export interface FetchCartParam {
  code?: string;
  cashApply?: boolean;
}

export interface ServerCartItem {
  id: number;
  quantity: number;
}
