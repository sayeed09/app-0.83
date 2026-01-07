import {
  SearchActionType,
  SearchReducerType,
  SearchState,
} from 'models/search';
import { fallbackForSearchParams } from 'utils/constants';

export const searchInitialState: SearchState = {
  searchParams: fallbackForSearchParams,
};

const searchInitialParamsReducer: SearchReducerType = (state, action) => {
  switch (action.type) {
    case SearchActionType.SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload,
      };
    default:
      return state;
  }
};

export default searchInitialParamsReducer;
