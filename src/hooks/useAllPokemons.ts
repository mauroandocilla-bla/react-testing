import {Dispatch} from 'react';
import {Action, Actions} from '../context/types';
import {getAllPokemons} from '../services/PokemonService';

export function useAllPokemons(dispatch: Dispatch<Action>) {
  return async () => {
    const allPokemons = await getAllPokemons();
    dispatch({type: Actions.UPDATE_ALL_POKEMONS, payload: allPokemons});
  };
}
