export interface ProductState {
  products?: Product[];
  spotlightReviewStatus?: boolean;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS = 'FETCH_PRODUCTS',
  SET_SPOTLIGHT_REVIEW_STATUS = 'SET_SPOTLIGHT_REVIEW',
}

export type ProductActions =
  | {
      type: ProductActionTypes.FETCH_PRODUCTS;
      payload: Product[];
    }
  | {
      type: ProductActionTypes.SET_SPOTLIGHT_REVIEW_STATUS;
      payload: boolean;
    };

export type ProductReducerType = (
  state: ProductState,
  action: ProductActions,
) => ProductState;

export type ProductDispatch = React.Dispatch<ProductActions>;

export interface Product {
  id: string;
  averageRating: string;
  numberOfReviews: string;
}

export interface Data {
  product: Product[];
}

export interface FetchAllProductResponse {
  data: Data;
}
