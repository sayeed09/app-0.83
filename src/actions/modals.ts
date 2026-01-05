import { ModalsActionType } from 'models/shop/modals';

import { makeActionCreator } from '@actions/index';

const setLoginModal = makeActionCreator<
  ModalsActionType.SET_LOGIN_MODAL,
  boolean
>(ModalsActionType.SET_LOGIN_MODAL);

const loginSuccessful = makeActionCreator<
  ModalsActionType.SET_IS_LOGIN_SUCCESSFUL,
  boolean
>(ModalsActionType.SET_IS_LOGIN_SUCCESSFUL);

const setShowLoginSuccess = makeActionCreator<
  ModalsActionType.SHOW_LOGIN_SUCCESSFUL,
  boolean
>(ModalsActionType.SHOW_LOGIN_SUCCESSFUL);

const setChatWootModal = makeActionCreator<
  ModalsActionType.SET_CHATWOOT_MODAL,
  boolean
>(ModalsActionType.SET_CHATWOOT_MODAL);

const setFilterModal = makeActionCreator<
  ModalsActionType.SET_FILTER_MODAL,
  boolean
>(ModalsActionType.SET_FILTER_MODAL);

const setSortModal = makeActionCreator<
  ModalsActionType.SET_SORT_MODAL,
  boolean
>(ModalsActionType.SET_SORT_MODAL);

export {
  setLoginModal,
  loginSuccessful,
  setChatWootModal,
  setFilterModal,
  setSortModal,
  setShowLoginSuccess,
};
