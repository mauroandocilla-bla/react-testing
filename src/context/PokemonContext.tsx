import React, {createContext, useContext, useReducer} from 'react';
import reducer from './reducer';

import {ContextValue, State} from './types';

const initialState: State = {
  isLoading: false,
  pokemons: [],
};

export const PokemonContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {
  },
});

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export function PokemonProvider({children}: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
