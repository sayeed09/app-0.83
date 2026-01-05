import {
  CartActionTypes,
  CartDeliveryChargeState,
  CartItem,
  CartState,
} from 'models/shop/cart';

import {
  makeActionCreator,
  makeActionWithNoPayloadCreator,
} from '@actions/index';
import { ProductCardModel } from 'models/product-card/card-model';
import { Offer } from 'models/offers';

const addProduct = makeActionCreator<CartActionTypes.ADD_ITEM, CartItem>(
  CartActionTypes.ADD_ITEM,
);

const setCartLoading = makeActionCreator<
  CartActionTypes.SET_CART_LOADING,
  boolean
>(CartActionTypes.SET_CART_LOADING);

const setStorageCartFetched = makeActionCreator<
  CartActionTypes.SET_STORAGE_FETCHED,
  boolean
>(CartActionTypes.SET_STORAGE_FETCHED);

const removeProduct = makeActionCreator<CartActionTypes.REMOVE_ITEM, CartItem>(
  CartActionTypes.REMOVE_ITEM,
);

const increaseQuantity = makeActionCreator<
  CartActionTypes.INCREASE_QUANTITY,
  number
>(CartActionTypes.INCREASE_QUANTITY);

const decreaseQuantity = makeActionCreator<
  CartActionTypes.DECREASE_QUANTITY,
  number
>(CartActionTypes.DECREASE_QUANTITY);

const removeItem = makeActionCreator<CartActionTypes.REMOVE_ITEM, number>(
  CartActionTypes.REMOVE_ITEM,
);

const setCartDeliveryCharge = makeActionCreator<
  CartActionTypes.SET_DELIVERY_CHARGE,
  CartDeliveryChargeState
>(CartActionTypes.SET_DELIVERY_CHARGE);

const toggleOzivaCashSelection = makeActionCreator<
  CartActionTypes.IS_OZIVA_CASH_SELECTED,
  boolean
>(CartActionTypes.IS_OZIVA_CASH_SELECTED);

const clearCart = makeActionWithNoPayloadCreator<CartActionTypes.CLEAR_CART>(
  CartActionTypes.CLEAR_CART,
);

const initCart = makeActionCreator<CartActionTypes.INIT_CART, CartState>(
  CartActionTypes.INIT_CART,
);

const updateCart = makeActionCreator<CartActionTypes.UPDATE_CART, CartItem[]>(
  CartActionTypes.UPDATE_CART,
);

const setIsCartUpgraded = makeActionCreator<CartActionTypes.IS_CART_UPGRADED, boolean>(
  CartActionTypes.IS_CART_UPGRADED,
);

const setShowUpgradeModal = makeActionCreator<CartActionTypes.SHOW_UPGRADE_MODAL, boolean>(
  CartActionTypes.SHOW_UPGRADE_MODAL,
);

const setClickedCartItem = makeActionCreator<CartActionTypes.SET_CLICKED_CART_ITEM, ProductCardModel>(
  CartActionTypes.SET_CLICKED_CART_ITEM,
);

const setUpgradeSnackbar = makeActionCreator<CartActionTypes.SET_UPGRADE_SNACKBAR, boolean>(
  CartActionTypes.SET_UPGRADE_SNACKBAR,
);

const setOfferList = makeActionCreator<CartActionTypes.SET_OFFER_LIST, Offer[]>(
  CartActionTypes.SET_OFFER_LIST,
);

export {
  addProduct,
  setCartLoading,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  setCartDeliveryCharge,
  toggleOzivaCashSelection,
  clearCart,
  initCart,
  updateCart,
  setStorageCartFetched,
  setIsCartUpgraded,
  setShowUpgradeModal,
  setClickedCartItem,
  setUpgradeSnackbar,
  setOfferList
};
