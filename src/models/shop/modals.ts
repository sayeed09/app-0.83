export interface ModalsState {
  loginModalVisbility: boolean;
  isLoginSuccessful: boolean;
  showLoginSuccess: boolean;
  chatWootModalVisibility: boolean;
  filterModalVisibility: boolean;
  sortModalVisibility: boolean;
}

export enum ModalsActionType {
  SET_LOGIN_MODAL = 'SET_LOGIN_MODAL',
  SET_IS_LOGIN_SUCCESSFUL = 'SET_IS_LOGIN_SUCCESSFUL',
  SHOW_LOGIN_SUCCESSFUL = 'SHOW_LOGIN_SUCCESSFUL',
  SET_CHATWOOT_MODAL = 'SET_CHATWOOT_MODAL',
  SET_FILTER_MODAL = 'SET_FILTER_MODAL',
  SET_SORT_MODAL = 'SET_SORT_MODAL',
}

export type ModalsActions =
  | {
      type: ModalsActionType.SET_LOGIN_MODAL;
      payload: boolean;
    }
  | {
      type: ModalsActionType.SET_IS_LOGIN_SUCCESSFUL;
      payload: boolean;
    }
  | {
      type: ModalsActionType.SHOW_LOGIN_SUCCESSFUL;
      payload: boolean;
    }
  | {
      type: ModalsActionType.SET_CHATWOOT_MODAL;
      payload: boolean;
    }
  | {
      type: ModalsActionType.SET_FILTER_MODAL;
      payload: boolean;
    }
  | {
      type: ModalsActionType.SET_SORT_MODAL;
      payload: boolean;
    };

export type ModalsReducerType = (
  state: ModalsState,
  action: ModalsActions,
) => ModalsState;

export type ModalsDispatch = React.Dispatch<ModalsActions>;
