import React from 'react';

import {
  AsyncReducer,
  AsyncReturn,
  AsyncState,
  Data,
  ErrorType,
} from '@models/common/async-hook';

import useSafeDispatch from './use-safe-dispatch';

const defaultInitialState: AsyncState<any> = {
  status: 'idle',
  data: null,
  error: null,
};

/**
 * Async Hook
 * @param initialState - Reducer initial state to override default state
 */
function useAsync<T>(initialState?: Partial<AsyncState<T>>): AsyncReturn<T> {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const reducer: AsyncReducer<T> = (s, a) => ({ ...s, ...a });
  const [{ status, data, error }, dispatch] = React.useReducer(
    reducer,
    initialStateRef.current,
  );

  const safeDispatch = useSafeDispatch<typeof reducer>(dispatch);

  const setData = React.useCallback(
    (_data: Data<T>): void => safeDispatch({ data: _data, status: 'resolved' }),
    [safeDispatch],
  );

  const setError = React.useCallback(
    (_error: ErrorType): void =>
      safeDispatch({ error: _error, status: 'rejected' }),
    [safeDispatch],
  );

  const reset = React.useCallback(
    (): void => safeDispatch(initialStateRef.current),
    [safeDispatch],
  );

  const run = React.useCallback(
    async (promise: Promise<T>): Promise<void> => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        );
      }
      safeDispatch({ status: 'pending' });
      try {
        const resolvedData: T = await promise;
        setData(resolvedData);
      } catch (_error) {
        setError(_error);
      }
    },
    [safeDispatch, setData, setError],
  );

  return React.useMemo(
    (): AsyncReturn<T> => ({
      // using the same names that react-query uses for convenience
      isIdle: status === 'idle',
      isLoading: status === 'pending',
      isError: status === 'rejected',
      isSuccess: status === 'resolved',

      setData,
      setError,
      error,
      status,
      data,
      run,
      reset,
    }),
    [setData, setError, error, status, data, run, reset],
  );
}

// eslint-disable-next-line import/prefer-default-export
export { useAsync };
