import { Pokemon } from 'pokenode-ts';

export type ContextValue = {
  state: State;
  dispatch: Dispatch;
};

export type State = {
  pokemons: Array<Partial<Pokemon>>;
  isLoading: boolean;
};

export enum Actions {
  UPDATE_ALL_POKEMONS = 'UPDATE_ALL_POKEMONS',
  UPDATE_POKEMON_DETAIL = 'UPDATE_POKEMON_DETAIL',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

export type UpdateAllPokemonsPayload = Array<Partial<Pokemon>>;

export type UpdateAllPokemonsAction = {
  type: Actions.UPDATE_ALL_POKEMONS;
  payload: UpdateAllPokemonsPayload;
};

export type UpdatePokemonDetailPayload = Pokemon;

export type UpdatePokemonDetailAction = {
  type: Actions.UPDATE_POKEMON_DETAIL;
  payload: UpdatePokemonDetailPayload;
};

export type SetIsLoadingPayload = boolean;

export type SetIsLoadingAction = {
  type: Actions.SET_IS_LOADING;
  payload: SetIsLoadingPayload;
};

export type Action =
  | UpdateAllPokemonsAction
  | UpdatePokemonDetailAction
  | SetIsLoadingAction;

export type Dispatch = (action: Action) => void;
