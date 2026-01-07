export interface ShopState {
  listOptions: Record<string, unknown>;
  selectedListOptions: [];
  filterCount: number;
  queryString: string;
  sortString: string;
  isSortingApllied: boolean;
  userPhoneNumber: string;
  snackBarVisible: boolean;
  productValueComms: ValueCommItems[];
  appUpdateConfig: AppUpdateConfig | null;
}
export interface AppUpdateConfig {
  latestVersion: string,
  minSupportedVersion: string,
  skippedVersions: string[],
  title: string,
  description: string
}
export interface ValueCommItems {
  compareAtPrice: number;
  imageUrl?: string;
  price: number;
  title: string;
  subHeader?: string;
}
export enum ShopActionTypes {
  SET_USER_PHONE = 'SET_USER_PHONE',
  SET_SNACK_BAR_VISIBLE = 'SET_SNACK_BAR_VISIBLE',
  SET_SEARCH_PARAMETERS = 'SET_SEARCH_PARAMETERS',
  SET_VALUE_COMMUNICATIONS = 'SET_VALUE_COMMUNICATIONS',
  SET_APP_CONFIGURATION = 'SET_APP_CONFIGURATION'
}

export type ShopActions =
  {
      type: ShopActionTypes.SET_USER_PHONE;
      payload: string;
    }
  | {
      type: ShopActionTypes.SET_SNACK_BAR_VISIBLE;
      payload: boolean;
    }
  | {
      type: ShopActionTypes.SET_SEARCH_PARAMETERS;
      payload: boolean;
    }
  | {
    type: ShopActionTypes.SET_VALUE_COMMUNICATIONS;
    payload: ValueCommItems[];
    } 
  | {
    type: ShopActionTypes.SET_APP_CONFIGURATION;
    payload: AppUpdateConfig;
  };

export type ShopReducerType = (
  state: ShopState,
  action: ShopActions,
) => ShopState;

export type ShopDispatch = React.Dispatch<ShopActions>;
