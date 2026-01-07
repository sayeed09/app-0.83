import { AuthActionTypes, AuthState } from 'models/auth';
import { User, UserResponse } from 'models/user';

import { makeActionCreator } from '@actions/index';
import { boolean } from 'yup';

const setAuthenticated = makeActionCreator<
  AuthActionTypes.SET_USER_AUTHENTICATED,
  boolean
>(AuthActionTypes.SET_USER_AUTHENTICATED);

const setUser = makeActionCreator<AuthActionTypes.SET_USER, User | null>(
  AuthActionTypes.SET_USER,
);
const setUserData = makeActionCreator<
  AuthActionTypes.SET_USER_DATA,
  UserResponse
>(AuthActionTypes.SET_USER_DATA);

const initAuth = makeActionCreator<AuthActionTypes.INIT_AUTH, AuthState>(
  AuthActionTypes.INIT_AUTH,
);

const setOTPError = makeActionCreator<
  AuthActionTypes.SET_OTP_ERROR,
  string | null
>(AuthActionTypes.SET_OTP_ERROR);

const setShipRocketLogin = makeActionCreator<
  AuthActionTypes.SET_SHIPROCKET_LOGIN,
  boolean
>(AuthActionTypes.SET_SHIPROCKET_LOGIN);

const setShipRocketOtpToken = makeActionCreator<
  AuthActionTypes.SET_SHIPROCKET_OTP_TOKEN,
  string
>(AuthActionTypes.SET_SHIPROCKET_OTP_TOKEN);

const setShipRocketImportToken = makeActionCreator<
  AuthActionTypes.SET_SHIPROCKET_IMPORT_TOKEN,
  string
>(AuthActionTypes.SET_SHIPROCKET_IMPORT_TOKEN);

const setRedirectToCheckout = makeActionCreator<
  AuthActionTypes.SET_REDIRECT_TO_CHECKOUT,
  boolean
>(AuthActionTypes.SET_REDIRECT_TO_CHECKOUT);


const setLoginMaxLimitErr = makeActionCreator<
  AuthActionTypes.SET_LOGIN_MAX_LIMIT_ERR,
  boolean
>(AuthActionTypes.SET_LOGIN_MAX_LIMIT_ERR);

const setShipRocketEnabled = makeActionCreator<
  AuthActionTypes.SET_SHIPROCKET_LOGIN_ENABLED,
  boolean
>(AuthActionTypes.SET_SHIPROCKET_LOGIN_ENABLED);



export {
  setAuthenticated,
  initAuth, setUser,
  setOTPError,
  setUserData,
  setShipRocketImportToken,
  setShipRocketLogin,
  setShipRocketOtpToken,
  setLoginMaxLimitErr,
  setShipRocketEnabled,
  setRedirectToCheckout
};
