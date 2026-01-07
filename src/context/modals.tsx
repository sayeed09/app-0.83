import React from 'react';
import usePersistentReducer from 'hooks/use-persistent-reducer';
import { ModalsDispatch, ModalsState } from 'models/shop/modals';
import modalsReducer, { modalsInitialState } from 'reducers/modals';

const ModalsStateContext = React.createContext<ModalsState | undefined>(
  undefined,
);
const ModalsDispatchContext = React.createContext<ModalsDispatch | undefined>(
  undefined,
);

const ModalsProvider = ({ children }) => {
  const [state, dispatch] = usePersistentReducer(
    modalsReducer,
    modalsInitialState,
    'modals',
  );

  return (
    <ModalsStateContext.Provider value={state || modalsInitialState}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

const useModalsState = (): ModalsState => {
  const context = React.useContext(ModalsStateContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }

  return context;
};

const useModalsDispatch = (): ModalsDispatch => {
  const context = React.useContext(ModalsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutDispatch must be used within a CheckoutProvider',
    );
  }

  return context;
};

const useModals = (): [ModalsState, ModalsDispatch] => [
  useModalsState(),
  useModalsDispatch(),
];

export { ModalsProvider, useModalsState, useModalsDispatch, useModals };
