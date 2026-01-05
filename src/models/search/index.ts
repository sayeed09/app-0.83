export interface SearchState {
  searchParams: {};
}

export enum SearchActionType {
  SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS',
}

export type SearchActions = {
    type: SearchActionType.SET_SEARCH_PARAMS;
    payload: {};
  }

export type SearchReducerType = (
  state: SearchState,
  action: SearchActions,
) => SearchState;

export type SearchDispatch = React.Dispatch<SearchActions>;

export interface ISearchPayload {
  minQueryLength: number,
  productsCount: number,
  q: string,
  sort: string,
}
export interface ISearchResponse {
  payload: ISearchResponsePayload,
  status: number,
  statusCode: number,
}
interface ISearchResponsePayload {
  result: ISearchResultProduct[],
  total: number,
  pages: number,
}
export interface ISearchResultProduct {
  sellingPrice: number,
  totalReviews: number,
  avgRatings: number,
  price: number,
  inStock: boolean,
  id: string,
  categories: ISeaerchResultProductCategory[],
  url: string,
  mainImage: string,
  name: string,
  attributes: ISearchResultProductAttributes[]
}
interface ISeaerchResultProductCategory {
  name: string,
  id: string
}
interface ISearchResultProductAttributes {
  values: Array<[]>,
  name: string,
  id: string,
}