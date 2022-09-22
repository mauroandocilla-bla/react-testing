import { Dispatch, useCallback } from 'react';
import { Action, Actions } from '../context/types';
import { getPokemonbyName } from '../services/PokemonService';

export function usePokemonDetail(dispatch: Dispatch<Action>) {
  return useCallback(
    async (name: string) => {
      dispatch({
        type: Actions.SET_IS_LOADING,
        payload: true,
      });
      const pokemon = await getPokemonbyName(name);
      dispatch({
        type: Actions.UPDATE_POKEMON_DETAIL,
        payload: pokemon,
      });
    },
    [dispatch]
  );
}
