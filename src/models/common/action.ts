export interface BaseAction<T, U> {
  type: T;
  payload: U;
}

export interface BaseActionWithNoPayload<T> {
  type: T;
}
