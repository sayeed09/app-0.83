import { AxiosError } from 'axios';

export type StatusType = 'idle' | 'pending' | 'resolved' | 'rejected';
export type ErrorType = (AxiosError & Error & string & symbol) | null;

export type PromiseResolve = (<T>(val: T) => void) | undefined;
export type PromiseReject = (<T>(err: T) => void) | undefined;

export type Data<T> = T | null;
export interface AsyncState<T> {
  status: StatusType;
  data: Data<T>;
  error: ErrorType;
}

export interface AsyncReturn<T> extends AsyncState<T> {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;

  setData: (data: Data<T>) => void;
  setError: (error: ErrorType) => void;
  run: (promise: Promise<any>) => any;
  reset: () => void;
}

export type AsyncAction<T> = Partial<AsyncState<T>>;

export type AsyncReducer<T> = (
  state: AsyncState<T>,
  action: AsyncAction<T>,
) => AsyncState<T>;
