import React, { Dispatch, Reducer, ReducerAction, ReducerState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ReducerDefaultState,
  ReducerDefaultStateFunction,
} from '@models/common/persistent-reducer';

/**
 * Persistent Reducer
 * @param reducer - react reducer of the form (state, action) => updated state
 * @param defaultState - initial state
 * @param key - key under which to store state in local storage
 * @param {object} [config={}] - additional config object
 * @param {function} config.serialize - custom serializer (defaults to JSON.stringify)
 * @param {function} config.deserialize - custom desrerializer (defaults to JSON.parse)
 */

const usePersistentReducer = <R extends Reducer<any, any>>(
  reducer: R,
  defaultState: ReducerDefaultState<R>,
  key: string,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
): [ReducerState<R>, Dispatch<ReducerAction<R>>] => {
  const [state, dispatch] = React.useReducer(
    reducer,
    defaultState,
    stateArg => {
      (async function invoke() {
        const valueInLocalStorage = await AsyncStorage.getItem(key);
        if (valueInLocalStorage) {
          return deserialize(valueInLocalStorage);
        }
        return typeof defaultState === 'function'
          ? (defaultState as ReducerDefaultStateFunction<R>)()
          : stateArg;
      })();
    },
  );

  React.useDebugValue(`${key}: ${serialize(state)}`);

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      AsyncStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
  }, [key]);

  React.useEffect(() => {
    if (state) {
      //Not storing subscription item in the local storage, storing only regular items
      if (!state.isSubscriptionItem) {
        AsyncStorage.setItem(key, serialize(state));
      }
    }
  }, [key, state, serialize]);

  return [state, dispatch];
};

export default usePersistentReducer;
