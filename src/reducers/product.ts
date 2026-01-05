import {
  ProductActionTypes,
  ProductReducerType,
  ProductState,
} from '../models/product';

export const productInitialState: ProductState = {
  products: [],
  spotlightReviewStatus: false,
};

const productReducer: ProductReducerType = (state, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ProductActionTypes.SET_SPOTLIGHT_REVIEW_STATUS:
      return {
        ...state,
        spotlightReviewStatus: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
