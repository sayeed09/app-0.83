import { makeActionCreator } from '@actions/index';
import { Product, ProductActionTypes } from 'models/product';

const setProductList = makeActionCreator<
  ProductActionTypes.FETCH_PRODUCTS,
  Product[]
>(ProductActionTypes.FETCH_PRODUCTS);

const setSpotlightReviewStatus = makeActionCreator<
  ProductActionTypes.SET_SPOTLIGHT_REVIEW_STATUS,
  boolean
>(ProductActionTypes.SET_SPOTLIGHT_REVIEW_STATUS);

export { setProductList, setSpotlightReviewStatus };
