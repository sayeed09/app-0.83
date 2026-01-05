import { ShopActionTypes, ShopReducerType, ShopState } from '@models/shop';

export const shopInitialState: ShopState = {
  listOptions: {},
  selectedListOptions: [],
  filterCount: 0,
  queryString: '',
  sortString: 'BEST_SELLING',
  isSortingApllied: true,
  userPhoneNumber: '',
  snackBarVisible: false,
  productValueComms:  [],
  appUpdateConfig: null
};

const shopReducer: ShopReducerType = (state, action) => {
  switch (action.type) {
    case ShopActionTypes.SET_USER_PHONE:
      return {
        ...state,
        userPhoneNumber: action.payload,
      };
    case ShopActionTypes.SET_VALUE_COMMUNICATIONS:
      return {
        ...state,
        productValueComms: action.payload,
      };
    case ShopActionTypes.SET_APP_CONFIGURATION:
      return {
        ...state,
        appUpdateConfig: action.payload,
      };
    case ShopActionTypes.SET_SNACK_BAR_VISIBLE:
      return {
        ...state,
        snackBarVisible: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
