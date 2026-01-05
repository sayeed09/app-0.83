import React from 'react';

import usePersistentReducer from '@hooks/use-persistent-reducer';
import { ShopDispatch, ShopState } from '@models/shop';
import shopReducer, { shopInitialState } from '@reducers/shop';

const ShopStateContext = React.createContext<ShopState | undefined>(undefined);
const ShopDispatchContext = React.createContext<ShopDispatch | undefined>(
  undefined,
);
// Todo:// Need to do the clean up of this as we removed the shop screen.

const ShopProvider = ({ children }) => {
  const [state, dispatch] = usePersistentReducer(
    shopReducer,
    shopInitialState,
    'shop',
  );
  return (
    <ShopStateContext.Provider value={state || shopInitialState}>
      <ShopDispatchContext.Provider value={dispatch}>
        {children}
      </ShopDispatchContext.Provider>
    </ShopStateContext.Provider>
  );
};

const useShopState = (): ShopState => {
  const context = React.useContext(ShopStateContext);
  if (context === undefined) {
    throw new Error('useShopState must be used within a ShopProvider');
  }
  return context;
};

const useShopDispatch = (): ShopDispatch => {
  const context = React.useContext(ShopDispatchContext);
  if (context === undefined) {
    throw new Error('useShopDispatch must be used within a ShopProvider');
  }
  return context;
};

const useShop = (): [ShopState, ShopDispatch] => [
  useShopState(),
  useShopDispatch(),
];

export { ShopProvider, useShopState, useShopDispatch, useShop };
