/* eslint-disable no-plusplus */
import { Offer } from 'models/offers';
import { ProductCardModel } from 'models/product-card/card-model';
import {
  CartActionTypes,
  CartItem,
  CartReducerType,
  CartState,
} from 'models/shop/cart';
import { boolean } from 'yup';

export const initialState: CartState = {
  cartItems: [] as CartItem[],
  itemCount: 0,
  totalPrice: 0,
  freeShipping: true,
  shippingName: null,
  shippingCharges: 0,
  orderSubtotal: 0,
  orderTotal: 0,
  totalDiscount: 0,
  lineItems: [] as CartItem[],
  isOzivaCashSelected: false,
  cartLoading: false,
  isSubscriptionItem: false,
  storageCartFetched: false,
  userUpgradedToday: Math.floor(Math.random() * 150) + 450,
  showUpgradeModal: false,
  clickedCartItem: {} as ProductCardModel,
  setUpgradeSnackbar: false,
  offerList: [] as Offer[],
  showUpgradeSnackbar: false
};

export const sumItems = (
  cartItems: CartItem[],
): { itemCount: number; totalPrice: number } => {
  const itemCount = cartItems.reduce(
    (total, product) => total + product?.quantity,
    0,
  );
  const totalPrice = Number(
    cartItems
      .reduce((total, product) => total + product.price * product?.quantity, 0)
      .toFixed(2),
  );
  return { itemCount, totalPrice };
};

export const cartReducer: CartReducerType = (state, action) => {
  let stateData = state;
  if (!stateData) {
    stateData = {
      cartItems: [] as CartItem[],
      itemCount: 0,
      totalPrice: 0,
      freeShipping: true,
      shippingCharges: 0,
      shippingName: null,
      orderSubtotal: 0,
      orderTotal: 0,
      totalDiscount: 0,
      lineItems: [] as CartItem[],
      isOzivaCashSelected: false,
      cartLoading: false,
      storageCartFetched: false,
      isSubscriptionItem: false,
      userUpgradedToday: Math.floor(Math.random() * 150) + 450,
      showUpgradeModal: false,
      clickedCartItem: {} as ProductCardModel,
      setUpgradeSnackbar: false,
      offerList: [] as Offer[],
      showUpgradeSnackbar: false
    };
  }
  switch (action.type) {
    case CartActionTypes.SET_CART_LOADING:
      return {
        ...stateData,
        cartLoading: action.payload,
      };
    case CartActionTypes.SET_STORAGE_FETCHED:
      return {
        ...stateData,
        storageCartFetched: action.payload,
      };
    case CartActionTypes.ADD_ITEM:
      if (stateData) {
        let currentItem = stateData.cartItems.filter(
          item => item.id === action.payload.id,
        );
        if (currentItem.length === 0) {
          stateData.cartItems.push({
            ...action.payload,
            quantity: 1,
            price: action.payload.price,
          });
        } else {
          stateData.cartItems[
            stateData.cartItems.findIndex(item => item.id === action.payload.id)
          ].quantity++;
        }
      }

      return {
        ...stateData,
        ...sumItems(stateData.cartItems),
        cartItems: [...stateData.cartItems],
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...stateData,
        ...sumItems(
          stateData.cartItems.filter(item => item.id !== action.payload),
        ),

        cartItems: [
          ...stateData.cartItems.filter(item => item.id !== action.payload),
        ]
      };
    case CartActionTypes.INCREASE_QUANTITY:
      if (
        stateData.cartItems[
        stateData.cartItems.findIndex(item => item.id === action.payload)
        ]
      ) {
        stateData.cartItems[
          stateData.cartItems.findIndex(item => item.id === action.payload)
        ].quantity++;
      }
      return {
        ...stateData,
        ...sumItems(stateData.cartItems),
        cartItems: [...stateData.cartItems],
        isSubscriptionItem: false,
      };
    case CartActionTypes.DECREASE_QUANTITY:
      if (
        stateData.cartItems[
        stateData.cartItems.findIndex(item => item.id === action.payload)
        ]
      ) {
        if (
          stateData.cartItems[
            stateData.cartItems.findIndex(item => item.id === action.payload)
          ].quantity > 1
        ) {
          stateData.cartItems[
            stateData.cartItems.findIndex(item => item.id === action.payload)
          ].quantity--;
        } else if (
          stateData.cartItems[
            stateData.cartItems.findIndex(item => item.id === action.payload)
          ].quantity === 1
        ) {
          return {
            ...stateData,
            ...sumItems(
              stateData.cartItems.filter(item => item.id !== action.payload),
            ),
            cartItems: [
              ...stateData.cartItems.filter(item => item.id !== action.payload),
            ],
          };
        }
      }
      return {
        ...stateData,
        ...sumItems(stateData.cartItems),
        cartItems: [...stateData.cartItems],
        isSubscriptionItem: false,
      };
    case CartActionTypes.SET_DELIVERY_CHARGE:
      return {
        ...stateData,
        freeShipping: action.payload.freeShipping,
        shippingName: action.payload.shippingName,
        shippingCharges: action.payload.shippingCharges,
        orderSubtotal: action.payload.orderSubtotal,
        orderTotal: action.payload.orderTotal,
        totalDiscount: action.payload.totalDiscount,
        lineItems: action.payload.lineItems,
        orderTotalMRP: action.payload.orderTotalMRP,
        cashback: action.payload.cashback,
      };
    case CartActionTypes.IS_OZIVA_CASH_SELECTED:
      return {
        ...stateData,
        isOzivaCashSelected: action.payload,
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...stateData,
        cartItems: [],
        isOzivaCashSelected: false,
        ...sumItems([]),
      };
    case CartActionTypes.INIT_CART:
      return {
        ...stateData,
        cartItems: [...action.payload.cartItems],
        ...sumItems(action.payload.cartItems),
        isSubscriptionItem: action.payload.isSubscriptionItem,
        orderTotal: action.payload.orderTotal,
        orderTotalMRP: action.payload.orderTotalMRP,
        orderSubtotal: action.payload.orderSubtotal,
        totalDiscount: action.payload.totalDiscount,
      };
    case CartActionTypes.UPDATE_CART:
      return {
        ...stateData,
        cartItems: [...action.payload],
        ...sumItems(action.payload),
      };
    case CartActionTypes.IS_CART_UPGRADED:
      return {
        ...stateData,
        isCartUpgraded: action.payload
      };
    case CartActionTypes.SET_CLICKED_CART_ITEM:
      return {
        ...stateData,
        clickedCartItem: action.payload
      };
    case CartActionTypes.SHOW_UPGRADE_MODAL:
      return {
        ...stateData,
        showUpgradeModal: action.payload
      };
    case CartActionTypes.SET_UPGRADE_SNACKBAR:
      return {
        ...stateData,
        showUpgradeSnackbar: action.payload
      };
    case CartActionTypes.SET_OFFER_LIST:
      return {
        ...stateData,
        offerList: action.payload
      };
    default:
      return stateData;
  }
};
