import { makeActionCreator } from '@actions/index';
import { SearchActionType } from '@models/search/index';

export interface searchInterface {
  'sort': any[];
  'x-api-key': string;
  'x-store-id': string;
}

const setSearchParams = makeActionCreator<
  SearchActionType.SET_SEARCH_PARAMS,
  searchInterface
>(SearchActionType.SET_SEARCH_PARAMS);

export { setSearchParams };