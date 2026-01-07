import { Plan } from 'models/product-details/subscription-plan-response';
import { PaymentOption } from './checkout';
import { Offer } from 'models/offers';
import { ProductCardModel } from 'models/product-card/card-model';

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string[];
}
export interface CartItem {
  variant_id?: any;
  id: number;
  title?: string;
  quantity: number;
  selectedOptions?: ProductOption[] | SelectedOption[] | string[];
  imageUrl?: string;
  compareAtPrice?: number;
  price?: number;
  selectedPlan?: Plan;
  productId?: string;
  productTitle?: string;
  benefits?: string[];
}
export interface LineItem {
  productId(productId: any): string;
  productTitle: any;
  linePrice(linePrice: any): number;
  variant_id: number;
  product_id: number;
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
  option_2?: any;
  option_3?: any;
  max_qty_allowed?: any;
  benefits: any[];
}
export interface CartState {
  cartItems: CartItem[];
  cartLoading: boolean;
  itemCount: number;
  totalPrice: number;
  freeShipping?: boolean;
  shippingCharges?: number;
  shippingName?: any;
  orderSubtotal?: number;
  orderTotal?: number;
  totalDiscount?: number;
  lineItems?: LineItem[];
  isOzivaCashSelected?: boolean;
  orderTotalMRP: number;
  cashback?: number;
  isSubscriptionItem?: boolean;
  storageCartFetched?: boolean;
  userUpgradedToday?: number;
  isCartUpgraded?: boolean;
  offerList: Offer[];
  showUpgradeSnackbar: boolean;
}

export enum CartActionTypes {
  SET_CART_LOADING = 'SET_CART_LOADING',
  SET_STORAGE_FETCHED = 'SET_STORAGE_FETCHED',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  SET_DELIVERY_CHARGE = 'SET_DELIVERY_CHARGE',
  IS_OZIVA_CASH_SELECTED = 'IS_OZIVA_CASH_SELECTED',
  CLEAR_CART = 'CLEAR_CART',
  INIT_CART = 'INIT_CART',
  UPDATE_CART = 'UPDATE_CART',
  IS_CART_UPGRADED = 'IS_CART_UPGRADED',
  SHOW_UPGRADE_MODAL = 'SHOW_UPGRADE_MODAL',
  SET_CLICKED_CART_ITEM = 'SET_CLICKED_CART_ITEM',
  SET_UPGRADE_SNACKBAR = 'SET_UPGRADE_SNACKBAR',
  SET_OFFER_LIST = 'SET_OFFER_LIST',
}

export interface CartDeliveryChargeState {
  freeShipping: boolean;
  shippingCharges: number;
  shippingName: string;
  orderTotal: number;
  orderSubtotal: number;
  totalDiscount: number;
  lineItems: CartItem[];
  paymentOptions?: PaymentOption[];
  orderTotalMRP?: number;
  cashback?: number;
}

export interface CartDeliveryChargeResponsePayload {
  free_shipping: boolean;
  shipping_charges: number;
  shipping_name: string;
  order_total: number;
  total_discount: number;
  order_subtotal: number;
  discount_error: string;
  line_items: CartItem[];
}

export type CartActions =
  | {
    type: CartActionTypes.ADD_ITEM;
    payload: CartItem;
  }
  | {
    type: CartActionTypes.SET_CART_LOADING;
    payload: boolean;
  }
  | {
    type: CartActionTypes.REMOVE_ITEM;
    payload: number;
  }
  | {
    type: CartActionTypes.INCREASE_QUANTITY;
    payload: number;
  }
  | {
    type: CartActionTypes.DECREASE_QUANTITY;
    payload: number;
  }
  | {
    type: CartActionTypes.CLEAR_CART;
  }
  | {
    type: CartActionTypes.INIT_CART;
    payload: CartState;
  }
  | {
    type: CartActionTypes.SET_DELIVERY_CHARGE;
    payload: CartDeliveryChargeState;
  }
  | {
    type: CartActionTypes.UPDATE_CART;
    payload: CartItem[];
  } |
  {
    type: CartActionTypes.SET_STORAGE_FETCHED;
    payload: boolean;
  }
  | {
    type: CartActionTypes.IS_OZIVA_CASH_SELECTED;
    payload: boolean;
  } | {
    type: CartActionTypes.IS_CART_UPGRADED;
    payload: boolean;
  } | {
    type: CartActionTypes.SET_OFFER_LIST;
    payload: Offer[];
  } | {
    type: CartActionTypes.SHOW_UPGRADE_MODAL;
    payload: boolean;
  } | {
    type: CartActionTypes.SET_CLICKED_CART_ITEM;
    payload: ProductCardModel;
  } | {
    type: CartActionTypes.SET_UPGRADE_SNACKBAR;
    payload: boolean;
  };

export type CartReducerType = (
  state: CartState,
  action: CartActions,
) => CartState;

export type CartDispatch = React.Dispatch<CartActions>;

export interface OffersModal {
  code: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  minQuantity: number;
  minSubtotal: number;
  type: string;
  landingPage: string;
  listing: string[];
  validOn: string;
}


export interface ICodeVisibility {
  category: string;
  productIds?: string[];
  variantIds: string[];
  prioritizedCoupon?: string;
}

export interface IVariantDetailsState {
  variantId: string;
  variantTitle: string;
}