import {
  ModalsActionType,
  ModalsReducerType,
  ModalsState,
} from 'models/shop/modals';

export const modalsInitialState: ModalsState = {
  loginModalVisbility: false,
  isLoginSuccessful: false,
  chatWootModalVisibility: false,
  filterModalVisibility: false,
  sortModalVisibility: false,
  showLoginSuccess: false,
};

const modalsReducer: ModalsReducerType = (state, action) => {
  switch (action.type) {
    case ModalsActionType.SET_LOGIN_MODAL:
      return {
        ...state,
        loginModalVisbility: action.payload,
      };
    case ModalsActionType.SET_IS_LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoginSuccessful: action.payload,
      };
    case ModalsActionType.SHOW_LOGIN_SUCCESSFUL:
      return {
        ...state,
        showLoginSuccess: action.payload,
      };
    case ModalsActionType.SET_CHATWOOT_MODAL:
      return {
        ...state,
        chatWootModalVisibility: action.payload,
      };
    case ModalsActionType.SET_FILTER_MODAL:
      return {
        ...state,
        filterModalVisibility: action.payload,
      };
    case ModalsActionType.SET_SORT_MODAL:
      return {
        ...state,
        sortModalVisibility: action.payload,
      };
    default:
      return state;
  }
};

export default modalsReducer;
