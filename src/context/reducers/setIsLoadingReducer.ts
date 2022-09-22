import { SetIsLoadingPayload, State } from '../types';

export function setIsLoadingReducer(
  state: State,
  payload: SetIsLoadingPayload
): State {
  return {
    ...state,
    isLoading: payload,
  };
}
