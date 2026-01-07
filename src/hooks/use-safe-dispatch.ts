import React, { Dispatch, Reducer, ReducerAction } from 'react';

/**
 * Safe Dispatch - Prevents action dispatches when component is unmounted
 * @param dispatch - reducer dispatch function returned by useReducer
 */
const useSafeDispatch = <R extends Reducer<any, any>>(
  dispatch: Dispatch<ReducerAction<R>>,
): Dispatch<ReducerAction<R>> => {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : undefined),
    [dispatch],
  );
};

export default useSafeDispatch;
