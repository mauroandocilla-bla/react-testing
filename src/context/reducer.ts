import { setIsLoadingReducer } from './reducers/setIsLoadingReducer';
import { updateAllPokemonsReducer } from './reducers/updateAllPokemonsReducer';
import { updatePokemonDetailReducer } from './reducers/updatePokemonDetailReducer';
import { Action, Actions, State } from './types';

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.UPDATE_ALL_POKEMONS:
      return updateAllPokemonsReducer(state, action.payload);
    case Actions.UPDATE_POKEMON_DETAIL:
      return updatePokemonDetailReducer(state, action.payload);
    case Actions.SET_IS_LOADING:
      return setIsLoadingReducer(state, action.payload);
    default:
      return state;
  }
}
