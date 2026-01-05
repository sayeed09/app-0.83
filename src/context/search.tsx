import React from 'react';
import { SearchDispatch, SearchState } from 'models/search';
import searchInitialParamsReducer, { searchInitialState } from 'reducers/search';

const SearchStateContext = React.createContext<SearchState | undefined>(undefined);
const SearchDispatchContext = React.createContext<SearchDispatch | undefined>(undefined);

const SearchProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(searchInitialParamsReducer, searchInitialState);

  return (
    <SearchStateContext.Provider value={state || searchInitialState}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
};

const useSearchState = (): SearchState => {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useCheckoutState must be used within a CheckoutProvider');
  }

  return context;
};

const useSearchDispatch = (): SearchDispatch => {
  const context = React.useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCheckoutDispatch must be used within a CheckoutProvider',
    );
  }

  return context;
};

const useSearch = (): [SearchState, SearchDispatch] => [
  useSearchState(),
  useSearchDispatch(),
];

export { SearchProvider, useSearchState, useSearchDispatch, useSearch };
