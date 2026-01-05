import { AuthActionTypes, AuthReducerType, AuthState } from 'models/auth';

export const authInitialState: AuthState = {
  isAuthenticated: false,
  user: null,
  setOTPError: null,
  shipRocketLogin: true,
  maxLoginAttemptsErr: false,
  shiprocketEnabled: false,
  redirectToCheckout: false,
};

const authReducer: AuthReducerType = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.INIT_AUTH:
      return {
        ...state,
        ...action.payload,
      };
    case AuthActionTypes.SET_OTP_ERROR:
      return {
        ...state,
        setOTPError: action.payload,
      };
    case AuthActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case AuthActionTypes.SET_SHIPROCKET_LOGIN:
      return {
        ...state,
        shipRocketLogin: action.payload,
      };
    case AuthActionTypes.SET_SHIPROCKET_IMPORT_TOKEN:
      return {
        ...state,
        shipRocketImportToken: action.payload,
      };
    case AuthActionTypes.SET_SHIPROCKET_OTP_TOKEN:
      return {
        ...state,
        shipRocketOtpToken: action.payload,
      };
    case AuthActionTypes.SET_LOGIN_MAX_LIMIT_ERR:
      return {
        ...state,
        maxLoginAttemptsErr: action.payload,
      };
    case AuthActionTypes.SET_SHIPROCKET_LOGIN_ENABLED:
      return {
        ...state,
        shiprocketEnabled: action.payload,
      };
    case AuthActionTypes.SET_REDIRECT_TO_CHECKOUT:
      return {
        ...state,
        redirectToCheckout: action.payload,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};

export default authReducer;
