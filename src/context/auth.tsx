import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initAuth, setAuthenticated, setUser } from 'actions/auth';
import { AuthDispatch, AuthState, UserProfileResponseModel } from 'models/auth';
import { User } from 'models/user';
import authReducer, { authInitialState } from 'reducers/auth';

import { getUser, localStorageUserKey } from '@services/auth';
import { getUserProfileDataService } from 'services/user';

const AuthStateContext = React.createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = React.createContext<AuthDispatch | undefined>(
  undefined,
);

const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, authInitialState);
  const authLocalKey = 'auth';
  const handleLogout = async () => {
    await AsyncStorage.removeItem(localStorageUserKey);
    dispatch(setUser(null));
    dispatch(setAuthenticated(false));
  }
  const authFetch = async () => {
    const fetchTryAuthState = await AsyncStorage.getItem(authLocalKey);
    let initialStateLocalPayload: AuthState = fetchTryAuthState
      ? JSON.parse(fetchTryAuthState)
      : authInitialState;
    const user: User | null = await getUser();
    if (user) {
      getUserProfileDataService()
        .then((data: UserProfileResponseModel) => {
          if (data?.userDetails) {
            initialStateLocalPayload = {
              ...initialStateLocalPayload,
              isAuthenticated: true,
              user,
            };
            dispatch(initAuth(initialStateLocalPayload));
          }
        }).catch((err) => {
          handleLogout()
        })

    }
  };

  useEffect(() => {
    authFetch();
  }, []);

  return (
    <AuthStateContext.Provider value={state || authInitialState}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = (): AuthState => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }

  return context;
};

const useAuthDispatch = (): AuthDispatch => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutDispatch must be used within a CheckoutProvider',
    );
  }

  return context;
};

const useAuth = (): [AuthState, AuthDispatch] => [
  useAuthState(),
  useAuthDispatch(),
];

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
