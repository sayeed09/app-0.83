import React from 'react';
import usePersistentReducer from 'hooks/use-persistent-reducer';
import { NotificationDispatch, NotificationState } from 'models/notifications';
import notificationReducer, {
  notificationInitialState,
} from 'reducers/notification';

const NotificationStateContext = React.createContext<
  NotificationState | undefined
>(undefined);
const NotificationDispatchContext = React.createContext<
  NotificationDispatch | undefined
>(undefined);

const NotificationProvider = ({ children }: any) => {
  const [state, dispatch] = usePersistentReducer(
    notificationReducer,
    notificationInitialState,
    'notifications',
  );

  return (
    <NotificationStateContext.Provider
      value={state || notificationInitialState}
    >
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationStateContext.Provider>
  );
};

const useNotificationState = (): NotificationState => {
  const context = React.useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }

  return context;
};

const useNotificationDispatch = (): NotificationDispatch => {
  const context = React.useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutDispatch must be used within a CheckoutProvider',
    );
  }

  return context;
};

const useNotification = (): [NotificationState, NotificationDispatch] => [
  useNotificationState(),
  useNotificationDispatch(),
];

export {
  NotificationProvider,
  useNotificationState,
  useNotificationDispatch,
  useNotification,
};
