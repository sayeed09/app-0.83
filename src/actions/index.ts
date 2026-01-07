import { BaseAction, BaseActionWithNoPayload } from '@models/common/action';

export const makeActionCreator = <T, U>(type: T) => (
  payload: U,
): BaseAction<T, U> => {
  const action = { type, payload };
  return action;
};

export const makeActionWithNoPayloadCreator = <T>(
  type: T,
): BaseActionWithNoPayload<T> => {
  const action = { type };
  return action;
};
