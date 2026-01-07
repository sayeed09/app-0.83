import React from 'react';
import usePersistentReducer from 'hooks/use-persistent-reducer';
import { ProductDispatch, ProductState } from '../models/product';
import productReducer, { productInitialState } from '../reducers/product';

const ProductStateContext = React.createContext<ProductState | undefined>(
  undefined,
);
const ProductDispatchContext = React.createContext<ProductDispatch | undefined>(
  undefined,
);

const ProductProvider = ({ children }) => {
  const [state, dispatch] = usePersistentReducer(
    productReducer,
    productInitialState,
    'Product',
  );

  return (
    <ProductStateContext.Provider value={state || productInitialState}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
};

const useProductState = (): ProductState => {
  const context = React.useContext(ProductStateContext);
  if (context === undefined) {
    throw new Error('useProductState must be used within a ProductProvider');
  }

  return context;
};

const useProductDispatch = (): ProductDispatch => {
  const context = React.useContext(ProductDispatchContext);
  if (context === undefined) {
    throw new Error('useProductDispatch must be used within a ProductProvider');
  }

  return context;
};

const useProduct = (): [ProductState, ProductDispatch] => [
  useProductState(),
  useProductDispatch(),
];

export { ProductProvider, useProductState, useProductDispatch, useProduct };
