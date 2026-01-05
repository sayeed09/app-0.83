export type StatusType = 'idle' | 'pending' | 'resolved' | 'rejected';
export type ErrorType = Error | string | symbol | null;

export interface AsyncState<T> {
  status: StatusType;
  data: T | T[] | null;
  error: ErrorType;
}

export interface AsyncReturn<T> extends AsyncState<T> {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;

  setData: (data: T) => void;
  setError: (error: ErrorType) => void;
  run: (promise: Promise<any>) => any;
  reset: () => void;
}

export type AsyncAction<T> = Partial<AsyncState<T>>;
