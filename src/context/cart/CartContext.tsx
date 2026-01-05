import React from 'react';
import { CartDispatch, CartState } from 'models/shop/cart';

import usePersistentReducer from '@hooks/use-persistent-reducer';

import { cartReducer, initialState } from './CartReducer';

const CartStateContext = React.createContext<CartState | undefined>(undefined);
const CartDispatchContext = React.createContext<CartDispatch | undefined>(
  undefined,
);

const CartContextProvider = ({ children }: any) => {
  const [state, dispatch] = usePersistentReducer(
    cartReducer,
    initialState,
    'cart',
  );
  return (
    <CartStateContext.Provider value={state || initialState}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

const useCartState = (): CartState => {
  const context = React.useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }
  return context;
};

const useCartDispatch = (): CartDispatch => {
  const context = React.useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};

const useCart = (): [CartState, CartDispatch] => [
  useCartState(),
  useCartDispatch(),
];

export { CartContextProvider, useCartState, useCartDispatch, useCart };
