import React from 'react';
import usePersistentReducer from 'hooks/use-persistent-reducer';
import { CheckoutDispatch, CheckoutState } from 'models/shop/checkout';
import checkoutReducer, { checkoutInitialState } from 'reducers/checkout';

const CheckoutStateContext = React.createContext<CheckoutState | undefined>(
  undefined,
);
const CheckoutDispatchContext = React.createContext<
  CheckoutDispatch | undefined
>(undefined);

const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = usePersistentReducer(
    checkoutReducer,
    checkoutInitialState,
    'checkout',
  );

  return (
    <CheckoutStateContext.Provider value={state || checkoutInitialState}>
      <CheckoutDispatchContext.Provider value={dispatch}>
        {children}
      </CheckoutDispatchContext.Provider>
    </CheckoutStateContext.Provider>
  );
};

const useCheckoutState = (): CheckoutState => {
  const context = React.useContext(CheckoutStateContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }

  return context;
};

const useCheckoutDispatch = (): CheckoutDispatch => {
  const context = React.useContext(CheckoutDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutDispatch must be used within a CheckoutProvider',
    );
  }

  return context;
};

const useCheckout = (): [CheckoutState, CheckoutDispatch] => [
  useCheckoutState(),
  useCheckoutDispatch(),
];

export { CheckoutProvider, useCheckoutState, useCheckoutDispatch, useCheckout };
