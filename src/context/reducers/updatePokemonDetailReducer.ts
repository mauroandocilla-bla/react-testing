import { State, UpdatePokemonDetailPayload } from '../types';

export function updatePokemonDetailReducer(
  state: State,
  payload: UpdatePokemonDetailPayload
): State {
  return {
    ...state,
    isLoading: false,
    pokemons: state.pokemons.map((pokemon) => {
      if (pokemon.name === payload.name) {
        return payload;
      }
      return pokemon;
    }),
  };
}
