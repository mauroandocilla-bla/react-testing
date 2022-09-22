import { State, UpdateAllPokemonsPayload } from '../types';

export function updateAllPokemonsReducer(
  state: State,
  payload: UpdateAllPokemonsPayload
): State {
  return {
    ...state,
    isLoading: false,
    pokemons: payload,
  };
}
