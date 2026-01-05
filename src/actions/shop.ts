import { makeActionCreator } from '@actions/index';
import { AppUpdateConfig, ShopActionTypes, ValueCommItems } from '@models/shop';

const setUserPhoneNumber = makeActionCreator<
  ShopActionTypes.SET_USER_PHONE,
  string
>(ShopActionTypes.SET_USER_PHONE);

const setSnackbarVisible = makeActionCreator<
ShopActionTypes.SET_SNACK_BAR_VISIBLE,
  boolean
>(ShopActionTypes.SET_SNACK_BAR_VISIBLE);

const setValueComms = makeActionCreator<
ShopActionTypes.SET_VALUE_COMMUNICATIONS,
  ValueCommItems[]
>(ShopActionTypes.SET_VALUE_COMMUNICATIONS);

const setAppConfig = makeActionCreator<
  ShopActionTypes.SET_APP_CONFIGURATION,
  AppUpdateConfig
>(ShopActionTypes.SET_APP_CONFIGURATION);

export {
  setUserPhoneNumber,
  setSnackbarVisible,
  setValueComms,
  setAppConfig
};
